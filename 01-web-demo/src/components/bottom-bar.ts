import { css, html, LitElement, nothing } from "lit";
import { state } from "lit/decorators.js";
import { store } from "../state";
import { processBoard, setView, togglePlay } from "../gameReducer";
import { View } from "../Types/View";
import { IFeatures } from "../Types/IFeatures";
import { Unsubscribe } from "@reduxjs/toolkit";

enum FlashNumber {
  None,
  Up,
  Down,
}

class BottomBar extends LitElement {
  constructor() {
    super();
  }

  static styles = css`
    .container {
      margin-top: 10px;
      width: 715px;
      height: 50px;
      background-color: #ccc;
      border-radius: 10px;
      padding: 10px;
      text-align: center;
      display: flex;
    }
    .time {
      padding-bottom: 5px;
      text-align: left;
    }
    .left {
      flex-grow: 1;
    }
    .space {
      flex-grow: 1;
    }
    .middle {
      flex-grow: 1;
      align-content: middle;
      display: flex;
      place-content: center;
      flex-wrap: wrap;
      transition: color 0.2s linear, font-size 0.3s linear;
    }
    .right {
      display: flex;

      flex-grow: 1;
      justify-content: right;
    }
    .selected {
      background-color: #eecc00;
    }
    button {
      margin: 5px;
      padding: 5px;
      border-radius: 3px;
      cursor: pointer;
    }

    .flash-number-down {
      color: red;
      font-size: 1.1em;
    }

    .flash-number-up {
      color: green;
      font-size: 1.1em;
    }
    @keyframes pulse {
      0% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
      }

      70% {
        transform: scale(1);
        box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
      }

      100% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
      }
    }
    .pulse {
      animation: pulse 2s infinite;
    }
  `;
  advance() {
    store.dispatch(processBoard());
  }

  @state()
  time: number = 0;
  @state()
  timerId: number = 0;

  @state()
  activeView: View;

  @state()
  features: IFeatures;

  @state()
  bankBalance: number;

  @state()
  hasMissions: boolean;

  @state()
  flashNumber: FlashNumber = FlashNumber.None;

  unsubscribe: Unsubscribe;
  connectedCallback(): void {
    super.connectedCallback();
    this.unsubscribe = store.subscribe(this.onStateUpdate.bind(this));
    this.onStateUpdate();
  }

  onStateUpdate() {
    this.time = store.getState().game.time;
    this.timerId = store.getState().game.timerId;
    this.features = store.getState().game.features;
    this.activeView = store.getState().game.view;
    const newBalance = store.getState().game.bankBalance;

    this.hasMissions = false;
    store.getState().game.characters.forEach((character) => {
      if (character.actions.length > 0) {
        this.hasMissions = true;
      }
    });
    if (this.flashNumber === FlashNumber.None) {
      this.flashNumber =
        newBalance > this.bankBalance
          ? FlashNumber.Up
          : newBalance < this.bankBalance
          ? FlashNumber.Down
          : FlashNumber.None;
      setTimeout(() => {
        this.flashNumber = FlashNumber.None;
      }, 500);
    }

    this.bankBalance = newBalance;
  }

  play() {
    store.dispatch(togglePlay());
  }

  resetGame() {
    localStorage.removeItem("board_state");
    location.reload();
  }
  viewMap() {
    store.dispatch(setView(View.Map));
  }

  viewRelationships() {
    store.dispatch(setView(View.Relationships));
  }

  render() {
    return html`<div class="container">
      <div class="left">
        <div class="time">
          Time Of Day ${this.time.toString().padStart(2, "0")}:00
          ${this.timerId === 0 ? "(paused)" : ""}
          <div>
            <button @click="${this.play}">
              ${this.timerId === 0 ? `play` : `pause`}
            </button>
            <button @click="${this.resetGame}">Reset Game</button>
            ${this.timerId === 0
              ? // ? html`<button @click="${this.advance}">advance one hour</button>`
                nothing
              : nothing}
          </div>
        </div>
      </div>
      <div class="space"></div>
      <div
        class="middle ${this.flashNumber === FlashNumber.Up
          ? "flash-number-up"
          : this.flashNumber === FlashNumber.Down
          ? "flash-number-down"
          : ""}"
      >
        Bank Balance:<br />
        $${this.bankBalance}
      </div>
      <div class="space"></div>
      <div class="right">
        <button
          ?disabled=${!this.features?.map}
          class="${this.activeView === View.Map ? "selected" : ""}"
          @click="${this.viewMap}"
        >
          satellite feed
        </button>
        <button
          class="${this.activeView === View.Relationships
            ? "selected"
            : ""} ${this.features?.relationships &&
          this.hasMissions &&
          this.activeView !== View.Relationships
            ? "pulse"
            : ""}"
          ?disabled=${!this.features?.relationships}
          @click="${this.viewRelationships}"
        >
          relationships
        </button>
      </div>
    </div>`;
  }
}

// define custom element
customElements.define("bottom-bar", BottomBar);
