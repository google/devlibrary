import Vue from "vue";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
Vue.component("font-awesome-icon", FontAwesomeIcon);

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faStar,
  faCode,
  faCodeBranch,
  faSearch,
  faExternalLinkAlt,
  faCaretDown,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faMedium } from "@fortawesome/free-brands-svg-icons";

library.add(
  faStar,
  faCode,
  faCodeBranch,
  faSearch,
  faExternalLinkAlt,
  faCaretDown,
  faCaretUp,

  faGithub,
  faMedium
);
