import { Account } from '@app/models/account';

export interface AccountState {
    loading: boolean;
    data: Account;
    error: any;
}