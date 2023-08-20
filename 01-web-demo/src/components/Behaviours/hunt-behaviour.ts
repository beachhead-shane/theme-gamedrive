import { IGameCell } from "../../Types/IGameCell";
import { Class, ItemType, Order, defaultItems } from "../../Types/Items/Item";
import { TileType } from "../../Types/TileType";
import { Behaviour } from "./BehaviourManager";
import { generatePotentialMovesList } from "./behavior-helper";

export const huntBehaviour: Behaviour = (
  item: IGameCell,
  board: Array<IGameCell>
) => {
  const prey = board.find(
    (x) => x.item.order === Order.Prey && x.item.class === Class.Animal
  );
  if (!prey) return { stop: false, board }; // If there's no kudu, no movement is needed.

  const distanceToPrey = Math.abs(item.x - prey.x) + Math.abs(item.y - prey.y);

  const potentialMoves = generatePotentialMovesList(item);

  // Filter out moves that are out of bounds.
  // If the kudu is within 2 blocks, allow moving onto roads.
  let validMoves = potentialMoves.filter((move) => {
    const cell = board.find((c) => c.x === move.x && c.y === move.y);
    if (!cell) return false;
    if (distanceToPrey <= 4) return true; // Allow all moves if kudu is close.
    return cell.tileType !== TileType.road && cell.tileType !== TileType.water;
  });

  //if no valid moves, allow move over road
  if (validMoves.length == 0) {
    validMoves = potentialMoves.filter((move) => {
      const cell = board.find((c) => c.x === move.x && c.y === move.y);
      if (!cell) return false;
      if (distanceToPrey <= 4) return true; // Allow all moves if kudu is close.
      return cell.tileType !== TileType.water;
    });
  }

  // Find the move that gets the lion closest to the kudu.
  const bestMove = validMoves.reduce((closestMove, move) => {
    const currentDistance =
      Math.abs(prey.x - move.x) + Math.abs(prey.y - move.y);
    const closestDistance =
      Math.abs(prey.x - closestMove.x) + Math.abs(prey.y - closestMove.y);

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
    board[newItemPositionIndex].item.stats.fatigue++;

    const animalTrack = { ...defaultItems()[ItemType.AnimalTrack] };
    board[itemIndex].item = animalTrack;
  }

  return { stop: false, board };
};
