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
    private navController: NavController
  ) { }

  ngOnInit() {
    this.menuController.enable(false);
  }

  goToLogin() {
    this.navController.navigateForward('/login');
  }

  goToSignup() {
    this.navController.navigateForward('/signup')
  }

}
