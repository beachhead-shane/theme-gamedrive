import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { store } from "./state";

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
  None = "None",
  Lion = "Lion",
  Kudu = "Kudu",
  Lodge = "Lodge",
  Tracker = "Tracker",
  Truck = "Truck",
}

export interface IGameCell {
  x: number;
  y: number;
  tileType: TileType;
  item: ItemType;
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
  time: number;
  timerId: number;
}

const behaviors = {
  None: (item: IGameCell, board: Array<IGameCell>) => {
    return board;
  },
  Lion: (lion: IGameCell, board: Array<IGameCell>, timeOfDay: number) => {
    if (timeOfDay > 4 && timeOfDay < 19) {
      return board;
    }
    const kudu = board.find((x) => x.item === ItemType.Kudu);
    if (!kudu) return board; // If there's no kudu, no movement is needed.

    const distanceToKudu =
      Math.abs(kudu.x - lion.x) + Math.abs(kudu.y - lion.y);

    const potentialMoves = [
      { x: lion.x + 1, y: lion.y },
      { x: lion.x - 1, y: lion.y },
      { x: lion.x, y: lion.y + 1 },
      { x: lion.x, y: lion.y - 1 },
      { x: lion.x + 1, y: lion.y + 1 },
      { x: lion.x - 1, y: lion.y - 1 },
      { x: lion.x + 1, y: lion.y - 1 },
      { x: lion.x - 1, y: lion.y + 1 },
    ];

    // Filter out moves that are out of bounds.
    // If the kudu is within 2 blocks, allow moving onto roads.
    let validMoves = potentialMoves.filter((move) => {
      const cell = board.find((c) => c.x === move.x && c.y === move.y);
      if (!cell) return false;
      if (distanceToKudu <= 4) return true; // Allow all moves if kudu is close.
      return (
        cell.tileType !== TileType.road && cell.tileType !== TileType.water
      );
    });

    //if no valid moves, allow move over road
    if (validMoves.length == 0) {
      validMoves = potentialMoves.filter((move) => {
        const cell = board.find((c) => c.x === move.x && c.y === move.y);
        if (!cell) return false;
        if (distanceToKudu <= 4) return true; // Allow all moves if kudu is close.
        return cell.tileType !== TileType.water;
      });
    }

    // Find the move that gets the lion closest to the kudu.
    const bestMove = validMoves.reduce((closestMove, move) => {
      const currentDistance =
        Math.abs(kudu.x - move.x) + Math.abs(kudu.y - move.y);
      const closestDistance =
        Math.abs(kudu.x - closestMove.x) + Math.abs(kudu.y - closestMove.y);

      return currentDistance < closestDistance ? move : closestMove;
    }, validMoves[0]);

    // Update the lion's position on the board.
    const lionIndex = board.findIndex(
      (cell) => cell.x === lion.x && cell.y === lion.y
    );
    const newLionPositionIndex = board.findIndex(
      (cell) => cell.x === bestMove.x && cell.y === bestMove.y
    );

    if (lionIndex !== -1 && newLionPositionIndex !== -1) {
      board[lionIndex].item = ItemType.None;
      board[newLionPositionIndex].item = ItemType.Lion;
    }

    return board;
  },
  Kudu: (kudu: IGameCell, board: Array<IGameCell>) => {
    const lion = board.find((x) => x.item === ItemType.Lion);

    const potentialMoves = [
      { x: kudu.x + 1, y: kudu.y },
      { x: kudu.x - 1, y: kudu.y },
      { x: kudu.x, y: kudu.y + 1 },
      { x: kudu.x, y: kudu.y - 1 },
      { x: kudu.x + 1, y: kudu.y + 1 },
      { x: kudu.x - 1, y: kudu.y - 1 },
      { x: kudu.x + 1, y: kudu.y - 1 },
      { x: kudu.x - 1, y: kudu.y + 1 },
    ];

    // Filter out moves that are out of bounds or on a road.
    const validMoves = potentialMoves.filter((move) => {
      const cell = board.find((c) => c.x === move.x && c.y === move.y);
      return cell && cell.tileType !== TileType.water;
    });
    if (lion) {
      const distanceToLion =
        Math.abs(lion.x - kudu.x) + Math.abs(lion.y - kudu.y);

      // If the lion is within 3 blocks, move away from it.
      if (distanceToLion <= 3) {
        const bestMove = validMoves.reduce((furthestMove, move) => {
          const currentDistance =
            Math.abs(lion.x - move.x) + Math.abs(lion.y - move.y);
          const furthestDistance =
            Math.abs(lion.x - furthestMove.x) +
            Math.abs(lion.y - furthestMove.y);

          return currentDistance > furthestDistance ? move : furthestMove;
        }, validMoves[0]);

        // Update the kudu's position on the board.
        const kuduIndex = board.findIndex(
          (cell) => cell.x === kudu.x && cell.y === kudu.y
        );
        const newKuduPositionIndex = board.findIndex(
          (cell) => cell.x === bestMove.x && cell.y === bestMove.y
        );

        if (kuduIndex !== -1 && newKuduPositionIndex !== -1) {
          board[kuduIndex].item = ItemType.None;
          board[newKuduPositionIndex].item = ItemType.Kudu;
        }

        return board;
      }
    }

    // If there's no lion nearby, wander by the water.
    const waterAdjacentMoves = validMoves.filter(() => {
      return potentialMoves.some((adjMove) => {
        const adjCell = board.find(
          (c) => c.x === adjMove.x && c.y === adjMove.y
        );
        return adjCell && adjCell.tileType === TileType.water;
      });
    });

    if (waterAdjacentMoves.length > 0) {
      const randomMove =
        waterAdjacentMoves[
          Math.floor(Math.random() * waterAdjacentMoves.length)
        ];

      const kuduIndex = board.findIndex(
        (cell) => cell.x === kudu.x && cell.y === kudu.y
      );
      const newKuduPositionIndex = board.findIndex(
        (cell) => cell.x === randomMove.x && cell.y === randomMove.y
      );

      if (kuduIndex !== -1 && newKuduPositionIndex !== -1) {
        board[kuduIndex].item = ItemType.None;
        board[newKuduPositionIndex].item = ItemType.Kudu;
      }
    }

    return board;
  },
  Lodge: (item: IGameCell, board: Array<IGameCell>) => {
    return board;
  },
  Tracker: (tracker: IGameCell, board: Array<IGameCell>, timeOfDay: number) => {
    const lion = board.find((x) => x.item === ItemType.Lion);
    const kudu = board.find((x) => x.item === ItemType.Kudu);

    if (!lion) return board; // If there's no lion, no specific movement is needed.

    const distanceToLion =
      Math.abs(lion.x - tracker.x) + Math.abs(lion.y - tracker.y);

    const potentialMoves = [
      { x: tracker.x + 1, y: tracker.y },
      { x: tracker.x - 1, y: tracker.y },
      { x: tracker.x, y: tracker.y + 1 },
      { x: tracker.x, y: tracker.y - 1 },
      { x: tracker.x + 1, y: tracker.y + 1 },
      { x: tracker.x - 1, y: tracker.y - 1 },
      { x: tracker.x + 1, y: tracker.y - 1 },
      { x: tracker.x - 1, y: tracker.y + 1 },
    ];

    // Filter out moves that are out of bounds or on a road.
    const validMoves = potentialMoves.filter((move) => {
      const cell = board.find((c) => c.x === move.x && c.y === move.y);
      return cell && cell.tileType !== TileType.road;
    });

    // If the lion is sleeping (between 9:00 and 16:00), move closer to it.
    if (timeOfDay >= 9 && timeOfDay <= 17) {
      const bestMove = validMoves.reduce((closestMove, move) => {
        const currentDistance =
          Math.abs(lion.x - move.x) + Math.abs(lion.y - move.y);
        const closestDistance =
          Math.abs(lion.x - closestMove.x) + Math.abs(lion.y - closestMove.y);

        return currentDistance < closestDistance ? move : closestMove;
      }, validMoves[0]);

      // Update the tracker's position on the board.
      const trackerIndex = board.findIndex(
        (cell) => cell.x === tracker.x && cell.y === tracker.y
      );
      const newTrackerPositionIndex = board.findIndex(
        (cell) => cell.x === bestMove.x && cell.y === bestMove.y
      );

      if (trackerIndex !== -1 && newTrackerPositionIndex !== -1) {
        board[trackerIndex].item = ItemType.None;
        board[newTrackerPositionIndex].item = ItemType.Tracker;
      }

      return board;
    }
    // If the lion is too close, move away from it.
    if (distanceToLion <= 2) {
      const bestMove = validMoves.reduce((furthestMove, move) => {
        const currentDistance =
          Math.abs(lion.x - move.x) + Math.abs(lion.y - move.y);
        const furthestDistance =
          Math.abs(lion.x - furthestMove.x) + Math.abs(lion.y - furthestMove.y);

        return currentDistance > furthestDistance ? move : furthestMove;
      }, validMoves[0]);

      // Update the tracker's position on the board.
      const trackerIndex = board.findIndex(
        (cell) => cell.x === tracker.x && cell.y === tracker.y
      );
      const newTrackerPositionIndex = board.findIndex(
        (cell) => cell.x === bestMove.x && cell.y === bestMove.y
      );

      if (trackerIndex !== -1 && newTrackerPositionIndex !== -1) {
        board[trackerIndex].item = ItemType.None;
        board[newTrackerPositionIndex].item = ItemType.Tracker;
      }

      return board;
    }

    // If the lion is moving towards a kudu, anticipate its path.
    if (kudu) {
      const distanceLionToKudu =
        Math.abs(kudu.x - lion.x) + Math.abs(kudu.y - lion.y);
      if (distanceLionToKudu <= 6) {
        // Alert the player of an imminent kill.
        console.log("Alert: Lion is close to Kudu!");

        // Move the tracker closer to the anticipated path of the lion.
        const bestMove = validMoves.reduce((closestMove, move) => {
          const currentDistance =
            Math.abs(kudu.x - move.x) + Math.abs(kudu.y - move.y);
          const closestDistance =
            Math.abs(kudu.x - closestMove.x) + Math.abs(kudu.y - closestMove.y);

          return currentDistance < closestDistance ? move : closestMove;
        }, validMoves[0]);

        // Update the tracker's position on the board.
        const trackerIndex = board.findIndex(
          (cell) => cell.x === tracker.x && cell.y === tracker.y
        );
        const newTrackerPositionIndex = board.findIndex(
          (cell) => cell.x === bestMove.x && cell.y === bestMove.y
        );

        if (trackerIndex !== -1 && newTrackerPositionIndex !== -1) {
          board[trackerIndex].item = ItemType.None;
          board[newTrackerPositionIndex].item = ItemType.Tracker;
        }
      }
    }

    return board;
  },
  Truck: (item: IGameCell, board: Array<IGameCell>) => {
    return board;
  },
};
const GenerateInitialState: () => gameStateSlice = () => {
  const cells: Array<IGameCell> = [];

  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      const cell = { x, y, tileType: TileType.grass, item: ItemType.None };
      cells.push(cell);
    }
  }
  return { cells, time: 15, timerId: 0 };
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
      const items = state.cells.filter((x) => {
        if (x.item !== ItemType.None) {
          return x;
        }
      });
      items.forEach((x) => {
        if (x.item) state.cells = behaviors[x.item](x, state.cells, state.time);
      });
      state.time++;
      if (state.time >= 24) {
        state.time = 0;
      }
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
          const cell = { x, y, tileType: tile, item: ItemType.None };
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

      //pepper some RNG

      return;
    },
  },
});

export const { loadMap, loadItems, processBoard, togglePlay } = slice.actions;
export default slice.reducer;
