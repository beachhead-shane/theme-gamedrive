import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";
class Cell extends LitElement {
  constructor() {
    super();
  }
  @property({ type: String })
  iconSrc: string = "";

  @property({ type: String })
  tileType: string;

  @property({ type: Number })
  x: number;

  @property({ type: Number })
  y: number;

  static styles = css`
    * {
      margin: 0;
      padding: 0;
    }

    .cell {
      display: table-cell;
      min-width: 50px;
      height: 50px;
      text-align: center;
      vertical-align: middle;
      padding: 0;
      background-color: #eee;
      gap: 0;
      border-radius: 10px;
      font-size: 0.6em;
      color: rgba(0, 0, 0, 0.3);
      background-repeat: no-repeat;
      background-size: auto;
      background-position: center;
    }
    .grass {
      background-color: #22aa33;
    }
    .water {
      background-color: #1222ee;
    }

    .road {
      background-color: #ddaa33;
    }
  `;

  render() {
    return html`<div
      class="cell ${this.tileType}"
      id="game-cell-${this.x}-${this.y}"
      style="background-image:url('icons/${this.iconSrc}')"
    >
      ${this.x}-${this.y}
    </div>`;
  }
}

// define custom element
customElements.define("game-cell", Cell);
