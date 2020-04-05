import { NavController } from '@ionic/angular';
import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HandleAuthErrorService {

  constructor(private authenticationService: AuthenticationService,
              private navController: NavController) { }

  handleError(error: any): any {
    localStorage.removeItem('authUserInfo');
    this.navController.navigateRoot('login');
  }
}
