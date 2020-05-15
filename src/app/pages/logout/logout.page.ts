import { Store } from '@ngrx/store';
import { NavController, MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AppState } from '@app/reducers';
import * as fromAuthActions from '@app/store/auth/auth.actions';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(
    private navController: NavController,
    private store: Store<AppState>,
    private menuController: MenuController) { }

  ngOnInit() {
    this.store.dispatch(fromAuthActions.logout());
    this.menuController.enable(false);
  }

  goToLogin() {
    this.navController.navigateRoot('login');
  }

}
