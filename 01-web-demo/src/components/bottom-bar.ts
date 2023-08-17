import { css, html, LitElement, nothing } from "lit";
import { state } from "lit/decorators.js";
import { store } from "../state";
import { processBoard, setView, togglePlay } from "../gameReducer";
import { View } from "../Types/View";
import { IFeatures } from "../Types/IFeatures";
import { Unsubscribe } from "@reduxjs/toolkit";
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

    .selected {
      background-color: #eecc00;
    }
    button {
      margin: 5px;
      padding: 5px;
      border-radius: 3px;
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
  }

  play() {
    store.dispatch(togglePlay());
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

            ${this.timerId === 0
              ? // ? html`<button @click="${this.advance}">advance one hour</button>`
                nothing
              : nothing}
          </div>
        </div>
      </div>
      <div class="right">
        <button
          ?disabled=${!this.features?.map}
          class="${this.activeView === View.Map ? "selected" : ""}"
          @click="${this.viewMap}"
        >
          satellite feed
        </button>
        <button
          class="${this.activeView === View.Relationships ? "selected" : ""}"
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
