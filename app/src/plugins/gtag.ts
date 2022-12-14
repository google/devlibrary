/**
 * See:
 * https://developers.google.com/analytics/devguides/collection/gtagjs/single-page-applications
 */

import { Route } from "vue-router";

export function conversionEvent(event: string) {
  gtag("event", "conversion", {
    event_category : "engagement",
    event_label : event,
  });
}

export function routeChange(route: Route) {
  gtag("set", "page_path", route.path);
  gtag("set", "page_title", route.name || "Unknown");
}

export function pageView(route: Route) {
  routeChange(route);
  gtag("event", "page_view");
}
