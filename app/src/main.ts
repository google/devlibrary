import Vue from "vue";
import VueGtag from "vue-gtag";

import App from "./App.vue";
import router from "./router";
import store from "./store";

// Tailwind CSS
import "@/assets/css/tailwind.css";

// Fonts
import "@/assets/css/fonts.css";

// Icons
import "@/plugins/icons";

// Analytics
Vue.use(
  VueGtag,
  {
    config: { id: "G-2BDY03FSVV" },

    // Disable until the user accepts cookies
    // https://matteo-gabriele.gitbook.io/vue-gtag/opt-in-out
    enabled: false,
  },
  router
);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
