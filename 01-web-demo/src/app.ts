import { css, html, LitElement } from "lit";

import "@carbon/web-components/es/components/data-table/index.js";
class App extends LitElement {
  constructor() {
    super();
  }
  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
  `;

  render() {
    return html` <h1>test</h1> `;
  }
}

// define custom element
customElements.define("pwa-app", App);
