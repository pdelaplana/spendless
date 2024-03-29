import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanActivate } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'start',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'spending',
    loadChildren: () => import('./pages/spending-list/spending-list.module').then( m => m.SpendingListPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'spend-transaction',
    loadChildren: () => import('./pages/spend-transaction/spend-transaction.module').then( m => m.SpendTransactionPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'settings/edit-display-name',
    loadChildren: () => import('./pages/settings/edit-display-name/edit-display-name.module').then( m => m.EditDisplayNamePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'settings/edit-spending-limit',
    loadChildren: () => import('./pages/settings/edit-spending-limit/edit-spending-limit.module').then( m => m.EditSpendingLimitPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'logout',
    loadChildren: () => import('./pages/logout/logout.module').then( m => m.LogoutPageModule)
  },
  {
    path: 'start',
    loadChildren: () => import('./pages/start/start.module').then( m => m.StartPageModule)
  },  {
    path: 'help',
    loadChildren: () => import('./pages/help/help.module').then( m => m.HelpPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
