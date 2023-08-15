import { IGameCell } from "../../Types/IGameCell";
import { Behaviour } from "./BehaviourManager";

export const ageBehaviour: Behaviour = (
  item: IGameCell,
  board: Array<IGameCell>
) => {
  // Update the kudu's position on the board.
  const itemIndex = board.findIndex(
    (cell) => cell.x === item.x && cell.y === item.y
  );

  board[itemIndex].item.age++;
  return { stop: false, board };
};
