import { IGameCell } from "../../Types/IGameCell";
import { Action, ItemType, defaultItems } from "../../Types/Items/Item";
import { generatePotentialMovesList } from "./behavior-helper";

export const praceTrackerBehaviour = (
  item: IGameCell,
  board: Array<IGameCell>
) => {
  console.log("deploying tracker");
  const itemIndex = board.findIndex(
    (cell) => cell.x === item.x && cell.y === item.y
  );

  const possibleCells = generatePotentialMovesList(item);
  const bestMoves = possibleCells.filter(
    (cell) =>
      board.find((b) => b.x === cell.x && b.y === cell.y).item.itemType ===
      ItemType.None
  );
  if (bestMoves.length > 0) {
    const move = bestMoves[0];
    const index = board.findIndex((x) => x.x === move.x && x.y === move.y);
    board[index].item = defaultItems()[ItemType.Tracker];
    board[itemIndex].item.activeAction = Action.None;
  }

  return { stop: false, board };
};
