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
  },
  {
    path: "/products/:product",
    name: "Product",
    component: Product,
  },
  {
    path: "/products/:product/repos/:repo",
    name: "Repo",
    component: Repo,
  },
  {
    path: "/products/:product/repos/:repo/pages/:page(.*)",
    name: "RepoPage",
    component: Repo,
  },
  {
    path: "/authors",
    name: "Authors",
    component: Authors,
  },
  {
    path: "/authors/:author",
    name: "Author",
    component: Author,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/contentpolicy",
    name: "ContentPolicy",
    component: ContentPolicy,
  },
  {
    path: "*",
    name: "404",
    component: FourOhFour,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

router.afterEach((to, from) => {
  if (to.path !== from.path) {
    console.log(`router: ${from.path} --> ${to.path}`);
    routeChange(to);
  }
});

export default router;
