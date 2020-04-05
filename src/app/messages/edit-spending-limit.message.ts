import { BaseMessage } from './base.message';

export interface IEditSpendingLimitMessage {
  spendingLimit: number;
}
export class EditSpendingLimitMessage extends BaseMessage<IEditSpendingLimitMessage> {
}
