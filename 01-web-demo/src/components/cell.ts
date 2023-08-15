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

  unsubscribe: Unsubscribe;
  connectedCallback(): void {
    super.connectedCallback();
    this.unsubscribe = store.subscribe(this.onStateUpdate.bind(this));
    this.onStateUpdate();
  }

  onStateUpdate() {
    const selectedCell = store.getState().game.selectedCell;
    if (selectedCell) {
      this.isSelected = selectedCell.x === this.x && selectedCell.y === this.y;
    }
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
  `;

  onCellClick() {
    if (
      store.getState().game.cells.find((c) => c.x === this.x && c.y === this.y)
        .item.itemType != ItemType.None
    ) {
      store.dispatch(selectCell({ x: this.x, y: this.y }));
    }
  }
  render() {
    return html`<div
      class="cell ${this.tileType} ${this.isSelected ? "selected" : ""}"
      id="game-cell-${this.x}-${this.y}"
      style="${this.itemVisible
        ? `background-image:url('icons/${this.iconSrc}'`
        : ""})"
      @click="${this.onCellClick}"
    >
      ${this.x}-${this.y}
    </div>`;
  }
}

// define custom element
customElements.define("game-cell", Cell);
