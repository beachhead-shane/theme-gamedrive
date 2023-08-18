import { Action } from "../../Types/Items/Item";
import { IGameCell } from "../../Types/IGameCell";
import { BehaviourManager } from "./BehaviourManager";
import { sleepBehaviour } from "./sleep-behaviour";
import { huntBehaviour } from "./hunt-behaviour";
import { fleeBehaviour } from "./flee-behaviour";
import { forageBehaviour } from "./forage-behaviour";
import { trackSleepingPredatorBehaviour } from "./tracker-predator-behaviour";
import { revealAnimalBehaviour } from "./reveal-animal-behavior";
import { followTrackBehaviour } from "./follow-track-behavior";
import { ageBehaviour } from "./age-behaviour";
import { destroyAtAgeBehaviour } from "./destroy-at-age-behavior";
import { headHomeBehaviour } from "./head-home-behaviour";
import { fatiguedBehaviour } from "./fatigued-behaviour";
import { destroyAtMoraleBehaviour } from "./destroy-at-morale-behavior";
import { praceTrackerBehaviour } from "./place-tracker-behaviour";

export const behaviors = {
  None: (item: IGameCell, board: Array<IGameCell>) => {
    return board;
  },
  Lion: (lion: IGameCell, board: Array<IGameCell>, timeOfDay: number) => {
    const behaviourManager: BehaviourManager = new BehaviourManager([
      ageBehaviour,
      sleepBehaviour,
      fatiguedBehaviour,
      huntBehaviour,
    ]);
    return behaviourManager.run(lion, board, timeOfDay);
  },
  Kudu: (kudu: IGameCell, board: Array<IGameCell>, timeOfDay: number) => {
    const behaviourManager: BehaviourManager = new BehaviourManager([
      ageBehaviour,
      fleeBehaviour,
      sleepBehaviour,
      fatiguedBehaviour,
      forageBehaviour,
    ]);
    return behaviourManager.run(kudu, board, timeOfDay);
  },
  Lodge: (item: IGameCell, board: Array<IGameCell>, timeOfDay: number) => {
    if (item.item.activeAction === Action.DeployTrackerFromLodge) {
      const behaviourManager: BehaviourManager = new BehaviourManager([
        ageBehaviour,
        praceTrackerBehaviour,
      ]);
      return behaviourManager.run(item, board, timeOfDay);
    } else {
      const behaviourManager: BehaviourManager = new BehaviourManager([
        ageBehaviour,
      ]);
      return behaviourManager.run(item, board, timeOfDay);
    }
  },
  AnimalTrack: (
    item: IGameCell,
    board: Array<IGameCell>,
    timeOfDay: number
  ) => {
    const destoryAtAgeThreeBehaviour = () => {
      return destroyAtAgeBehaviour(item, board, 3);
    };
    const behaviourManager: BehaviourManager = new BehaviourManager([
      ageBehaviour,
      destoryAtAgeThreeBehaviour,
    ]);
    return behaviourManager.run(item, board, timeOfDay);
  },
  Tracker: (tracker: IGameCell, board: Array<IGameCell>, timeOfDay: number) => {
    if (tracker.item.activeAction === Action.Track) {
      const behaviourManager: BehaviourManager = new BehaviourManager([
        destroyAtMoraleBehaviour,
        ageBehaviour,
        fatiguedBehaviour,
        revealAnimalBehaviour,
        trackSleepingPredatorBehaviour,
        followTrackBehaviour,
        fleeBehaviour,
      ]);
      return behaviourManager.run(tracker, board, timeOfDay);
    }

    if (tracker.item.activeAction === Action.LookOut) {
      const behaviourManager: BehaviourManager = new BehaviourManager([
        ageBehaviour,
        fleeBehaviour,
        destroyAtMoraleBehaviour,
      ]);
      return behaviourManager.run(tracker, board, timeOfDay);
    }

    if (tracker.item.activeAction === Action.HeadHome) {
      const behaviourManager: BehaviourManager = new BehaviourManager([
        fleeBehaviour,
        ageBehaviour,
        headHomeBehaviour,
      ]);
      return behaviourManager.run(tracker, board, timeOfDay);
    }
  },
  Truck: (item: IGameCell, board: Array<IGameCell>) => {
    return board;
  },
};
