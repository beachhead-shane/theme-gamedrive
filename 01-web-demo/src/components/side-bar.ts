/* eslint-disable lit/no-template-arrow */
import { css, html, LitElement, nothing } from "lit";
import { state } from "lit/decorators.js";
import { store } from "../state";
import {
  dismissMessage,
  IMessage,
  processBoard,
  setAction,
  togglePlay,
} from "../gameReducer";
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
    .stay {
      font-size: 0.5em;
    }

    .message {
      background-color: #fff;
      border: solid 1px;
      border-radius: 5px;
      width: calc (100%-20px);
      margin: 10px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      font-size: 10px;
      padding: 5px;
      text-align: left;
      user-select: none;
    }

    .expand {
      text-overflow: initial;
      white-space: initial;
      overflow: visible;
    }

    .message-action {
      color: red;
      font-weight: bold;
      text-align: center;
      padding: 3px;
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

  @state()
  messages: Array<IMessage>;

  @state()
  selectedMessageIndex = -1;

  unsubscribe: Unsubscribe;
  connectedCallback(): void {
    super.connectedCallback();
    this.unsubscribe = store.subscribe(this.onStateUpdate.bind(this));
    this.onStateUpdate();
  }

  onStateUpdate() {
    this.time = store.getState().game.time;
    this.timerId = store.getState().game.timerId;
    this.messages = store.getState().game.messages;
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
  onMessageClick(index: number) {
    this.selectedMessageIndex = index;
  }
  render() {
    if (!this.activeCell) {
      return html`<div class="container">
        <img src="thumbnails/cellphone.png" class="thumbnail" />
        <div class="heading"></div>
        <b>Messages</b>
        ${this.messages.map(
          (message, index) => html`
            <div
              @click=${() => {
                this.onMessageClick(index);
              }}
              class="message ${this.selectedMessageIndex === index
                ? "expand"
                : ""}"
            >
              <b>${message.from}:</b> ${message.message}
              ${this.selectedMessageIndex === index
                ? html`<div
                    class="message-action"
                    @click=${() => {
                      console.log("dismiss");
                      store.dispatch(dismissMessage());
                    }}
                  >
                    dismiss
                  </div>`
                : nothing}
            </div>
          `
        )}
      </div>`;
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

      <div class="heading">
        <b>Stats</b>
      </div>
      ${Object.keys(this.activeCell.item.stats).map(
        (item) => html`
          <div class="stat">
            ${item}:
            ${(this.activeCell.item.stats as { [key: string]: number })[item]}
          </div>
        `
      )}
    </div>`;
  }
}

// define custom element
customElements.define("side-bar", SideBar);
