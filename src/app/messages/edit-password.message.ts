import { BaseMessage } from './base.message';

export interface IEditPasswordMessage {
  password: string;
}
export class EditPasswordMessage extends BaseMessage<IEditPasswordMessage> {
}
