import { NavController } from '@ionic/angular';
import { AuthenticationService } from './../../services/authentication.service';
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

  version: 'Alpha';
  name: string;
  email: string;

  constructor(
    private authenticationService: AuthenticationService,
    private navController: NavController) { }

  ngOnInit() {
    const path = window.location.pathname.split('spending-list/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
    this.authenticationService.accountChanges.subscribe(account => {
      this.name = account.name;
      this.email = account.email;
    });
  }

  isAuthenticated(): boolean{
    return this.authenticationService.isAuthenticated;
  }

  logout() {
    this.authenticationService.logout();
    this.navController.navigateRoot('login');
  }

}
