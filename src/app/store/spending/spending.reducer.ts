
import { Action, createReducer, on } from '@ngrx/store';

import { SpendingState } from './spending.state';
import { SpendingActions } from './spending.actions';


export const initialState: SpendingState = {
  loading: false,
  month: '',
  year: '',
  data: [],
  error: null
};


const accountReducer = createReducer(
  initialState,
  on(SpendingActions.loadSpendingByMonth, (state, {month, year}) => ({...state, month, year, loading: true})),
  on(SpendingActions.loadSpendingByMonthSuccess, (state, {spending}) => ({...state, loading: false, data: spending  })),
  on(SpendingActions.loadSpendingByMonthFailed, (state, {error}) => ({...state, loading: false, error })),
  on(SpendingActions.addSpending, (state) => ({...state,loading: true})),
  on(SpendingActions.addSpendingSuccess, (state, {spending}) =>  ({...state, loading: false, data: [ ...state.data, spending ]  })),
  on(SpendingActions.addSpendingFailed, (state, {error}) => ({...state, error, loading: false })),
  on(SpendingActions.updateSpendingSuccess, (state, {spending}) =>  ({
    ...state, 
    loading: false,
    data: [ ...state.data.filter(s => s.id != spending.id), spending ]
  })),
  on(SpendingActions.updateSpendingFailed, (state, {error}) => ({...state, error, loading: false,})),
  on(SpendingActions.deleteSpendingSuccess, (state, {id}) =>  ({
    ...state, 
    loading: false,
    data: [ ...state.data.filter(s => s.id != id) ]
  })),
  on(SpendingActions.deleteSpendingFailed, (state, {error}) => ({...state, loading: false, error })),
  

);

export function reducer(state: SpendingState | undefined, action: Action) {
  return accountReducer(state, action);
}


