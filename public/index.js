import { HashRouter } from "./routing/routing.js";

const body = document.querySelector("body");

const listener = (route) => console.log("you are on", route);

const displayCurrentRouter = (currentRoute) => {
  const routerSection = document.querySelector('[data-role="routing-section"]');
  const currentRouteElementDisplayer = routerSection.querySelector(
    '[data-role="current-path"]',
  );

  currentRouteElementDisplayer.innerText = currentRoute;
};

new HashRouter(body, [listener, displayCurrentRouter]);
