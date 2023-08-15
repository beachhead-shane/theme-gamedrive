/* eslint-disable lit/no-template-arrow */
import { css, html, LitElement } from "lit";
import { state } from "lit/decorators.js";
import { store } from "../state";
import { processBoard, setAction, togglePlay } from "../gameReducer";
import { Unsubscribe } from "@reduxjs/toolkit";
import { Action } from "../Types/Items/Item";
import { getIconFromCell, IGameCell } from "../Types/IGameCell";
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
    .thumbnail {
      width: 200px;
      height: 200px;
      border-radius: 10px;
    }

    .active {
      background-color: #cca400;
    }
    button {
      width: 150px;
      margin: 5px;
      padding: 5px;
      border-radius: 3px;
    }
    .heading {
      font-weight: bold;
      padding-top: 5px;
      padding-bottom: 10px;
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
  activeCell: IGameCell;

  unsubscribe: Unsubscribe;
  connectedCallback(): void {
    super.connectedCallback();
    this.unsubscribe = store.subscribe(this.onStateUpdate.bind(this));
    this.onStateUpdate();
  }

  onStateUpdate() {
    this.time = store.getState().game.time;
    this.timerId = store.getState().game.timerId;
    const activeCell = store.getState().game.selectedCell;
    if (activeCell) {
      this.activeCell = store
        .getState()
        .game.cells.find((x) => x.x === activeCell.x && x.y === activeCell.y);
    } else {
      this.activeCell = undefined;
    }
  }

  play() {
    store.dispatch(togglePlay());
  }

  selectAction(cell: IGameCell, action: Action) {
    store.dispatch(setAction({ cell, action }));
  }
  render() {
    if (!this.activeCell) {
      return html`<div class="container"></div>`;
    }
    return html`<div class="container">
      <img
        src="thumbnails/${getIconFromCell(this.activeCell)}"
        class="thumbnail"
      />
      <div class="heading">
        <b>${this.activeCell.item.itemType}</b>
      </div>
      Action:
      ${this.activeCell.item.actions?.map(
        (actionDetails) => html`
          <div>
            <button
              class="${this.activeCell.item.activeAction ===
              actionDetails.action
                ? "active"
                : ""}"
              @click="${() => {
                this.selectAction(this.activeCell, actionDetails.action);
              }}"
            >
              ${actionDetails.friendlyName}
            </button>
          </div>
        `
      )}
    </div>`;
  }
}

// define custom element
customElements.define("side-bar", SideBar);
