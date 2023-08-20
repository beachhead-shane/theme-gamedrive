import { css, html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { store } from "../state";
import { selectItem, unhighlightItem } from "../gameReducer";
import { Unsubscribe } from "@reduxjs/toolkit";
import { Feature, HasFeature, ItemType } from "../Types/Items/Item";
import { getIconFromCell } from "../Types/IGameCell";
class Cell extends LitElement {
  constructor() {
    super();
  }

  @property({ type: Number })
  x: number;

  @property({ type: Number })
  y: number;

  @state()
  iconSrc: string = "";

  @state()
  tileType: string;

  @state()
  itemVisible: boolean;

  @state()
  age: number = 0;

  @state()
  isSelected: boolean;

  @state()
  timeOfDay: number;

  @state()
  isHighlighted: boolean;

  unsubscribe: Unsubscribe;
  connectedCallback(): void {
    super.connectedCallback();
    this.unsubscribe = store.subscribe(this.onStateUpdate.bind(this));
    this.onStateUpdate();
  }

  onStateUpdate() {
    this.timeOfDay = store.getState().game.time;
    const cell = store
      .getState()
      .game.cells.find((x) => x.x === this.x && x.y === this.y);
    this.isSelected = store.getState().game.selectedItemUID === cell.item.uid;
    this.tileType = cell.tileType;
    this.itemVisible = HasFeature(cell.item, Feature.Visible);
    this.age = cell.item.age;
    this.isHighlighted = HasFeature(cell.item, Feature.Highlight);
    if (this.isHighlighted) {
      console.log("is Highglight!", cell.item.features);
    }
    this.iconSrc = getIconFromCell(cell);
  }

  static styles = css`
    * {
      margin: 0;
      padding: 0;
    }
    @keyframes animatedBackground {
      from {
        background-position: 0 0;
      }
      to {
        background-position: 100% 0;
      }
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
      background-size: 30px 30px;
    }
    .selected {
      border: 5px solid black;
      box-sizing: border-box;
    }
    .selected-inner {
      min-width: 40px !important;
      height: 40px !important;
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
    @keyframes pulse-no-shadow {
      0% {
        transform: scale(1.05);
      }

      70% {
        transform: scale(1);
        background-color: rgba(255, 255, 255, 0.7);

        background-color: rgba(255, 255, 255, 0);
      }

      100% {
        transform: scale(1.05);
        background-color: 0 0 0 0 rgba(255, 255, 255, 0);
      }
    }
    .is-highlighted {
      animation: pulse-no-shadow 2s infinite;
    }
    @keyframes animatedBackground {
      0% {
        background-color: rgba(255, 255, 255, 0.7);
      }

      70% {
        background-color: rgba(255, 255, 255, 0);
      }

      100% {
        background-color: 0 0 0 0 rgba(255, 255, 255, 0);
      }
    }

    .background-animate {
      animation: animatedBackground 0.5s linear;
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
      store.dispatch(
        selectItem(
          store
            .getState()
            .game.cells.find((c) => c.x === this.x && c.y === this.y).item.uid
        )
      );
      store.dispatch(unhighlightItem({ x: this.x, y: this.y }));
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
      class="cell ${this.tileType} ${this.isSelected ? "selected" : ""} ${this
        .isHighlighted
        ? "is-highlighted"
        : ""}"
      id="game-cell-${this.x}-${this.y} "
      style="${this.itemVisible
        ? `background-image:url('icons/${this.iconSrc}'`
        : ""})"
      @click="${this.onCellClick}"
    >
      <div
        class="${this.isHighlighted
          ? "is-highlighted"
          : ""} color-overlay ${this.tileType}  ${this.isSelected
          ? "selected-inner"
          : ""}"
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
