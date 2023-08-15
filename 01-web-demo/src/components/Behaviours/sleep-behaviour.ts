import { IGameCell } from "../../Types/IGameCell";
import { Item, SleepingMode } from "../../Types/Items/Item";
import { Behaviour } from "./BehaviourManager";

const MIN_DIURNAL = 5;
const MAX_DIARNAL = 20;

const MIN_NOCTURNAL = 20;
const MAX_NOCTURNAL = 4;

export const isSleeping = (item: Item, timeOfDay: number) => {
  if (item.sleepingMode === SleepingMode.None) {
    return false;
  }

  if (item.sleepingMode === SleepingMode.Diurnal) {
    return timeOfDay < MIN_DIURNAL && timeOfDay > MAX_DIARNAL;
  }

  if (item.sleepingMode === SleepingMode.Nocturnal) {
    return timeOfDay < MIN_NOCTURNAL && timeOfDay > MAX_NOCTURNAL;
  }
};

export const sleepBehaviour: Behaviour = (
  item: IGameCell,
  board: Array<IGameCell>,
  timeOfDay: number
) => {
  return { stop: isSleeping(item.item, timeOfDay), board };
};
