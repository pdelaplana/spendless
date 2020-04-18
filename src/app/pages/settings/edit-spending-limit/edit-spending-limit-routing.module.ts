import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditSpendingLimitPage } from './edit-spending-limit.page';

const routes: Routes = [
  {
    path: '',
    component: EditSpendingLimitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditSpendingLimitPageRoutingModule {}
