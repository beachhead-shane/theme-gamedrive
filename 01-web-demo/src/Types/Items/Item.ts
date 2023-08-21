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
  features: Array<Feature>;
}
export enum MessageAction {
  EnableMap,
  EnableRelationships,
  Dismiss,
  DonateMoney,
}

export interface IAction {
  friendlyName: string;
  action: Action;
  features: Array<Feature>;
  actionCost: number;
}
interface IStats {
  fatigue?: number;
  morale?: number;
}
export interface Item {
  uid: string;
  itemType: ItemType;
  class: Class;
  order: Order;
  sleepingMode: SleepingMode;
  age: number;
  actions?: Array<IAction>;
  activeAction?: Action;
  stats: IStats;
  features: Array<Feature>;
}

export enum Feature {
  Highlight = "Highlight",
  Visible = "Visible",
}

export const HasFeature = (item: Item, feature: Feature) => {
  return item.features.includes(feature);
};
interface IDefaultItems {
  [key: string]: Item;
}
export const defaultItems: () => IDefaultItems = () => {
  return {
    None: {
      uid: crypto.randomUUID(),
      itemType: ItemType.None,
      sleepingMode: SleepingMode.None,
      class: Class.None,
      order: Order.None,
      age: 0,
      stats: {},
      features: [Feature.Visible],
    },
    Lion: {
      uid: crypto.randomUUID(),
      itemType: ItemType.Lion,
      sleepingMode: SleepingMode.Nocturnal,
      class: Class.Animal,
      order: Order.Predator,
      age: 0,
      stats: {
        fatigue: 0,
      },
      features: [],
    },
    Kudu: {
      uid: crypto.randomUUID(),
      itemType: ItemType.Kudu,
      sleepingMode: SleepingMode.Diurnal,
      class: Class.Animal,
      order: Order.Prey,
      age: 0,
      stats: {
        fatigue: 0,
      },
      features: [Feature.Visible],
    },
    Lodge: {
      uid: crypto.randomUUID(),
      itemType: ItemType.Lodge,
      sleepingMode: SleepingMode.None,
      class: Class.Object,
      order: Order.None,
      age: 0,
      stats: {},
      actions: [
        {
          friendlyName: "Deploy Tracker",
          action: Action.DeployTrackerFromLodge,
          features: [Feature.Highlight],
          actionCost: 60,
        },
      ],
      features: [Feature.Visible],
    },
    Tracker: {
      uid: crypto.randomUUID(),
      itemType: ItemType.Tracker,
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
          features: [],
          actionCost: 0,
        },
        {
          friendlyName: "Head Home",
          action: Action.HeadHome,
          features: [],
          actionCost: 0,
        },
        {
          friendlyName: "Track Animals",
          action: Action.Track,
          features: [Feature.Highlight],
          actionCost: 0,
        },
      ],
      features: [Feature.Visible],
    },
    Truck: {
      uid: crypto.randomUUID(),
      itemType: ItemType.Truck,
      sleepingMode: SleepingMode.None,
      class: Class.Object,
      order: Order.None,
      age: 0,
      stats: {},
      features: [Feature.Visible],
    },
    AnimalTrack: {
      uid: crypto.randomUUID(),
      itemType: ItemType.AnimalTrack,
      sleepingMode: SleepingMode.None,
      class: Class.Object,
      order: Order.None,
      age: 0,
      stats: {},
      features: [Feature.Visible],
    },
  };
};
