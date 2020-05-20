import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsPage } from './settings.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage
  },
  {
    path: 'edit-email',
    loadChildren: () => import('./edit-email/edit-email.module').then( m => m.EditEmailPageModule)
  },
  {
    path: 'edit-password',
    loadChildren: () => import('./edit-password/edit-password.module').then( m => m.EditPasswordPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsPageRoutingModule {}
