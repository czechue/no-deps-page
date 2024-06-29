export class HashRouter {
  url = "";

  constructor() {
    this.url = window.location.href;
    console.log("1", this.url);
  }
}
