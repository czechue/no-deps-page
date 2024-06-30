const findAllLinks = (rootElement) => {
  return rootElement.querySelectorAll('[data-role="link"]');
};

export class HashRouter {
  constructor(htmlElement, listeners) {
    this.addListeners(listeners);

    findAllLinks(htmlElement).forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const href = event.target.href;
        const { pathname: linkPathname } = new URL(href);
        const {
          location: { pathname },
        } = window;

        // linkPathname: "/no-deps-page/public/page-2"
        // pathname: "/no-deps-page/public/"
        // hash: "#/no-deps-page/public/page-2"

        let dedupedLinkPathname = linkPathname;

        if (pathname !== "/") {
          const pathnameWithoutSlash = pathname.slice(0, -1); // "/no-deps-page/public"
          dedupedLinkPathname = linkPathname.replace(pathnameWithoutSlash, "");
        }

        window.location.hash = `#${dedupedLinkPathname}`;
      });
    });
  }

  addListeners(listeners) {
    const emitRouteChange = (listeners) => {
      const currentRoute = this.getCurrentHash().split("#/")[1];
      listeners.forEach((listener) => listener(currentRoute ?? "/"));
    };

    // on mount call
    emitRouteChange(listeners);

    window.addEventListener("popstate", () => {
      emitRouteChange(listeners);
    });
  }

  getCurrentHash() {
    return window.location.hash;
  }
}
