import { css, html, LitElement, nothing } from "lit";
import { state } from "lit/decorators.js";
import { store } from "../state";
import { Unsubscribe } from "@reduxjs/toolkit";
import { IModal, invokeModalButton } from "../gameReducer";
class Modal extends LitElement {
  constructor() {
    super();
  }

  static styles = css`
    .container {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      background-color: rgba(255, 255, 255, 0.9);
      flex-wrap: wrap;
      place-content: center;
      width: 750px;
      height: 615px;
    }

    .modal {
      display: flex;
      flex-wrap: wrap;
      place-content: center;
      max-width: 400px;
      padding: 10px;
      background-color: #ccc;
      border: solid 1px black;
      border-radius: 10px;
      font-size: 12px;
      white-space: pre-line;
    }
    button {
      width: 150px;
      margin: 5px;
      padding: 5px;
      border-radius: 3px;
      white-space: initial;
    }
  `;
  @state()
  modal: IModal;

  invokeModalButtonCB() {
    store.dispatch(invokeModalButton());
  }
  unsubscribe: Unsubscribe;
  connectedCallback(): void {
    super.connectedCallback();
    this.unsubscribe = store.subscribe(this.onStateUpdate.bind(this));
    this.onStateUpdate();
  }

  onStateUpdate() {
    this.modal = store.getState().game.modal;
  }

  render() {
    return html`<div class="container">
      <div class="modal">
        ${this.modal.message}
        ${this.modal.buttonMessage !== ""
          ? html`
              <button @click="${this.invokeModalButtonCB}">
                ${this.modal.buttonMessage}
              </button>
            `
          : nothing}
      </div>
    </div>`;
  }
}

// define custom element
customElements.define("modal-window", Modal);
