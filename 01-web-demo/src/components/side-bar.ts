import { css, html, LitElement } from "lit";
import { state } from "lit/decorators.js";
import { store } from "../state";
import { processBoard, togglePlay } from "../gameReducer";
import { Unsubscribe } from "@reduxjs/toolkit";
class SideBar extends LitElement {
  constructor() {
    super();
  }

  static styles = css`
    .container {
      width: 200px;
      height: 525px;
      background-color: #ccc;
      border-radius: 10px;
      margin-right: 10px;
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
    return html`<div class="container"></div>`;
  }
}

// define custom element
customElements.define("side-bar", SideBar);
