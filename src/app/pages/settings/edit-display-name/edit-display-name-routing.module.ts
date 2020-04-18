import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditDisplayNamePage } from './edit-display-name.page';

const routes: Routes = [
  {
    path: '',
    component: EditDisplayNamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditDisplayNamePageRoutingModule {}
