import { css, html, LitElement, PropertyValueMap } from "lit";
import "./components/game-board";
import "./components/cell";
import "./components/bottom-bar";
import { store } from "./state";
import { getIconFromCell, IGameCell, loadItems, loadMap } from "./gameReducer";
import { state } from "lit/decorators.js";
import { Unsubscribe } from "@reduxjs/toolkit";
class App extends LitElement {
  constructor() {
    super();
  }
  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
  `;

  @state()
  gameData: Array<IGameCell> = [];

  @state()
  time: number;

  @state()
  playTimer: number = 0;

  unsubscribe: Unsubscribe;
  connectedCallback(): void {
    super.connectedCallback();
    this.unsubscribe = store.subscribe(this.onStateUpdate.bind(this));
    this.onStateUpdate();
  }

  onStateUpdate() {
    this.gameData = store.getState().game.cells;
    this.time = store.getState().game.time;
    console.log("on state update", this.gameData);
  }

  protected firstUpdated(
    _changedProperties: PropertyValueMap<unknown> | Map<PropertyKey, unknown>
  ): void {
    super.firstUpdated(_changedProperties);

    //replacement with a 10x10 pixel map
    const srcMap =
      "data:image/png;base64,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bnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjQuNyAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjMtMDgtMTRUMTI6MzM6MzQrMDQ6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIzLTA4LTE0VDEyOjU3OjQ4KzA0OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIzLTA4LTE0VDEyOjU3OjQ4KzA0OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3MGIwNzJjMS0wNzM1LTRlNmUtYWY2MS1mNWE2NWY0ODAzODUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ZWJiNjIzZjItMmI1NC00ZjIwLWE2YmEtNWU2MzNjNmUwNzZmIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6ZWJiNjIzZjItMmI1NC00ZjIwLWE2YmEtNWU2MzNjNmUwNzZmIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDplYmI2MjNmMi0yYjU0LTRmMjAtYTZiYS01ZTYzM2M2ZTA3NmYiIHN0RXZ0OndoZW49IjIwMjMtMDgtMTRUMTI6MzM6MzQrMDQ6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyNC43IChNYWNpbnRvc2gpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo3MGIwNzJjMS0wNzM1LTRlNmUtYWY2MS1mNWE2NWY0ODAzODUiIHN0RXZ0OndoZW49IjIwMjMtMDgtMTRUMTI6NTc6NDgrMDQ6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyNC43IChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Phbv7dcAAABGSURBVBiVjY9tCgAgCEO36Fh1+g62fpT2gURDkKFvKFEEAI2IlGaveo63DXFVDiFaFiGIyw/abbrBU9mJ15jx4Z/ht+zJDmNpEc3KqcsfAAAAAElFTkSuQmCC";

    const srcItems =
      "data:image/png;base64,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bnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjQuNyAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjMtMDgtMTRUMTI6MzM6MzQrMDQ6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIzLTA4LTE0VDEzOjE0OjEwKzA0OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIzLTA4LTE0VDEzOjE0OjEwKzA0OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5NzcxOTQ5Zi0yYWMyLTQxYWMtYWMxNi0xNGI1ZDhhMmQyMjIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ZWJiNjIzZjItMmI1NC00ZjIwLWE2YmEtNWU2MzNjNmUwNzZmIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6ZWJiNjIzZjItMmI1NC00ZjIwLWE2YmEtNWU2MzNjNmUwNzZmIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDplYmI2MjNmMi0yYjU0LTRmMjAtYTZiYS01ZTYzM2M2ZTA3NmYiIHN0RXZ0OndoZW49IjIwMjMtMDgtMTRUMTI6MzM6MzQrMDQ6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyNC43IChNYWNpbnRvc2gpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo3MGIwNzJjMS0wNzM1LTRlNmUtYWY2MS1mNWE2NWY0ODAzODUiIHN0RXZ0OndoZW49IjIwMjMtMDgtMTRUMTI6NTc6NDgrMDQ6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyNC43IChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo5NzcxOTQ5Zi0yYWMyLTQxYWMtYWMxNi0xNGI1ZDhhMmQyMjIiIHN0RXZ0OndoZW49IjIwMjMtMDgtMTRUMTM6MTQ6MTArMDQ6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyNC43IChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pk0OygkAAAAdSURBVBiVY2AgD/wnUx+tDfuPxSyqupWBgYGBAQDKiAT8JPIH+wAAAABJRU5ErkJggg==";

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const imageMap = new Image();
    imageMap.onload = function () {
      ctx.drawImage(imageMap, 0, 0);
      const imageData = ctx.getImageData(0, 0, imageMap.width, imageMap.height);
      store.dispatch(loadMap(Array.from(imageData.data)));
      const imageItems = new Image();
      imageItems.onload = function () {
        ctx.drawImage(imageItems, 0, 0);
        const imageDataLion = ctx.getImageData(
          0,
          0,
          imageItems.width,
          imageItems.height
        );
        store.dispatch(loadItems(Array.from(imageDataLion.data)));
      };
      imageItems.src = srcItems;
    };
    imageMap.src = srcMap;
  }

  render() {
    return html`
      <game-board>
        ${this.gameData.map(
          (cell) => html`
            <game-cell
              x=${cell.x}
              y=${cell.y}
              tileType=${cell.tileType}
              iconSrc=${getIconFromCell(cell)}
            ></game-cell>
          `
        )}
      </game-board>
      <bottom-bar time=${this.time}></bottom-bar>
    `;
  }
}

// define custom element
customElements.define("pwa-app", App);
