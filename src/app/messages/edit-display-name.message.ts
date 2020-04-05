import { BaseMessage } from './base.message';

export interface IEditDisplayNameMessage {
  displayName: string;
}
export class EditDisplayNameMessage extends BaseMessage<IEditDisplayNameMessage> {
}
