import { BaseMessage } from './base.message';

export interface IUpdatedDisplayNameMessage {
  displayName: string;
}
export class UpdatedDisplayNameMessage extends BaseMessage<IUpdatedDisplayNameMessage> {}
