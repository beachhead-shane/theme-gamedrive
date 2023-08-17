import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { store } from "./state";
import { Action, ItemType, defaultItems } from "./Types/Items/Item";
import { TileType } from "./Types/TileType";
import { IGameCell } from "./Types/IGameCell";
import { BehaviourManager } from "./components/Behaviours/BehaviourManager";
import { sleepBehaviour } from "./components/Behaviours/sleep-behaviour";
import { huntBehaviour } from "./components/Behaviours/hunt-behaviour";
import { fleeBehaviour } from "./components/Behaviours/flee-behaviour";
import { forageBehaviour } from "./components/Behaviours/forage-behaviour";
import { trackSleepingPredatorBehaviour } from "./components/Behaviours/tracker-predator-behaviour";
import { revealAnimalBehaviour } from "./components/Behaviours/reveal-animal-behavior";
import { followTrackBehaviour } from "./components/Behaviours/follow-track-behavior";
import { ageBehaviour } from "./components/Behaviours/age-behaviour";
import { destroyAtAgeBehaviour } from "./components/Behaviours/destroy-at-age-behavior";
import { headHomeBehaviour } from "./components/Behaviours/head-home-behaviour";
import { fatiguedBehaviour } from "./components/Behaviours/fatigued-behaviour";
import { destroyAtMoraleBehaviour } from "./components/Behaviours/destroy-at-morale-behavior";

export interface IMessage {
  from: string;
  message: string;
}
export interface gameStateSlice {
  cells: Array<IGameCell>;
  time: number;
  timerId: number;
  selectedCell?: { x: number; y: number };
  messages: Array<IMessage>;
}

const behaviors = {
  None: (item: IGameCell, board: Array<IGameCell>) => {
    return board;
  },
  Lion: (lion: IGameCell, board: Array<IGameCell>, timeOfDay: number) => {
    const behaviourManager: BehaviourManager = new BehaviourManager([
      ageBehaviour,
      sleepBehaviour,
      fatiguedBehaviour,
      huntBehaviour,
    ]);
    return behaviourManager.run(lion, board, timeOfDay);
  },
  Kudu: (kudu: IGameCell, board: Array<IGameCell>, timeOfDay: number) => {
    const behaviourManager: BehaviourManager = new BehaviourManager([
      ageBehaviour,
      fleeBehaviour,
      sleepBehaviour,
      fatiguedBehaviour,
      forageBehaviour,
    ]);
    return behaviourManager.run(kudu, board, timeOfDay);
  },
  Lodge: (item: IGameCell, board: Array<IGameCell>) => {
    return board;
  },
  AnimalTrack: (
    item: IGameCell,
    board: Array<IGameCell>,
    timeOfDay: number
  ) => {
    const destoryAtAgeThreeBehaviour = () => {
      return destroyAtAgeBehaviour(item, board, 3);
    };
    const behaviourManager: BehaviourManager = new BehaviourManager([
      ageBehaviour,
      destoryAtAgeThreeBehaviour,
    ]);
    return behaviourManager.run(item, board, timeOfDay);
  },
  Tracker: (tracker: IGameCell, board: Array<IGameCell>, timeOfDay: number) => {
    if (tracker.item.activeAction === Action.Track) {
      const behaviourManager: BehaviourManager = new BehaviourManager([
        destroyAtMoraleBehaviour,
        ageBehaviour,
        fatiguedBehaviour,
        revealAnimalBehaviour,
        trackSleepingPredatorBehaviour,
        followTrackBehaviour,
        fleeBehaviour,
      ]);
      return behaviourManager.run(tracker, board, timeOfDay);
    }

    if (tracker.item.activeAction === Action.LookOut) {
      const behaviourManager: BehaviourManager = new BehaviourManager([
        fleeBehaviour,
        destroyAtMoraleBehaviour,
      ]);
      return behaviourManager.run(tracker, board, timeOfDay);
    }

    if (tracker.item.activeAction === Action.HeadHome) {
      const behaviourManager: BehaviourManager = new BehaviourManager([
        fleeBehaviour,
        headHomeBehaviour,
      ]);
      return behaviourManager.run(tracker, board, timeOfDay);
    }
  },
  Truck: (item: IGameCell, board: Array<IGameCell>) => {
    return board;
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
        item: defaultItems[ItemType.None],
      };
      cells.push(cell);
    }
  }
  return {
    cells,
    time: 20,
    timerId: 0,
    messages: [
      {
        from: "Tracker",
        message: "I am camping out near the west, no sign of animals",
      },
      {
        from: "Lodge",
        message:
          "The guests are getting bored, lets try find a predator so we can arrange a game drive",
      },
    ],
  };
};
const initialState = GenerateInitialState();

const slice = createSlice({
  name: "game",
  initialState,
  reducers: {
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
    processBoard(state) {
      state.selectedCell = undefined;
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
      action: PayloadAction<{ cell: IGameCell; action: Action }>
    ) {
      console.log(action);
      const index = state.cells.findIndex(
        (x) => x.x == action.payload.cell.x && x.y === action.payload.cell.y
      );
      state.cells[index].item.activeAction = action.payload.action;
    },
    dismissMessage(state, action: PayloadAction<number>) {
      state.messages.splice(action.payload, 1);
    },
    selectCell(state, action: PayloadAction<{ x: number; y: number }>) {
      //deselect
      console.log(state.selectedCell, action.payload);
      if (
        state.selectedCell?.x === action.payload.x &&
        state.selectedCell?.y === action.payload.y
      ) {
        state.selectedCell = null;
        return;
      }
      if (state.timerId !== 0) {
        clearInterval(state.timerId);
        state.timerId = 0;
      }
      state.selectedCell = action.payload;
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
            item: defaultItems[ItemType.None],
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
            cell.item = defaultItems[ItemType.Lion];
          }

          if (r === 0 && g === 0 && b === 255) {
            cell.item = defaultItems[ItemType.Kudu];
          }

          if (r === 0 && g === 255 && b === 0) {
            cell.item = defaultItems[ItemType.Lodge];
          }

          if (r === 255 && g === 255 && b === 0) {
            cell.item = defaultItems[ItemType.Tracker];
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
  loadMap,
  loadItems,
  processBoard,
  togglePlay,
  selectCell,
  setAction,
  dismissMessage,
} = slice.actions;
export default slice.reducer;
