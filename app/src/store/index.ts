import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import UIModule from "./ui";

export default new Vuex.Store({
  state: {},
  modules: {
    ui: UIModule,
  },
});
