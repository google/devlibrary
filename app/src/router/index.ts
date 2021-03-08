import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Product from "../views/Product.vue";
import Repo from "../views/Repo.vue";

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
    path: "/about",
    name: "About",
    component: About,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default router;
