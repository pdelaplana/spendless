import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpendTransactionPage } from './spend-transaction.page';

const routes: Routes = [
  {
    path: '',
    component: SpendTransactionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpendTransactionPageRoutingModule {}
