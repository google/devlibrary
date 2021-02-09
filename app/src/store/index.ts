import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import ProjectModule from "./project";
import BlogModule from "./blog";
import UIModule from "./ui";

export default new Vuex.Store({
  state: {},
  modules: {
    project: ProjectModule,
    blog: BlogModule,
    ui: UIModule,
  },
});
