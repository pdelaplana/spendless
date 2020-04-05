import { BaseMessage } from './base.message';

export interface IUpdatedSpendingLimitMessage {
  spendingLimit: number;
}
export class UpdatedSpendingLimitMessage extends BaseMessage<IUpdatedSpendingLimitMessage> {}
