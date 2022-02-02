/**
 * See:
 * https://developers.google.com/analytics/devguides/collection/gtagjs/single-page-applications
 */

import { Route } from "vue-router";

export function routeChange(route: Route) {
  gtag("set", "page_path", route.path);
  gtag("set", "page_title", route.name || "Unknown");
}

export function pageView(route: Route) {
  routeChange(route);
  gtag("event", "page_view");
}
