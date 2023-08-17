import { IGameCell } from "../../Types/IGameCell";
import { Behaviour } from "./BehaviourManager";

export const fatiguedBehaviour: Behaviour = (
  item: IGameCell,
  board: Array<IGameCell>
) => {
  if (item.item.stats.fatigue && item.item.stats.fatigue >= 4) {
    if (item.item.stats.morale) {
      const index = board.findIndex((x) => x.x === item.x && x.y === item.y);
      if (board[index].item.stats.morale > 0) {
        board[index].item.stats.morale--;
      }
    }
    return { stop: true, board };
  }
  return { stop: false, board };
};
