import { BaseMessage } from './base.message';

export interface IUpdatedEmailMessage {
  email: string;
}
export class UpdatedEmailMessage extends BaseMessage<IUpdatedEmailMessage> {}