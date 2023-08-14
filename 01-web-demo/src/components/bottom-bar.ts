import { css, html, LitElement, nothing } from "lit";
import { state } from "lit/decorators.js";
import { store } from "../state";
import { processBoard, togglePlay } from "../gameReducer";
import { Unsubscribe } from "@reduxjs/toolkit";
class BottomBar extends LitElement {
  constructor() {
    super();
  }

  static styles = css`
    .container {
      margin-top: 10px;
      width: 505px;
      height: 50px;
      background-color: #ccc;
      border-radius: 10px;
      padding: 10px;
      text-align: center;
    }
    .time {
      padding-bottom: 5px;
    }
  `;
  advance() {
    store.dispatch(processBoard());
  }

  @state()
  time: number = 0;
  @state()
  timerId: number = 0;

  unsubscribe: Unsubscribe;
  connectedCallback(): void {
    super.connectedCallback();
    this.unsubscribe = store.subscribe(this.onStateUpdate.bind(this));
    this.onStateUpdate();
  }

  onStateUpdate() {
    this.time = store.getState().game.time;
    this.timerId = store.getState().game.timerId;
  }

  play() {
    store.dispatch(togglePlay());
  }
  render() {
    return html`<div class="container">
      <div class="time">
        Time Of Day ${this.time.toString().padStart(2, "0")}:00
      </div>
      <button @click="${this.play}">
        ${this.timerId === 0 ? `play` : `pause`}
      </button>

      ${this.timerId === 0
        ? html`<button @click="${this.advance}">advance one hour</button>`
        : nothing}
    </div>`;
  }
}

// define custom element
customElements.define("bottom-bar", BottomBar);
