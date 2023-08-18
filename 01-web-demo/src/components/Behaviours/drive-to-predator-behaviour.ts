import { IGameCell } from "../../Types/IGameCell";
import { Class, ItemType, Order, defaultItems } from "../../Types/Items/Item";
import { TileType } from "../../Types/TileType";
import { Behaviour } from "./BehaviourManager";
import { generatePotentialMovesList } from "./behavior-helper";

export const driveToPredatorBehaviour: Behaviour = (
  item: IGameCell,
  board: Array<IGameCell>
) => {
  const predator = board.find(
    (x) => x.item.order === Order.Predator && x.item.class === Class.Animal
  );
  if (!predator) return { stop: false, board }; // If there's no kudu, no movement is needed.

  const distanceToPredator =
    Math.abs(item.x - predator.x) + Math.abs(item.y - predator.y);

  if (distanceToPredator <= 1) {
    //we can fire an event!

    return { stop: true, board };
  }
  const potentialMoves = generatePotentialMovesList(item);

  const validMoves = potentialMoves.filter((move) => {
    const cell = board.find((c) => c.x === move.x && c.y === move.y);
    if (!cell) return false;
    return cell.tileType === TileType.road;
  });

  //if no valid moves, allow move over road
  if (validMoves.length == 0) {
    return { stop: true, board };
  }

  // Find the move that gets the lion closest to the kudu.
  const bestMove = validMoves.reduce((closestMove, move) => {
    const currentDistance =
      Math.abs(predator.x - move.x) + Math.abs(predator.y - move.y);
    const closestDistance =
      Math.abs(predator.x - closestMove.x) +
      Math.abs(predator.y - closestMove.y);

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
    board[itemIndex].item = defaultItems()[ItemType.None];
  }

  return { stop: false, board };
};
