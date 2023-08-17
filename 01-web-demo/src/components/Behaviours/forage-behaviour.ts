import { IGameCell } from "../../Types/IGameCell";
import { ItemType, defaultItems } from "../../Types/Items/Item";
import { TileType } from "../../Types/TileType";
import { Behaviour } from "./BehaviourManager";
import { generatePotentialMovesList } from "./behavior-helper";

export const forageBehaviour: Behaviour = (
  item: IGameCell,
  board: Array<IGameCell>
) => {
  const potentialMoves = generatePotentialMovesList(item);

  const validMoves = potentialMoves.filter((move) => {
    const cell = board.find((c) => c.x === move.x && c.y === move.y);
    return cell && cell.tileType !== TileType.water;
  });
  // If there's no predator nearby, wander by the water.
  const waterAdjacentMoves = validMoves.filter(() => {
    return potentialMoves.some((adjMove) => {
      const adjCell = board.find((c) => c.x === adjMove.x && c.y === adjMove.y);
      return adjCell && adjCell.tileType === TileType.water;
    });
  });

  if (waterAdjacentMoves.length > 0) {
    const randomMove =
      waterAdjacentMoves[Math.floor(Math.random() * waterAdjacentMoves.length)];

    const kuduIndex = board.findIndex(
      (cell) => cell.x === item.x && cell.y === item.y
    );
    const newKuduPositionIndex = board.findIndex(
      (cell) => cell.x === randomMove.x && cell.y === randomMove.y
    );

    if (kuduIndex !== -1 && newKuduPositionIndex !== -1) {
      board[newKuduPositionIndex].item = { ...board[kuduIndex].item };
      board[kuduIndex].item = defaultItems()[ItemType.None];
    }
  }

  return { stop: false, board };
};
