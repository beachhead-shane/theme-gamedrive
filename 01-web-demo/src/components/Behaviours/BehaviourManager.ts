import { IGameCell } from "../../Types/IGameCell";

export type Behaviour = (
  item: IGameCell,
  board: Array<IGameCell>,
  timeOfDay: number
) => { stop: boolean; board: Array<IGameCell> };

export class BehaviourManager {
  behaviours: Array<Behaviour> = [];

  constructor(beh: Array<Behaviour>) {
    this.behaviours = beh;
  }

  run(
    item: IGameCell,
    board: Array<IGameCell>,
    timeOfDay: number
  ): Array<IGameCell> {
    let mutatedBoard = [...board];
    for (let i = 0; i < this.behaviours.length; i++) {
      const result = this.behaviours[i](item, mutatedBoard, timeOfDay);
      if (result.stop) {
        return result.board;
      } else {
        mutatedBoard = result.board;
      }
    }
    return mutatedBoard;
  }
}
