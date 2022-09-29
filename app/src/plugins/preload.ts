// Global HLJS
// eslint-disable-next-line
declare const hljs: any;

export function waitForHljsLoad(): Promise<unknown> {
  if (hljs) {
    return Promise.resolve();
  }

  return new Promise((res) => {
    document
      .querySelector<HTMLScriptElement>("#hljs")
      ?.addEventListener("load", res);
  });
}

export function waitForMaterialStyles() {
  const promises = [];
  const tags = document.querySelectorAll<HTMLLinkElement>("link[data-mdc]");
  for (const tag of tags) {
    if (tag.rel !== "stylesheet") {
      const p = new Promise((res) => {
        tag.addEventListener("load", res);
      });
      promises.push(p);
    }
  }

  return Promise.all(promises);
}
