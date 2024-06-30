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
        const pathname = new URL(href).pathname;

        window.location.hash = `#${pathname}`;
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
