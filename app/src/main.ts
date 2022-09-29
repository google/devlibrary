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

import App from "./App.vue";
import router from "./router";
import store from "./store";

// Tailwind CSS
import "@/assets/css/tailwind.css";

// Fonts
import "@/assets/css/fonts.css";

// Icons
import "@/plugins/icons";

// Media Queries
// eslint-disable-next-line
import VueMq from "vue-mq";
Vue.use(VueMq, {
  breakpoints: {
    // Tailwind: sm-640, md=768, lg=1024
    mobile: 1024,
    desktop: Infinity,
  },
});

Vue.config.productionTip = false;

if (process.env.NODE_ENV === "development") {
  Vue.config.performance = true;
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
