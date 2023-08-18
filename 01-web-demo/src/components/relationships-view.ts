/* eslint-disable lit/no-template-arrow */
import { css, html, LitElement } from "lit";
import { Character, ICharacter } from "../Types/Characters/ICharacter";
import { Unsubscribe } from "@reduxjs/toolkit";
import { store } from "../state";
import { answerQuestion } from "../gameReducer";
import { state } from "lit/decorators.js";
class RelationshipsView extends LitElement {
  constructor() {
    super();
  }
  unsubscribe: Unsubscribe;
  connectedCallback(): void {
    super.connectedCallback();
    this.unsubscribe = store.subscribe(this.onStateUpdate.bind(this));
    this.onStateUpdate();
  }
  @state()
  characters: Array<ICharacter> = [];

  onStateUpdate() {
    this.characters = store.getState().game.characters;
  }

  static styles = css`
    * {
      margin: 0;
      padding: 0;
    }
    div {
    }
    .container {
      width: 100%;
      height: 100%;
      display: flex;
    }

    .character-card {
      height: 450px;
      margin: 10px;
      width: 210px;
      border: solid 1px black;
      border-radius: 10px;
      background-color: #ccc;
      filter: drop-shadow(16px 16px 10px rgba(0, 0, 0, 0.2));
      font-size: 10px;
      line-height: 17px;
    }
    .header {
      display: flex;
      background-color: #aaa;
      border-radius: 10px;
    }
    .header-text {
      padding-left: 10px;
      padding-top: 5px;
      font-size: 10px;
      line-height: 17px;
      padding-bottom: 5px;
    }
    .thumbnail-image {
      width: 75px;
      height: 75px;
      border-radius: 10px;
    }
    .ellipse {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    .description {
      padding: 10px;
      background-color: #fff;
      cursor: pointer;
    }
    .slider {
      pointer-events: none;
      width: 80%;
      height: 5px;
    }
    .ellipse:focus {
      text-overflow: initial !important;
      white-space: inherit !important;
      overflow: inherit !important;
    }

    .question {
      padding: 10px;
      font-size: 14px;
      line-height: auto;
      margin-bottom: 25px;
    }
    .option {
      margin: 5px;

      margin-top: 15px;
      border-radius: 5px;
      padding: 5px;
      font-size: 12px;
      text-align: left;
    }

    .no-details {
      opacity: 0.5;
    }
  `;

  optionClick(
    questionIndex: number,
    answerIndex: number,
    character: Character
  ) {
    store.dispatch(answerQuestion({ answerIndex, questionIndex, character }));
  }

  render() {
    return html`
      <div id="relationships-view">
        <div class="container">
          ${this.characters.map(
            (character) => html` <div
              class="character-card ${character.actions.length === 0
                ? "no-details"
                : ""}"
            >
              <div class="header">
                <img
                  src="thumbnails/${character.thumbnailSrc}"
                  class="thumbnail-image"
                />
                <div class="header-text">
                  <b>Name:</b> ${character.name}<br />
                  <b>Job:</b> ${character.role}<br />
                  <b>Relationship:</b>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value="${character.stats.relationshipStrength}"
                    class="slider"
                  /><br />
                </div>
              </div>

              ${character.actions.map(
                (action, actionIndex) => html`
                  <div class="question">
                    ${action.question}
                    ${action.options.map(
                      (option, optionIndex) => html`
                        <button
                          class="option"
                          @click=${() => {
                            this.optionClick(
                              actionIndex,
                              optionIndex,
                              character.name
                            );
                          }}
                        >
                          ${option.response}<br />
                          <br />
                          <small class="option-details"
                            >risk: ${option.riskProfile}, reward:
                            x${option.missionAction.rewardMultiplier}
                          </small>
                        </button>
                      `
                    )}
                  </div>
                `
              )}
            </div>`
          )}
        </div>
      </div>
    `;
  }
}

// define custom element
customElements.define("relationships-view", RelationshipsView);
