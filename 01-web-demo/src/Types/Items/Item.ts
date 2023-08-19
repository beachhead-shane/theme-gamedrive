export enum ItemType {
  None = "None",
  Lion = "Lion",
  Kudu = "Kudu",
  Lodge = "Lodge",
  Tracker = "Tracker",
  Truck = "Truck",
  AnimalTrack = "AnimalTrack",
}

export enum SleepingMode {
  None,
  Nocturnal,
  Diurnal,
}

export enum Order {
  None,
  Predator,
  Prey,
}

export enum Class {
  None,
  Animal,
  Human,
  Object,
}
export enum Action {
  None,
  LookOut,
  HeadHome,
  Track,
  DeployTrackerFromLodge,
}

export interface IMessageAction {
  friendlyName: string;
  action: MessageAction;
}
export enum MessageAction {
  EnableMap,
  EnableRelationships,
  Dismiss,
}

export interface IAction {
  friendlyName: string;
  momentary?: boolean; //if true it doesn't toggle on
  action: Action;
}
interface IStats {
  fatigue?: number;
  morale?: number;
}
export interface Item {
  uid: string;
  itemType: ItemType;
  isVisible: boolean;
  isHighlighted: boolean;
  class: Class;
  order: Order;
  sleepingMode: SleepingMode;
  age: number;
  actions?: Array<IAction>;
  activeAction?: Action;
  stats: IStats;
}

interface IDefaultItems {
  [key: string]: Item;
}
export const defaultItems: () => IDefaultItems = () => {
  return {
    None: {
      uid: crypto.randomUUID(),
      itemType: ItemType.None,
      isVisible: false,
      sleepingMode: SleepingMode.None,
      class: Class.None,
      order: Order.None,
      age: 0,
      stats: {},
    },
    Lion: {
      uid: crypto.randomUUID(),
      itemType: ItemType.Lion,
      isVisible: false,
      sleepingMode: SleepingMode.Nocturnal,
      class: Class.Animal,
      order: Order.Predator,
      age: 0,
      stats: {
        fatigue: 0,
      },
    },
    Kudu: {
      uid: crypto.randomUUID(),
      itemType: ItemType.Kudu,
      isVisible: true,
      sleepingMode: SleepingMode.Diurnal,
      class: Class.Animal,
      order: Order.Prey,
      age: 0,
      stats: {
        fatigue: 0,
      },
    },
    Lodge: {
      uid: crypto.randomUUID(),
      itemType: ItemType.Lodge,
      isVisible: true,
      sleepingMode: SleepingMode.None,
      class: Class.Object,
      order: Order.None,
      age: 0,
      stats: {},
      actions: [
        {
          friendlyName: "Deploy Tracker",
          momentary: true,
          action: Action.DeployTrackerFromLodge,
        },
      ],
    },
    Tracker: {
      uid: crypto.randomUUID(),
      itemType: ItemType.Tracker,
      isVisible: true,
      sleepingMode: SleepingMode.Diurnal,
      class: Class.Human,
      order: Order.Prey,
      age: 0,
      activeAction: Action.LookOut,
      stats: {
        fatigue: 0,
        morale: 5,
      },

      actions: [
        {
          friendlyName: "Keep Look Out",
          action: Action.LookOut,
        },
        {
          friendlyName: "Head Home",
          action: Action.HeadHome,
        },
        {
          friendlyName: "Track Animals",
          action: Action.Track,
        },
      ],
    },
    Truck: {
      uid: crypto.randomUUID(),
      itemType: ItemType.Truck,
      isVisible: true,
      sleepingMode: SleepingMode.None,
      class: Class.Object,
      order: Order.None,
      age: 0,
      stats: {},
    },
    AnimalTrack: {
      uid: crypto.randomUUID(),
      itemType: ItemType.AnimalTrack,
      isVisible: true,
      sleepingMode: SleepingMode.None,
      class: Class.Object,
      order: Order.None,
      age: 0,
      stats: {},
    },
  };
};
