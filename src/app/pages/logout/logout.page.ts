import { NavController, MenuController } from '@ionic/angular';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(
    private navController: NavController,
    private menuController: MenuController,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.logout();
    this.menuController.enable(false);
  }

  goToLogin() {
    this.navController.navigateRoot('login');
  }

}
