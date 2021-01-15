import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import ProjectModule from "./project";

export default new Vuex.Store({
  state: {},
  modules: {
    project: ProjectModule,
  },
});
