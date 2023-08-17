import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { store } from "./state";
import {
  Action,
  MessageAction,
  defaultItems,
  ItemType,
} from "./Types/Items/Item";
import { TileType } from "./Types/TileType";
import { IGameCell } from "./Types/IGameCell";
import { IFeatures } from "./Types/IFeatures";
import { View } from "./Types/View";
import { behaviors } from "./components/Behaviours/behaviors";
import { IMessage } from "./Types/IMessage";

export interface gameStateSlice {
  cells: Array<IGameCell>;
  time: number;
  timerId: number;
  selectedItemUID?: string;
  messages: Array<IMessage>;
  view: View;
  features: IFeatures;
}
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
  };
};
const initialState = GenerateInitialState();

const slice = createSlice({
  name: "game",
  initialState,
  reducers: {
    sendMessage(state, action: PayloadAction<IMessage>) {
      state.messages.push(action.payload);
    },
    togglePlay(state) {
      if (state.timerId === 0) {
        state.timerId = window.setInterval(() => {
          store.dispatch(processBoard());
        }, 2000);
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
      action: PayloadAction<{ x: number; y: number; item: ItemType }>
    ) {
      const index = state.cells.findIndex(
        (x) => x.x === action.payload.x && x.y === action.payload.y
      );
      state.cells[index].item = defaultItems()[action.payload.item];
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
        momentary: boolean;
      }>
    ) {
      console.log(action);
      const index = state.cells.findIndex(
        (x) => x.x == action.payload.cell.x && x.y === action.payload.cell.y
      );
      //if (!action.payload.momentary) {
      state.cells[index].item.activeAction = action.payload.action;
      //}
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
          state.view = View.Map;
          state.features.map = true;
          break;

        case MessageAction.EnableRelationships:
          state.view = View.Relationships;
          state.features.relationships = true;
          break;
        case MessageAction.Dismiss:
          state.messages.splice(action.payload.messageIndex, 1);
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
  pause,
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
} = slice.actions;
export default slice.reducer;
