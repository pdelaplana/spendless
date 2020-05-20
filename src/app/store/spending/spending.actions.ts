import { Spending } from './../../models/spending';
import { createAction, props } from '@ngrx/store';


export const SpendingActions = {

  loadSpendingByMonth: createAction(
    '[Spending] Load spending by month from server',
    props<{ month: string, year: string}>()
  ),
  
  loadSpendingByMonthSuccess: createAction(
    '[Spending] Load spending by month from server success',
    props<{ spending: Spending[] }>()
  ),
  
  loadSpendingByMonthFailed: createAction(
    '[Spending] Load spending by month from server failed',
    props<{error: any}>()
  ),
  
  addSpending: createAction(
    '[Spending] Add spending',
    props<{ spending: Spending}>()
  ),

  addSpendingSuccess: createAction(
    '[Spending] Add spending success',
    props<{ spending: Spending}>()
  ),

  addSpendingSuccessOutOfBounds: createAction(
    '[Spending] Add spending success out of bounds'
  ),

  addSpendingFailed: createAction(
    '[Spending] Add spending failed',
    props<{error: any}>()
  ),

  updateSpending: createAction(
    '[Spending] Update spending',
    props<{ spending: Spending}>()
  ),

  updateSpendingSuccess: createAction(
    '[Spending] Update spending success',
    props<{ spending: Spending}>()
  ),

  updateSpendingSuccessOutOfBounds: createAction(
    '[Spending] Update spending success out of bounds'
  ),

  updateSpendingFailed: createAction(
    '[Spending] Update spending failed',
    props<{ error: any }>()
  ),

  deleteSpending: createAction(
    '[Spending] Delete spending',
    props<{ id: string }>()
  ),

  deleteSpendingSuccess: createAction(
    '[Spending] Delete spending success',
    props<{ id: string }>()
  ),

  deleteSpendingFailed: createAction(
    '[Spending] Delete spending failed',
    props<{ error: any }>()
  ),

  

}

