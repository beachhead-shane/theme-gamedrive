import { IGameCell } from "../../Types/IGameCell";
import { ItemType, defaultItems } from "../../Types/Items/Item";

export const destroyAtAgeBehaviour = (
  item: IGameCell,
  board: Array<IGameCell>,
  age: number
) => {
  // Update the kudu's position on the board.

  if (item.item.age >= age) {
    const itemIndex = board.findIndex(
      (cell) => cell.x === item.x && cell.y === item.y
    );

    board[itemIndex].item = defaultItems[ItemType.None];
  }
  return { stop: false, board };
};
