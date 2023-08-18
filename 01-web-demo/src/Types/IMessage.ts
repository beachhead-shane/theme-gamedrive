import { IMessageAction } from "./Items/Item";

export interface IMessage {
  from: string;
  message: string;
  isSelected: boolean;
  isRead: boolean;
  highlight: boolean;
  action: Array<IMessageAction>;
}
