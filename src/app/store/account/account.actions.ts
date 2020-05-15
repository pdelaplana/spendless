
import { Account } from '@app/models/account';
import { createAction, props } from '@ngrx/store';


export const loadAccount = createAction(
  '[Account] Load account from server'
);

export const loadAccountSuccess = createAction(
  '[Account] Load account success',
  props<{account: Account}>()
);

export const loadAccountFailed = createAction(
  '[Account] Load account failed',
  props<{err: any}>()
);

export const updateAccount = createAction(
  '[Account] Update account',
  props<{name: string, email: string, spendingLimit: number }>()
  // (name: string  = '', email: string = '', spendingLimit: number = null) => ({name, email, spendingLimit})
);

export const updateAccountSuccess = createAction(
  '[Account] Update account success',
  props<{account: Account}>()
);

export const updateAccountFailed = createAction(
  '[Account] Update account failed',
  props<{err: any}>()
);

export const changeEmail = createAction(
  '[Account] Change email',
  props<{oldEmail: string, newEmail: string, password: string}>()
);

export const changeEmailSuccess = createAction(
  '[Account] Change email success',
  props<{newEmail: string}>()
);

export const changeEmailFailed = createAction(
  '[Account] Change email failed',
  props<{err: any}>()
);

export const createAccount = createAction(
  '[Account] Create account',
  props<{account: Account}>()
);

