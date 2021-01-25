import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import ProjectModule from "./project";
import BlogModule from "./blog";

export default new Vuex.Store({
  state: {},
  modules: {
    project: ProjectModule,
    blog: BlogModule,
  },
});
