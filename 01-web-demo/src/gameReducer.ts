const TICK_LENGTH = 1000;
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { store } from "./state";
import {
  Action,
  MessageAction,
  defaultItems,
  ItemType,
  Order,
  HasFeature,
  Feature,
} from "./Types/Items/Item";
import { TileType } from "./Types/TileType";
import { IGameCell } from "./Types/IGameCell";
import { IFeatures } from "./Types/IFeatures";
import { View } from "./Types/View";
import { behaviors } from "./components/Behaviours/behaviors";
import { IMessage } from "./Types/IMessage";
import {
  Character,
  Custodian,
  ICharacter,
  ICharacterAction,
  LysandraKorr,
  MissionAction,
  MissionType,
  Tracker,
} from "./Types/Characters/ICharacter";

const enum MissionState {
  Unset,
  Initialized,
  Complete,
}
export interface IMissionData {
  missionState: MissionState;
  missionAction: MissionAction;
  itemUIDS: Array<string>;
}

export interface IModal {
  message: string;
  buttonMessage: string;
  visible: boolean;
}
export interface gameStateSlice {
  cells: Array<IGameCell>;
  time: number;
  timerId: number;
  selectedItemUID?: string;
  messages: Array<IMessage>;
  view: View;
  features: IFeatures;
  activeMissions: Array<IMissionData>;
  characters: Array<ICharacter>;
  bankBalance: number;
  modal: IModal;
}

export const missions = {
  GameDrive: (mission: IMissionData, board: Array<IGameCell>) => {
    if (mission.missionState === MissionState.Unset) {
      //if complete return true
      const x = 9;
      const y = 1;
      const index = board.findIndex((item) => item.x === x && item.y === y);
      const truck = defaultItems()[ItemType.Truck];
      mission.itemUIDS.push(truck.uid);
      board[index].item = truck;
      mission.missionState = MissionState.Initialized;
    } else if (mission.missionState === MissionState.Initialized) {
      //if we have found an animal, take me off the board.
      const truck = board.find((x) => x.item.uid === mission.itemUIDS[0]);
      const predator = board.find((x) => x.item.order === Order.Predator);
      const distanceToPredator =
        Math.abs(truck.x - predator.x) + Math.abs(truck.y - predator.y);

      if (distanceToPredator <= 1) {
        mission.missionState = MissionState.Complete;
        const truckIndex = board.findIndex(
          (x) => x.item.uid === mission.itemUIDS[0]
        );
        board[truckIndex].item = defaultItems()[ItemType.None];
      }
    }
    return {
      done: mission.missionState === MissionState.Complete,
      board: board,
      mission: mission,
    };
  },

  EndGame: (mission: IMissionData, board: Array<IGameCell>) => {
    mission.missionState = MissionState.Complete;
    return {
      done: true,
      board: board,
      mission: mission,
    };
  },
};
const GenerateInitialState: () => gameStateSlice = () => {
  const cells: Array<IGameCell> = [];

  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      const cell = {
        x,
        y,
        tileType: TileType.grass,
        item: defaultItems()[ItemType.None],
      };
      cells.push(cell);
    }
  }
  return {
    cells,
    time: 20,
    timerId: 0,
    messages: [],
    view: View.None,
    features: {},
    activeMissions: [],
    characters: [Custodian(), LysandraKorr(), Tracker()],
    bankBalance: 100,
    modal: {
      message:
        "This prototype is crafted to showcase the essence of our moment-to-moment gameplay and foundational story elements. Our goal is to present a simulation and role-playing game game that features a user-friendly interface, making it accessible for newcomers. At the same time, we offer an engaging and novel subject matter designed to captivate seasoned fans of the genre.",
      buttonMessage: "Click here to start",
      visible: true,
    },
  };
};
const initialState = GenerateInitialState();

const slice = createSlice({
  name: "game",
  initialState,
  reducers: {
    answerQuestion(
      state,
      action: PayloadAction<{
        answerIndex: number;
        questionIndex: number;
        character: Character;
      }>
    ) {
      console.log("answering question:", action.payload);
      const index = state.characters.findIndex(
        (x) => x.name === action.payload.character
      );
      const mission =
        state.characters[index].actions[action.payload.questionIndex].options[
          action.payload.answerIndex
        ];
      state.activeMissions.unshift({
        missionState: MissionState.Unset,
        missionAction: mission.missionAction,
        itemUIDS: [],
      });
      state.characters[index].actions.splice(action.payload.questionIndex, 1);
    },
    sendMessage(state, action: PayloadAction<IMessage>) {
      state.messages.unshift(action.payload);
    },
    selectMessage(state, action: PayloadAction<number>) {
      state.messages.forEach((msg, index) => {
        const isMatch = index === action.payload;
        msg.isSelected = isMatch;
        if (isMatch) {
          msg.isRead = true;
        }
      });
    },
    loadSaveForGameSlice(state) {
      if (localStorage.getItem("board_state")) {
        const stateFromDisk = JSON.parse(localStorage.getItem("board_state"))[
          "game"
        ];
        state.cells = stateFromDisk.cells;
        state.features = stateFromDisk.features || {};
        state.messages = stateFromDisk.messages;
        state.selectedItemUID = stateFromDisk.selectedItemUID;
        state.time = stateFromDisk.time;
        state.timerId = stateFromDisk.timerId;
        state.characters = stateFromDisk.characters;
        state.modal = stateFromDisk.modal;
        state.bankBalance = stateFromDisk.bankBalance;
        //we need to start timer
        if (state.timerId && state.timerId > 0) {
          state.timerId = window.setInterval(() => {
            store.dispatch(processBoard());
            store.dispatch(processMissions());
          }, TICK_LENGTH);
        }
        state.view = stateFromDisk.view;
      }
    },
    clearSelectedItem(state) {
      state.selectedItemUID = null;
    },
    togglePlay(state) {
      if (state.timerId === 0) {
        state.timerId = window.setInterval(() => {
          store.dispatch(processBoard());
          store.dispatch(processMissions());
        }, TICK_LENGTH);
      } else {
        window.clearInterval(state.timerId);
        state.timerId = 0;
      }
    },
    invokeModalButton(state) {
      state.modal.visible = false;
      if (state.timerId === 0) {
        state.timerId = window.setInterval(() => {
          store.dispatch(processBoard());
          store.dispatch(processMissions());
        }, TICK_LENGTH);
      } else {
        window.clearInterval(state.timerId);
        state.timerId = 0;
      }
    },
    pause(state) {
      window.clearInterval(state.timerId);
      state.timerId = 0;
    },
    placeItem(
      state,
      action: PayloadAction<{
        x: number;
        y: number;
        item: ItemType;
      }>
    ) {
      const index = state.cells.findIndex(
        (x) => x.x === action.payload.x && x.y === action.payload.y
      );
      state.cells[index].item = defaultItems()[action.payload.item];
    },
    highlightItem(state, action: PayloadAction<{ x: number; y: number }>) {
      const index = state.cells.findIndex(
        (x) => x.x === action.payload.x && x.y === action.payload.y
      );
      if (!HasFeature(state.cells[index].item, Feature.Highlight)) {
        state.cells[index].item.features.push(Feature.Highlight);
      }
    },
    unhighlightItem(state, action: PayloadAction<{ x: number; y: number }>) {
      const index = state.cells.findIndex(
        (x) => x.x === action.payload.x && x.y === action.payload.y
      );
      console.log([...state.cells[index].item.features]);
      state.cells[index].item.features = [
        ...state.cells[index].item.features.filter(
          (x) => x !== Feature.Highlight
        ),
      ];
      console.log([...state.cells[index].item.features]);
    },
    processMissions(state) {
      const done: Array<boolean> = [];
      state.activeMissions.forEach((mission) => {
        console.log(mission);
        const result = missions[mission.missionAction.missionType](
          mission,
          state.cells
        );
        done.push(result.done);
        state.cells = result.board;
      });

      const completedMissions = state.activeMissions.filter(
        (opt, index) => done[index]
      );

      completedMissions.forEach((mission) => {
        if (mission.missionAction.missionType === MissionType.EndGame) {
          state.modal.buttonMessage = "Ok";
          state.modal.visible = true;
          state.modal.message = `Thank you for taking the time to try out our prototype. We're excited about our vision for this game, which involves a rich blend of wildlife conservation, lodge management, and community interactions.

            The core gameplay is all about making impactful decisions that will shape your lodge's reputation, your finances, and even the natural world you're a part of.

            We appreciate your interest and can't wait to share more developments with you.

            Click "Replay" on the bottom left to play through again.`;
        }
        console.log("mission complete!", mission);
        state.bankBalance += 100 * mission.missionAction.rewardMultiplier;

        mission.missionAction.modifyRelationship.forEach((rel) => {
          const characterIndex = state.characters.findIndex(
            (x) => x.name == rel.character
          );
          state.characters[characterIndex].stats.relationshipStrength +=
            rel.value;
        });
      });

      state.activeMissions = state.activeMissions.filter(
        (opt, index) => !done[index]
      );
    },
    processBoard(state) {
      const items = state.cells.filter((x) => {
        if (x.item.itemType !== ItemType.None) {
          return x;
        }
      });
      items.forEach((x) => {
        if (x.item)
          state.cells = behaviors[x.item.itemType](x, state.cells, state.time);
      });
      state.time++;
      if (state.time >= 24) {
        state.time = 0;
      }
    },
    setAction(
      state,
      action: PayloadAction<{
        cell: IGameCell;
        action: Action;
      }>
    ) {
      const index = state.cells.findIndex(
        (x) => x.x == action.payload.cell.x && x.y === action.payload.cell.y
      );
      const actionIndex = state.cells[index].item.actions.findIndex(
        (x) => x.action === action.payload.action
      );
      const cost = state.cells[index].item.actions[actionIndex].actionCost;
      if (state.bankBalance <= cost) {
        return;
      }
      state.bankBalance -= cost;

      state.cells[index].item.activeAction = action.payload.action;

      state.cells[index].item.actions[actionIndex].features = state.cells[
        index
      ].item.actions[actionIndex].features.filter(
        (x) => x !== Feature.Highlight
      );
    },

    addCharacterAction(
      state,
      action: PayloadAction<{
        character: Character;
        characterAction: ICharacterAction;
      }>
    ) {
      const index = state.characters.findIndex(
        (x) => x.name === action.payload.character
      );
      state.characters[index].actions.push(action.payload.characterAction);
    },
    dismissMessage(state, action: PayloadAction<number>) {
      state.messages.splice(action.payload, 1);
    },
    selectItem(state, action: PayloadAction<string>) {
      if (state.selectedItemUID === action.payload) {
        state.selectedItemUID = null;
      } else {
        state.selectedItemUID = action.payload;
      }
    },
    setView(state, action: PayloadAction<View>) {
      state.view = action.payload;
    },
    processMessageAction(
      state,
      action: PayloadAction<{
        messageIndex: number;
        messageAction: MessageAction;
      }>
    ) {
      switch (action.payload.messageAction) {
        case MessageAction.EnableMap:
          console.log("enabling map!");
          state.view = View.Map;
          state.features.map = true;
          break;

        case MessageAction.EnableRelationships:
          state.features.relationships = true;
          break;

        case MessageAction.DonateMoney:
          state.bankBalance += 60;
          break;

        case MessageAction.Dismiss:
          break;
      }
      state.messages.splice(action.payload.messageIndex, 1);
    },
    loadMap(state, action: PayloadAction<Array<number>>) {
      const cells: Array<IGameCell> = [];
      const imageData = action.payload;
      for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
          const xOffset = 10 * 4 * x;
          const yOffset = 4 * y;
          const r = imageData[xOffset + yOffset];
          const g = imageData[xOffset + yOffset + 1];
          let tile = TileType.water;
          if (r === 255) {
            tile = TileType.road;
          }
          if (g === 255) {
            tile = TileType.grass;
          }
          const cell = {
            x,
            y,
            tileType: tile,
            item: defaultItems()[ItemType.None],
          };
          cells.push(cell);
        }
        state.cells = cells;
      }
      return;
    },
    loadItems(state, action: PayloadAction<Array<number>>) {
      const newCells: Array<IGameCell> = [];
      const imageData = action.payload;
      let i = 0;
      for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
          const xOffset = 10 * 4 * x;
          const yOffset = 4 * y;
          const r = imageData[xOffset + yOffset];
          const g = imageData[xOffset + yOffset + 1];
          const b = imageData[xOffset + yOffset + 2];
          const cell = { ...state.cells[i] };
          if (r === 255 && g === 0 && b === 0) {
            //   cell.item = defaultItems[ItemType.Lion];
          }

          if (r === 0 && g === 0 && b === 255) {
            //    cell.item = defaultItems[ItemType.Kudu];
          }

          if (r === 0 && g === 255 && b === 0) {
            cell.item = defaultItems()[ItemType.Lodge];
          }

          if (r === 255 && g === 255 && b === 0) {
            //   cell.item = defaultItems[ItemType.Tracker];
          }
          newCells.push(cell);
          i++;
        }
      }
      state.cells = newCells;
      return;
    },
  },
});

export const {
  addCharacterAction,
  pause,
  invokeModalButton,
  loadMap,
  loadItems,
  processBoard,
  togglePlay,
  selectItem,
  setAction,
  dismissMessage,
  processMessageAction,
  sendMessage,
  placeItem,
  setView,
  loadSaveForGameSlice,
  selectMessage,
  answerQuestion,
  processMissions,
  highlightItem,
  unhighlightItem,
  clearSelectedItem,
} = slice.actions;
export default slice.reducer;
