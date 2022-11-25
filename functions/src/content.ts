/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as cheerio from "cheerio";
import marked from "marked";
import * as path from "path";
import * as url from "url";
import urljoin from "url-join";

import { RepoData, RepoPageSection } from "../../shared/types";
import { cleanPagePath } from "../../shared/util";

const BADGE_PATTERNS = [
  "travis-ci.org",
  "shields.io",
  "coveralls.io",
  "badge.fury.io",
  "gitter.im",
  "circleci.com",
  "opencollective.com",
  "cirrus-ci.com",
  "sonarcloud.io",
  "codecov.io",
  "release-notes.com",
  "awesome.re",
  /github\.com\/.*\/workflows\/.*\.svg/,
];

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  headerIds: true,
  breaks: false,
});

export function renderContent(
  product: string,
  repo: RepoData,
  page: string,
  content: string,
  branch: string,
  emojis: Record<string, string> = {}
) {
  const withEmojis = replaceEmojis(content, emojis);
  const html = marked(withEmojis);
  const sanitizedHtml = sanitizeHtml(product, repo, page, html, branch);

  // TODO: We no longer use the concept of "sections" at all so we could
  //       eventually remove this but there's no need to do that urgently.
  const sections = htmlToSections(repo, sanitizedHtml);

  return sections;
}

function replaceEmojis(md: string, emojis: Record<string, string>): string {
  let content = md.split("\n");
  let isInCodeBlock = false;

  for (const k of Object.keys(emojis)) {
    const withColons = `:${k}:`;
    const asEmoji = emojis[k];
    content.forEach((val, ind) => {
      if (val.trim().startsWith("```")) {
        isInCodeBlock = !isInCodeBlock;
      }
      if (!isInCodeBlock) {
        content[ind] = val.replace(new RegExp(withColons, "g"), asEmoji);
      }
    });
  }

  return content.join("\n");
}

/**
 * Sanitize the content Html.
 */
function sanitizeHtml(
  product: string,
  repo: RepoData,
  page: string,
  html: string,
  branch: string
): string {
  // Links
  // * Links to page content files should go to our page
  // * Links to source files should go to github
  //
  // Images
  // * Images and other things should be made into githubusercontent links
  // * Remove badges

  // TODO: What is this!
  let pageDir = "";
  if (page) {
    const lastSlash = page.lastIndexOf("/");
    pageDir = page.substring(0, lastSlash);
    if (lastSlash >= 0) {
      pageDir = page.substring(0, lastSlash);
    }
  }

  // URL path to this project pages on devlibrary.withgoogle.com
  const pagesBaseUrl = `/products/${product}/repos/${repo.id}/pages/`;

  // URL path to this project on github
  const renderedBaseUrl = `https://github.com/${repo.metadata.owner}/${repo.metadata.repo}/tree/${branch}/`;

  // URL path to this project dir on github (raw)
  const rawBaseUrl = `https://raw.githubusercontent.com/${repo.metadata.owner}/${repo.metadata.repo}/${branch}/${pageDir}`;

  // Paths to all pages within this repo
  const pagePaths = (repo.metadata.pages || []).map((page) => page.path);

  const $: cheerio.Root = cheerio.load(html);

  // Make all code sections prettyprinted
  $("pre > code").each((_: number, el: cheerio.Element) => {
    $(el).addClass("prettyprint");
  });

  // Fix checkbox lists by adding 'li-task' class to target
  $('li > input[type="checkbox"]').each((_: number, el: cheerio.Element) => {
    $(el).parent().addClass("li-task");
  });

  // Workaround for:
  // https://github.com/tailwindlabs/tailwindcss/issues/506
  $("img[height]").each((_: number, el: cheerio.Element) => {
    if (el.type === "text") {
      return;
    }

    modifyAttr(el, "style", (style) => {
      let height = el.attribs["height"];
      if (!height.endsWith("px")) {
        height += "px";
      }
      return `height: ${height};` + style;
    });
  });

  // Resolve all relative links to github
  $("a").each((_: number, el: cheerio.Element) => {
    if (el.type === "text") {
      return;
    }

    const href = el.attribs["href"];
    if (!href) {
      return;
    }

    // TODO: We should handle links to github.com in addition to relative links

    if (isRelativeLink(href)) {
      // Check if the link is to a page within the repo
      const repoRelative = path.join(pageDir, href);
      el.attribs["href"] = repoRelative;

      const repoRelativeWithoutHash =
        repoRelative.indexOf("#") >= 0
          ? repoRelative.substring(0, repoRelative.indexOf("#"))
          : repoRelative;

      const isProjectPage = pagePaths.indexOf(repoRelativeWithoutHash) >= 0;
      if (isProjectPage) {
        modifyAttr(el, "href", (h: string) => {
          let res = h;
          res = cleanPagePath(res);
          res = urljoin(pagesBaseUrl, res);

          return res;
        });
      } else {
        modifyAttr(el, "href", (h) => urljoin(renderedBaseUrl, h));
      }
    }
  });

  // Resolve all relative images, add class to parent
  $("img").each((_: number, el: cheerio.Element) => {
    if (el.type === "text") {
      return;
    }

    const src = el.attribs["src"];
    if (!src) {
      return;
    }

    const isBadge = BADGE_PATTERNS.some((pattern) => {
      return !!src.match(pattern);
    });

    // Hide all known badges
    if (isBadge) {
      $(el).addClass("hidden");
    }

    // If the image link is relative, make sure it's pointing to GH
    modifyAttr(el, "src", (s) => {
      let res = s;

      // Upgrade http:// images to https:// to avoid mixed content
      // security issues
      res = res.replace("http://", "https://");

      if (!isRelativeLink(res)) {
        return res;
      }

      res = urljoin(rawBaseUrl, res);
      return res;
    });
  });

  return $.html();
}

function modifyAttr(
  el: cheerio.TagElement,
  attrib: string,
  fn: (a: string) => string
) {
  const val = el.attribs[attrib] || "";
  el.attribs[attrib] = fn(val);
}

/**
 * Determine if a link is relative.
 */
function isRelativeLink(href: string): boolean {
  const hrefUrl = url.parse(href);

  // Relative link has a pathname but not a host
  return !hrefUrl.host && !!hrefUrl.pathname;
}

/**
 * Turn HTML into a sections objects.
 */
function htmlToSections(repo: RepoData, html: string): RepoPageSection[] {
  const $ = cheerio.load(html);

  // We want to remove any big headers on the page where the content is
  // equal to either the project name or the repo name
  const $h1s = $("h1");
  const $h2s = $("h2");

  const headers = [...$h1s.toArray(), ...$h2s.toArray()];
  for (const h of headers) {
    const el = $(h);
    const hText = el.text().trim().toLowerCase();

    if (
      hText === repo.metadata.repo.toLowerCase() ||
      hText === repo.metadata.name.toLowerCase()
    ) {
      console.log(`Removing header ${el.html()}`);
      el.remove();
    }
  }

  return [
    {
      name: "README",
      content: $.html(),
    },
  ];
}
