import { BaseMessage } from './base.message';

export interface IEditEmailMessage {
  email: string;
}
export class EditEmailMessage extends BaseMessage<IEditEmailMessage> {
}
