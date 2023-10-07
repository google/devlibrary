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

import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import FeaturedContent from "../views/FeaturedContent.vue";
import About from "../views/About.vue";
import ContentPolicy from "../views/ContentPolicy.vue";
import Product from "../views/Product.vue";
import Repo from "../views/Repo.vue";
import Authors from "../views/Authors.vue";
import Author from "../views/Author.vue";
import FourOhFour from "../views/FourOhFour.vue";
import { routeChange } from "@/plugins/gtag";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      metaTags: [
        {
          name: "image",
          content:
            "https://devlibrary.withgoogle.com/img/dev-library-preview.png",
        },
        {
          property: "og:image",
          content:
            "https://devlibrary.withgoogle.com/img/dev-library-preview.png",
        },
      ],
    },
  },
  {
    path: "/products/:product",
    name: "Product",
    component: Product,
    meta: {
      metaTags: [
        {
          name: "image",
          content:
            "https://devlibrary.withgoogle.com/img/banners/desktop/product-clipart.png",
        },
        {
          property: "og:image",
          content:
            "https://devlibrary.withgoogle.com/img/banners/desktop/product-clipart.png",
        },
      ],
    },
  },
  {
    path: "/products/:product/repos/:repo",
    name: "Repo",
    component: Repo,
    meta: {
      metaTags: [
        {
          name: "image",
          content:
            "https://devlibrary.withgoogle.com/img/banners/desktop/product-clipart.png",
        },
        {
          property: "og:image",
          content:
            "https://devlibrary.withgoogle.com/img/banners/desktop/product-clipart.png",
        },
      ],
    },
  },
  {
    path: "/products/:product/repos/:repo/pages/:page(.*)",
    name: "RepoPage",
    component: Repo,
    meta: {
      metaTags: [
        {
          name: "image",
          content:
            "https://devlibrary.withgoogle.com/img/banners/desktop/product-clipart.png",
        },
        {
          property: "og:image",
          content:
            "https://devlibrary.withgoogle.com/img/banners/desktop/product-clipart.png",
        },
      ],
    },
  },
  {
    path: "/featured-content",
    name: "Featured Content",
    component: FeaturedContent,
    meta: {
      metaTags: [
        {
          name: "image",
          content:
            "https://devlibrary.withgoogle.com/img/banners/desktop/featured-content-clipart.png",
        },
        {
          property: "og:image",
          content:
            "https://devlibrary.withgoogle.com/img/banners/desktop/featured-content-clipart.png",
        },
      ],
    },
  },
  {
    path: "/authors",
    name: "Authors",
    component: Authors,
    meta: {
      metaTags: [
        {
          name: "image",
          content:
            "https://devlibrary.withgoogle.com/img/banners/desktop/authors-clipart.png",
        },
        {
          property: "og:image",
          content:
            "https://devlibrary.withgoogle.com/img/banners/desktop/authors-clipart.png",
        },
      ],
    },
  },
  {
    path: "/authors/:author",
    name: "Author",
    component: Author,
    meta: {
      metaTags: [
        {
          name: "image",
          content:
            "https://devlibrary.withgoogle.com/img/banners/desktop/authors-clipart.png",
        },
        {
          property: "og:image",
          content:
            "https://devlibrary.withgoogle.com/img/banners/desktop/authors-clipart.png",
        },
      ],
    },
  },
  {
    path: "/about",
    name: "About",
    component: About,
    meta: {
      metaTags: [
        {
          name: "image",
          content:
            "https://devlibrary.withgoogle.com/img/banners/desktop/about-clipart.png",
        },
        {
          property: "og:image",
          content:
            "https://devlibrary.withgoogle.com/img/banners/desktop/about-clipart.png",
        },
      ],
    },
  },
  {
    path: "/contentpolicy",
    name: "ContentPolicy",
    component: ContentPolicy,
    meta: {
      metaTags: [
        {
          name: "image",
          content:
            "https://devlibrary.withgoogle.com/img/dev-library-preview.png",
        },
        {
          property: "og:image",
          content:
            "https://devlibrary.withgoogle.com/img/dev-library-preview.png",
        },
      ],
    },
  },
  {
    path: "*",
    name: "404",
    component: FourOhFour,
    meta: {
      metaTags: [
        {
          name: "image",
          content:
            "https://devlibrary.withgoogle.com/img/dev-library-preview.png",
        },
        {
          property: "og:image",
          content:
            "https://devlibrary.withgoogle.com/img/dev-library-preview.png",
        },
      ],
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

/**
 * This callback runs before every route change, including on page load.
 * Reference: https://www.digitalocean.com/community/tutorials/vuejs-vue-router-modify-head
 */
router.beforeEach((to, from, next) => {
  /**
   * This goes through the matched routes from last to first, finding the closest route with a title.
   * e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
   * `/nested`'s will be chosen.
   */
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);

  const previousNearestWithMeta = from.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
  } else if (previousNearestWithMeta) {
    document.title = previousNearestWithMeta.meta.title;
  }

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll("[data-vue-router-controlled]")).map(
    (el) => el.parentNode!.removeChild(el)
  );

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags
    .map((tagDef: { [x: string]: string }) => {
      const tag = document.createElement("meta");

      Object.keys(tagDef).forEach((key) => {
        tag.setAttribute(key, tagDef[key]);
      });

      // We use this to track which meta tags we create so we don't interfere with other ones.
      tag.setAttribute("data-vue-router-controlled", "");

      return tag;
    })
    // Add the meta tags to the document head.
    .forEach((tag: Node) => document.head.appendChild(tag));

  next();
});

router.afterEach((to, from) => {
  if (to.path !== from.path) {
    console.log(`router: ${from.path} --> ${to.path}`);
    routeChange(to);
  }
});

export default router;
