import { IGameCell } from "../../Types/IGameCell";
import {
  ItemType,
  Order,
  SleepingMode,
  defaultItems,
} from "../../Types/Items/Item";
import { Behaviour } from "./BehaviourManager";
import { generatePotentialMovesList } from "./behavior-helper";

export const trackSleepingPredatorBehaviour: Behaviour = (
  item: IGameCell,
  board: Array<IGameCell>
) => {
  //find nocturnal prey
  const predator = board.find(
    (x) =>
      x.item.order === Order.Predator &&
      x.item.sleepingMode === SleepingMode.Nocturnal
  );
  if (!predator) return { stop: false, board }; // If there's no lion, no specific movement is needed.

  const potentialMoves = generatePotentialMovesList(item);

  // If the lion is sleeping (between 9:00 and 16:00), move closer to it.

  const distanceToAnimal =
    Math.abs(item.x - predator.x) + Math.abs(item.y - predator.y);

  if (distanceToAnimal <= 2) {
    // we are too close do nothing
    return { stop: true, board };
  }
  //  if (isSleeping(predator.item, timeOfDay)) {
  const bestMove = potentialMoves.reduce((closestMove, move) => {
    const currentDistance =
      Math.abs(predator.x - move.x) + Math.abs(predator.y - move.y);
    const closestDistance =
      Math.abs(predator.x - closestMove.x) +
      Math.abs(predator.y - closestMove.y);

    return currentDistance < closestDistance ? move : closestMove;
  }, potentialMoves[0]);
  // Update the tracker's position on the board.
  const trackerIndex = board.findIndex(
    (cell) => cell.x === item.x && cell.y === item.y
  );
  const newTrackerPositionIndex = board.findIndex(
    (cell) => cell.x === bestMove.x && cell.y === bestMove.y
  );

  if (trackerIndex !== -1 && newTrackerPositionIndex !== -1) {
    board[newTrackerPositionIndex].item = { ...board[trackerIndex].item };
    board[newTrackerPositionIndex].item.stats.fatigue += 1;
    board[trackerIndex].item = defaultItems()[ItemType.None];
  }
  return { stop: true, board };
  // }

  // return { stop: false, board };
};
