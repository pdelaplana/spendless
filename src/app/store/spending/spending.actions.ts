import { Spending } from './../../models/spending';
import { createAction, props } from '@ngrx/store';

export const loadSpendingByMonth = createAction(
  '[Spending] Load spending by month from server',
  props<{ month: string, year: string}>()
);

export const loadSpendingByMonthSuccess = createAction(
  '[Spending] Load spending by month from server success',
  props<{ spending: Spending[] }>()
);

export const loadSpendingByMonthFailed = createAction(
  '[Spending] Load spending by month from server failed',
  props<{error: any}>()
);

