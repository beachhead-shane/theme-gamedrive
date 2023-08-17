import { IGameCell } from "../../Types/IGameCell";
import { ItemType, defaultItems } from "../../Types/Items/Item";
import { TileType } from "../../Types/TileType";
import { Behaviour } from "./BehaviourManager";
import { generatePotentialMovesList } from "./behavior-helper";

export const followTrackBehaviour: Behaviour = (
  item: IGameCell,
  board: Array<IGameCell>
) => {
  const track = board.find((x) => x.item.itemType === ItemType.AnimalTrack);
  if (!track) return { stop: false, board }; // If there's no kudu, no movement is needed.

  const potentialMoves = generatePotentialMovesList(item);
  const validMoves = potentialMoves.filter((move) => {
    const cell = board.find((c) => c.x === move.x && c.y === move.y);
    if (!cell) return false;
    return cell.tileType !== TileType.water;
  });

  const bestMove = validMoves.reduce((closestMove, move) => {
    const currentDistance =
      Math.abs(track.x - move.x) + Math.abs(track.y - move.y);
    const closestDistance =
      Math.abs(track.x - closestMove.x) + Math.abs(track.y - closestMove.y);

    return currentDistance < closestDistance ? move : closestMove;
  }, validMoves[0]);

  const itemIndex = board.findIndex(
    (cell) => cell.x === item.x && cell.y === item.y
  );
  const newItemPositionIndex = board.findIndex(
    (cell) => cell.x === bestMove.x && cell.y === bestMove.y
  );

  if (itemIndex !== -1 && newItemPositionIndex !== -1) {
    board[newItemPositionIndex].item = { ...board[itemIndex].item };
    board[newItemPositionIndex].item.stats.fatigue++;
    board[itemIndex].item = defaultItems[ItemType.None];
  }

  return { stop: false, board };
};
