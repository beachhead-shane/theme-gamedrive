import { css, html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { store } from "../state";
import { selectCell } from "../gameReducer";
import { Unsubscribe } from "@reduxjs/toolkit";
import { ItemType } from "../Types/Items/Item";
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

  @property({ type: Boolean })
  itemVisible: boolean;

  @state()
  isSelected: boolean;

  @state()
  timeOfDay: number;

  unsubscribe: Unsubscribe;
  connectedCallback(): void {
    super.connectedCallback();
    this.unsubscribe = store.subscribe(this.onStateUpdate.bind(this));

    this.onStateUpdate();
  }

  onStateUpdate() {
    const selectedCell = store.getState().game.selectedCell;
    this.timeOfDay = store.getState().game.time;
    this.isSelected =
      selectedCell && selectedCell.x === this.x && selectedCell.y === this.y;
  }

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
    .selected {
      border: 5px solid black;
      box-sizing: border-box;
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
    .text {
      pointer-events: none;
      user-select: none;
    }
    .color-overlay {
      filter: sepia(100%) saturate(200%) hue-rotate(121deg);

      display: table-cell;
      min-width: 50px;
      height: 50px;
      text-align: center;
      vertical-align: middle;
      padding: 0;

      gap: 0;
      border-radius: 10px;
      font-size: 0.6em;
      color: rgba(0, 0, 0, 0.3);
      background-repeat: no-repeat;
      background-size: auto;
      background-position: center;
      mix-blend-mode: multiply;
    }
  `;
  lerp = (a: number, b: number, alpha: number) => {
    return a + alpha * (b - a);
  };
  onCellClick() {
    if (
      store.getState().game.cells.find((c) => c.x === this.x && c.y === this.y)
        .item.itemType != ItemType.None
    ) {
      store.dispatch(selectCell({ x: this.x, y: this.y }));
    }
  }

  tints = [
    1, // 00:00
    1,
    1,
    1,
    1,
    0.8,
    0.6,
    0.4,
    0.2,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0.2,
    0.4,
    0.6,
    0.8,
    1,
    1,
    1,
    1,
  ];
  render() {
    return html`<div
      class="cell ${this.tileType} ${this.isSelected ? "selected" : ""}"
      id="game-cell-${this.x}-${this.y}"
      style="${this.itemVisible
        ? `background-image:url('icons/${this.iconSrc}'`
        : ""})"
      @click="${this.onCellClick}"
    >
      <div
        class="color-overlay ${this.tileType}"
        style="${this.itemVisible
          ? `background-image:url('icons/${this.iconSrc}'`
          : ""});
          opacity:${this.tints[this.timeOfDay]}
          "
      >
        <span class="text"> ${this.x}-${this.y}</span>
      </div>
    </div>`;
  }
}

// define custom element
customElements.define("game-cell", Cell);
