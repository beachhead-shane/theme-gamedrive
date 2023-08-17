import { IGameCell } from "../../Types/IGameCell";
import { ItemType, defaultItems } from "../../Types/Items/Item";

export const destroyAtMoraleBehaviour = (
  item: IGameCell,
  board: Array<IGameCell>
) => {
  // Update the kudu's position on the board.

  if (item.item.stats.morale === 0) {
    const itemIndex = board.findIndex(
      (cell) => cell.x === item.x && cell.y === item.y
    );

    board[itemIndex].item = defaultItems()[ItemType.None];
    return { stop: true, board };
  }
  return { stop: false, board };
};
