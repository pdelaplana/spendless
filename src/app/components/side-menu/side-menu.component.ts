import { AppState } from './../../reducers/index';
import { Store } from '@ngrx/store';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../../services/auth/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  contentId = '';
  selectedIndex = 0;
  appPages = [
    {
      title: 'Spending',
      url: '/spending',
      icon: 'cash'
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: 'cog'
    },
    {
      title: 'Help',
      url: '/folder/Inbox',
      icon: 'help'
    },
  ];

  version = 'Alpha';
  name: string;
  email: string;

  constructor(
    private store: Store<AppState>,
    private authenticationService: AuthenticationService,
    private navController: NavController) {    }

  ngOnInit() {
    const path = window.location.pathname.split('spending-list/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
    this.store.select('accountState').subscribe(state => {
      this.name = state.data.name;
      this.email = state.data.email;
    });
  }

  isAuthenticated(): boolean {
    return this.authenticationService.isAuthenticated;
  }

  logout() {
    this.authenticationService.clear();
    this.navController.navigateRoot('login');
  }

}
