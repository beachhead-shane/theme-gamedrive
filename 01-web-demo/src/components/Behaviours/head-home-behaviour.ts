import { IGameCell } from "../../Types/IGameCell";
import { ItemType, defaultItems } from "../../Types/Items/Item";
import { TileType } from "../../Types/TileType";
import { Behaviour } from "./BehaviourManager";
import { generatePotentialMovesList } from "./behavior-helper";

export const headHomeBehaviour: Behaviour = (
  item: IGameCell,
  board: Array<IGameCell>
) => {
  const lodge = board.find((x) => x.item.itemType === ItemType.Lodge);
  if (!lodge) return { stop: false, board }; // If there's no kudu, no movement is needed.

  const distanceToLodge =
    Math.abs(item.x - lodge.x) + Math.abs(item.y - lodge.y);

  const potentialMoves = generatePotentialMovesList(item);

  // Filter out moves that are out of bounds.
  // If the kudu is within 2 blocks, allow moving onto roads.
  let validMoves = potentialMoves.filter((move) => {
    const cell = board.find((c) => c.x === move.x && c.y === move.y);
    if (!cell) return false;
    if (distanceToLodge <= 4) return true; // Allow all moves if kudu is close.
    return cell.tileType !== TileType.road && cell.tileType !== TileType.water;
  });

  //if no valid moves, allow move over road
  if (validMoves.length == 0) {
    validMoves = potentialMoves.filter((move) => {
      const cell = board.find((c) => c.x === move.x && c.y === move.y);
      if (!cell) return false;
      if (distanceToLodge <= 4) return true; // Allow all moves if kudu is close.
      return cell.tileType !== TileType.water;
    });
  }

  // Find the move that gets the lion closest to the kudu.
  const bestMove = validMoves.reduce((closestMove, move) => {
    const currentDistance =
      Math.abs(lodge.x - move.x) + Math.abs(lodge.y - move.y);
    const closestDistance =
      Math.abs(lodge.x - closestMove.x) + Math.abs(lodge.y - closestMove.y);

    return currentDistance < closestDistance ? move : closestMove;
  }, validMoves[0]);

  // Update the lion's position on the board.
  const itemIndex = board.findIndex(
    (cell) => cell.x === item.x && cell.y === item.y
  );
  const newItemPositionIndex = board.findIndex(
    (cell) => cell.x === bestMove.x && cell.y === bestMove.y
  );

  if (itemIndex !== -1 && newItemPositionIndex !== -1) {
    board[newItemPositionIndex].item = { ...board[itemIndex].item };
    board[itemIndex].item = defaultItems[ItemType.None];
  }

  return { stop: false, board };
};
