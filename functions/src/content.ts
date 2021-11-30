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
  const sections = htmlToSections(sanitizedHtml);

  return sections;
}

function replaceEmojis(md: string, emojis: Record<string, string>): string {
  let content = md;
  for (const k of Object.keys(emojis)) {
    const withColons = `:${k}:`;
    const asEmoji = emojis[k];
    content = content.replace(new RegExp(withColons, "g"), asEmoji);
  }

  return content;
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

      console.log(`Relative link on page ${page}: ${href} --> ${repoRelative}`);
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

        console.log(
          `Sanitizing relative project link ${repoRelative} --> ${el.attribs["href"]}`
        );
      } else {
        modifyAttr(el, "href", (h) => urljoin(renderedBaseUrl, h));
        console.log(
          `Sanitizing relative GitHub link ${repoRelative} --> ${el.attribs["href"]}`
        );
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
function htmlToSections(html: string): RepoPageSection[] {
  const $ = cheerio.load(html);
  const sections: RepoPageSection[] = [];

  // TODO: Do we even need sections? Could we just do the following:
  //  1) If there is exactly one h1 tag, delete it.
  //  2) Render out $('body').html() as the content

  const $h1s = $("h1");

  // Determine what the highest subheader type is (h1, h2, h3, h4, h5, h6)
  let highestSubheader: string = "h7";
  if ($h1s.length > 1) {
    // If there is more than one h1 tag, we use that as the section delimeter
    highestSubheader = "h1";
  } else {
    const subheaderTypes = ["h2", "h3", "h4", "h5", "h6"];
    for (const h of subheaderTypes) {
      if ($(h).length > 0) {
        highestSubheader = h;
        break;
      }
    }
  }
  const $subheaders = $(highestSubheader);

  // If there are no headers, return one big section
  if ($h1s.length === 0 && $subheaders.length === 0) {
    return [
      {
        name: "README",
        content: $.html(),
      },
    ];
  }

  // If there is exactly one h1 tag, it represents the first section
  // Otherwise we just push an empty section.
  if ($h1s.length === 1) {
    const $h1 = $h1s.first();
    let $headerChildren = $("div", "<div></div>");

    $h1.nextUntil(highestSubheader).each((_: number, el: any) => {
      $headerChildren = $headerChildren.append(el);
    });

    const header = {
      name: $h1.text(),
      content: $headerChildren.html()!,
    };
    sections.push(header);
  } else {
    sections.push({
      name: "",
      content: "",
    });
  }

  // Iterate through all subheaders and make a section
  $subheaders.each((_: number, el: cheerio.Element) => {
    const $sh = $(el);
    let $sibchils = $("div", "<div></div>");

    $sh.nextUntil(highestSubheader).each((_: number, el: any) => {
      $sibchils = $sibchils.append(el);
    });

    sections.push({
      name: $sh.text(),
      content: $sibchils.html()!,
    });
  });

  // For debugging
  console.log({
    h1Count: $h1s.length,
    highestSubheader,
    subheaderCount: $subheaders.length,
    sectionCount: sections.length,
  });

  return sections;
}
