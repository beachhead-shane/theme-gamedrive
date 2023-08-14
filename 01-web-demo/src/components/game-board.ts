import { css, html, LitElement } from "lit";
class GameBoard extends LitElement {
  constructor() {
    super();
  }
  static styles = css`
    * {
      margin: 0;
      padding: 0;
    }
    div {
      display: flex;
      width: 500px;
      height: 500px;
      flex-direction: row;
      flex-wrap: wrap;
      padding: 0;
      margin: 0;
      gap: 0;
      border: solid;
      padding: 10px;
    }
  `;

  render() {
    return html`<div id="game-board"><slot></slot></div> `;
  }
}

// define custom element
customElements.define("game-board", GameBoard);
