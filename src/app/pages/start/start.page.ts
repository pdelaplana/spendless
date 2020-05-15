import { RefreshAuthTokenService } from './../../services/refresh-auth-token.service';
import { AuthenticationService } from '@app/services/auth/authentication.service';
import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {

  constructor(
    private menuController: MenuController,
    private navController: NavController,
    private authenticationService: AuthenticationService,
    private refreshAuthTokenService: RefreshAuthTokenService
  ) { }

  ngOnInit() {
    this.menuController.enable(false);
    if (this.authenticationService.isAuthenticated) {
      this.navController.navigateRoot('/spending');
      this.menuController.enable(true);
    }
  }

  goToLogin() {
    this.navController.navigateForward('/login');
  }

  goToSignup() {
    this.navController.navigateForward('/signup');
  }

}
