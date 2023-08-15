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
  LookOut,
  HeadHome,
  Track,
}

export interface IAction {
  friendlyName: string;
  action: Action;
}
export interface Item {
  itemType: ItemType;
  isVisible: boolean;
  class: Class;
  order: Order;
  sleepingMode: SleepingMode;
  age: number;
  actions?: Array<IAction>;
  activeAction?: Action;
}

interface IDefaultItems {
  [key: string]: Item;
}
export const defaultItems: IDefaultItems = {
  None: {
    itemType: ItemType.None,
    isVisible: false,
    sleepingMode: SleepingMode.None,
    class: Class.None,
    order: Order.None,
    age: 0,
  },
  Lion: {
    itemType: ItemType.Lion,
    isVisible: false,
    sleepingMode: SleepingMode.Nocturnal,
    class: Class.Animal,
    order: Order.Predator,
    age: 0,
  },
  Kudu: {
    itemType: ItemType.Kudu,
    isVisible: true,
    sleepingMode: SleepingMode.Diurnal,
    class: Class.Animal,
    order: Order.Prey,
    age: 0,
  },
  Lodge: {
    itemType: ItemType.Lodge,
    isVisible: true,
    sleepingMode: SleepingMode.None,
    class: Class.Object,
    order: Order.None,
    age: 0,
  },
  Tracker: {
    itemType: ItemType.Tracker,
    isVisible: true,
    sleepingMode: SleepingMode.Diurnal,
    class: Class.Human,
    order: Order.Prey,
    age: 0,
    activeAction: Action.LookOut,
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
    itemType: ItemType.Truck,
    isVisible: true,
    sleepingMode: SleepingMode.None,
    class: Class.Object,
    order: Order.None,
    age: 0,
  },
  AnimalTrack: {
    itemType: ItemType.AnimalTrack,
    isVisible: true,
    sleepingMode: SleepingMode.None,
    class: Class.Object,
    order: Order.None,
    age: 0,
  },
};
