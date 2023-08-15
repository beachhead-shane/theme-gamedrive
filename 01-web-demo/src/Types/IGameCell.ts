import { Item, ItemType } from "./Items/Item";
import { TileType } from "./TileType";

export interface IGameCell {
  x: number;
  y: number;
  tileType: TileType;
  item: Item;
}

export const getIconFromCell = (cell: IGameCell) => {
  switch (cell.item.itemType) {
    case ItemType.Lion:
      return "lion.png";
    case ItemType.Kudu:
      return "kudu.png";
    case ItemType.Lodge:
      return "lodge.png";
    case ItemType.Tracker:
      return "tracker.png";
    case ItemType.AnimalTrack:
      return "track.png";
  }
  return "";
};
