import { Spending } from '@app/models/spending';

export interface SpendingState {
    loading: boolean;
    month: string;
    year: string;
    data: Spending[];
    error: any;
  }
  