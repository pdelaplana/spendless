import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditEmailPage } from './edit-email.page';

const routes: Routes = [
  {
    path: '',
    component: EditEmailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditEmailPageRoutingModule {}
