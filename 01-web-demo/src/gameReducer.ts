import { PayloadAction, createSlice } from "@reduxjs/toolkit";

enum TileType {
  water = "water",
  road = "road",
  grass = "grass",
}

interface Item {
  icon: string;
  behaviour: (
    gridCell: IGameCell,
    gameData: Array<IGameCell>
  ) => Array<IGameCell>; //mutate the board based on its behaviour
}

export class Lion implements Item {
  icon: "lion.png";
  behaviour: (gridCell: IGameCell, gameData: IGameCell[]) => IGameCell[];
}

enum ItemType {
  Lion,
  Kudu,
  Lodge,
  Tracker,
  Truck,
}

export interface IGameCell {
  x: number;
  y: number;
  tileType: TileType;
  item?: ItemType;
}

export const getIconFromCell = (cell: IGameCell) => {
  switch (cell.item) {
    case ItemType.Lion:
      return "lion.png";
    case ItemType.Kudu:
      return "kudu.png";
    case ItemType.Lodge:
      return "lodge.png";
    case ItemType.Tracker:
      return "tracker.png";
  }
  return "";
};

export interface gameStateSlice {
  cells: Array<IGameCell>;
}

const GenerateInitialState: () => gameStateSlice = () => {
  const cells: Array<IGameCell> = [];

  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      const cell = { x, y, tileType: TileType.grass };
      cells.push(cell);
    }
  }
  return { cells };
};
const initialState = GenerateInitialState();

const slice = createSlice({
  name: "game",
  initialState,
  reducers: {
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
          const cell = { x, y, tileType: tile };
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
            cell.item = ItemType.Lion;
          }

          if (r === 0 && g === 0 && b === 255) {
            cell.item = ItemType.Kudu;
          }

          if (r === 0 && g === 255 && b === 0) {
            cell.item = ItemType.Lodge;
          }

          if (r === 255 && g === 255 && b === 0) {
            cell.item = ItemType.Tracker;
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

export const { loadMap, loadItems } = slice.actions;
export default slice.reducer;
