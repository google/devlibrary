/**
 * See:
 * https://developers.google.com/analytics/devguides/collection/gtagjs/single-page-applications
 */

export function routeChange(path: string, title?: string) {
  gtag("set", "page_path", path);
  if (title) {
    gtag("set", "page_title", title);
  }
}

export function pageView(path: string, title?: string) {
  routeChange(path, title);
  gtag("event", "page_view");
}
