import { IGameCell } from "../../Types/IGameCell";
import { ItemType, Order, defaultItems } from "../../Types/Items/Item";
import { TileType } from "../../Types/TileType";
import { Behaviour } from "./BehaviourManager";
import { generatePotentialMovesList } from "./behavior-helper";

export const fleeBehaviour: Behaviour = (
  item: IGameCell,
  board: Array<IGameCell>
) => {
  const potentialMoves = generatePotentialMovesList(item);

  const predator = board.find((x) => x.item.order === Order.Predator);

  // Filter out moves that are out of bounds or on a road.
  const validMoves = potentialMoves.filter((move) => {
    const cell = board.find((c) => c.x === move.x && c.y === move.y);
    return cell && cell.tileType !== TileType.water;
  });
  if (predator) {
    const distanceToLion =
      Math.abs(predator.x - item.x) + Math.abs(predator.y - item.y);

    // If the lion is within 3 blocks, move away from it.
    if (distanceToLion <= 3) {
      const bestMove = validMoves.reduce((furthestMove, move) => {
        const currentDistance =
          Math.abs(predator.x - move.x) + Math.abs(predator.y - move.y);
        const furthestDistance =
          Math.abs(predator.x - furthestMove.x) +
          Math.abs(predator.y - furthestMove.y);

        return currentDistance > furthestDistance ? move : furthestMove;
      }, validMoves[0]);

      // Update the kudu's position on the board.
      const kuduIndex = board.findIndex(
        (cell) => cell.x === item.x && cell.y === item.y
      );
      const newKuduPositionIndex = board.findIndex(
        (cell) => cell.x === bestMove.x && cell.y === bestMove.y
      );

      if (kuduIndex !== -1 && newKuduPositionIndex !== -1) {
        board[newKuduPositionIndex].item = { ...board[kuduIndex].item };
        board[newKuduPositionIndex].item.stats.fatigue++;

        board[kuduIndex].item = defaultItems[ItemType.None];
      }

      return { stop: true, board };
    }
  }

  return { stop: false, board };
};
