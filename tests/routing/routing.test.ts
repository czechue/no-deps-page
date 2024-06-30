import { test, expect, mock, beforeEach } from "bun:test";
import { HashRouter } from "../../public/routing/routing";
import { userEvent } from "@testing-library/user-event";
import { waitFor, screen } from "@testing-library/dom";

let returnCurrentRoute: any;

beforeEach(() => {
  returnCurrentRoute = mock((route) => {
    return route;
  });
});

test("dom routing", () => {
  document.body.innerHTML = `<button>My button</button>`;
  new HashRouter(document.body, [returnCurrentRoute]);
  expect(returnCurrentRoute).toHaveBeenCalledWith("/");
});

test("dom routing with hash", () => {
  // @ts-ignore
  window.happyDOM.setURL("http://test:3000/#/foo");
  new HashRouter(document.body, [returnCurrentRoute]);
  expect(returnCurrentRoute).toHaveBeenCalledWith("foo");
});

test("dom routing with hash and the whole domain", () => {
  // @ts-ignore
  window.happyDOM.setURL("http://test.com/public/root/#/foo");
  new HashRouter(document.body, [returnCurrentRoute]);
  expect(returnCurrentRoute).toHaveBeenCalledWith("foo");
});

test("click on link changes hash", async () => {
  document.body.innerHTML = `<a data-role="link" href="bar">Link</a>`;
  // @ts-ignore
  window.happyDOM.setURL("http://test.com/public/root/#/foo");

  new HashRouter(document.body, [returnCurrentRoute]);

  expect(returnCurrentRoute).toHaveBeenCalledWith("foo");

  const el = screen.queryByText(/Link/);

  if (!el) {
    throw new Error("No link found");
  }

  await userEvent.click(el);

  await waitFor(() => {
    expect(window.location.hash).toEqual("#/bar");
    /**
     * TODO: much better assertion would be checking if:
     * expect(returnCurrentRoute).toHaveBeenCalledWith("bar");
     * unfortunately fake testing browser by happy-dom, doesn't emit "popstate' event when window.location.hash is changed
     */
  });
});
