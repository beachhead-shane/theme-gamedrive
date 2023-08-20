import { IGameCell } from "../../Types/IGameCell";
import {
  Class,
  Feature,
  HasFeature as hasFeature,
  Order,
  SleepingMode,
} from "../../Types/Items/Item";
import { Behaviour } from "./BehaviourManager";

const REVEAL_DISTANCE = 3;

export const revealAnimalBehaviour: Behaviour = (
  item: IGameCell,
  board: Array<IGameCell>
) => {
  const hiddenAnimal = board.find(
    (x) => x.item.class === Class.Animal && !hasFeature(x.item, Feature.Visible)
  );
  if (!hiddenAnimal) {
    return {
      stop: false,
      board,
    };
  } else {
    const distanceToAnimal =
      Math.abs(item.x - hiddenAnimal.x) + Math.abs(item.y - hiddenAnimal.y);

    if (distanceToAnimal <= REVEAL_DISTANCE) {
      const animalIndex = board.findIndex(
        (cell) => cell.x === hiddenAnimal.x && cell.y === hiddenAnimal.y
      );
      board[animalIndex].item.features.push(Feature.Visible);
      return { stop: false, board };
    }
  }
  const predator = board.find(
    (x) =>
      x.item.order === Order.Predator &&
      x.item.sleepingMode === SleepingMode.Nocturnal
  );
  if (!predator) return { stop: false, board }; // If there's no lion, no specific movement is needed.

  return { stop: false, board };
};
