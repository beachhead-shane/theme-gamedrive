import { IMessageAction } from "./Items/Item";

export interface IMessage {
  from: string;
  message: string;
  action: Array<IMessageAction>;
}
