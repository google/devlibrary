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
import VueGtag from "vue-gtag";

// Tailwind CSS
import "@/assets/css/tailwind.css";

// Fonts
import "@/assets/css/fonts.css";

// Icons
import "@/plugins/icons";

// Analytics
// TODO(STOPSHIP): Get the router passed in
Vue.use(
  VueGtag,
  {
    config: { id: "G-2BDY03FSVV" },

    // Disable until the user accepts cookies
    // https://matteo-gabriele.gitbook.io/vue-gtag/opt-in-out
    enabled: false,
  }
);

Vue.config.productionTip = false;
