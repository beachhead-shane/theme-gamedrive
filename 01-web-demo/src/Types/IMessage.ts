import { Character } from "./Characters/ICharacter";
import { IMessageAction } from "./Items/Item";

export interface IMessage {
  character: Character;
  from: string;
  message: string;
  isSelected: boolean;
  isRead: boolean;
  action: Array<IMessageAction>;
}
