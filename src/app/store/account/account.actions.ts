import { Account } from '@app/models/account';
import { createAction, props } from '@ngrx/store';

export const AccountActions = {

  loadAccount: createAction(
    '[Account] Load account from server'
  ),
  
  loadAccountSuccess: createAction(
    '[Account] Load account success',
    props<{account: Account}>()
  ),
  
  loadAccountFailed: createAction(
    '[Account] Load account failed',
    props<{err: any}>()
  ),
  
  updateAccount: createAction(
    '[Account] Update account',
    props<{name: string, email: string, spendingLimit: number }>()
    // (name: string  = '', email: string = '', spendingLimit: number = null) => ({name, email, spendingLimit})
  ),
  
  updateAccountSuccess: createAction(
    '[Account] Update account success',
    props<{account: Account}>()
  ),
  
  updateAccountFailed: createAction(
    '[Account] Update account failed',
    props<{err: any}>()
  ),
  
  changeEmail: createAction(
    '[Account] Change email',
    props<{oldEmail: string, newEmail: string, password: string}>()
  ),
  
  changeEmailSuccess: createAction(
    '[Account] Change email success',
    props<{newEmail: string}>()
  ),
  
  changeEmailFailed: createAction(
    '[Account] Change email failed',
    props<{err: any}>()
  ),
  
  createAccount: createAction(
    '[Account] Create account',
    props<{account: Account}>()
  ),
  
  

}

