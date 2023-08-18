/* eslint-disable lit/no-template-arrow */
import { css, html, LitElement, nothing } from "lit";
import { state } from "lit/decorators.js";
import { store } from "../state";
import {
  processBoard,
  processMessageAction,
  selectMessage,
  setAction,
  togglePlay,
} from "../gameReducer";
import { IMessage } from "../Types/IMessage";
import { Unsubscribe } from "@reduxjs/toolkit";
import { Action } from "../Types/Items/Item";
import { getIconFromCell, IGameCell } from "../Types/IGameCell";
class SideBar extends LitElement {
  constructor() {
    super();
  }

  static styles = css`
    ::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }

    ::-webkit-scrollbar-track {
      background: #fff;
      border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #caa000;
    }
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
      line-break: pre;
      cursor: pointer;
    }

    .expand {
      text-overflow: initial;
      white-space: pre-line;
      text-overflow: initial;
      white-space: pre-line;
      overflow-y: scroll;
      max-height: 150px !important;
      cursor: initial;
    }

    .message-action {
      color: red;
      font-weight: bold;
      text-align: center;
      padding: 3px;
      cursor: pointer;
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

    @keyframes pulse-no-shadow {
      0% {
        transform: scale(1.05);
      }

      70% {
        transform: scale(1);
      }

      100% {
        transform: scale(1.05);
      }
    }

    .pulse {
      animation: pulse 2s infinite;
    }

    .pulse-no-shadow {
      animation: pulse-no-shadow 2s infinite;
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

    const activeCell = store.getState().game.selectedItemUID;
    if (activeCell) {
      this.activeCell = store
        .getState()
        .game.cells.find((x) => x.item.uid === activeCell);
    } else {
      this.activeCell = undefined;
    }
  }

  play() {
    store.dispatch(togglePlay());
  }

  selectAction(cell: IGameCell, action: Action, momentary: boolean) {
    store.dispatch(setAction({ cell, action, momentary }));
  }
  onMessageClick(index: number) {
    store.dispatch(selectMessage(index));
    //turn this on for pacing videos.
    /*const utterThis = new SpeechSynthesisUtterance(
      this.messages[index].message
    );
    const synth = window.speechSynthesis;

    synth.speak(utterThis);*/
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
              class="message ${message.isSelected
                ? "expand"
                : message.isRead
                ? ""
                : "pulse"}"
            >
              <b>${message.from}:</b> ${message.message}
              ${message.isSelected
                ? message.action.map(
                    (act) => html`
                      <div
                        class="message-action ${message.highlight
                          ? "pulse-no-shadow"
                          : ""}"
                        @click=${() => {
                          store.dispatch(
                            processMessageAction({
                              messageIndex: index,
                              messageAction: act.action,
                            })
                          );
                        }}
                      >
                        ${act.friendlyName}
                      </div>
                    `
                  )
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
                this.selectAction(
                  this.activeCell,
                  actionDetails.action,
                  actionDetails.momentary
                );
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
