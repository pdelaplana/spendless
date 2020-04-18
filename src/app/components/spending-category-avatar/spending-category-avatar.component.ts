import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-spending-category-avatar',
  templateUrl: './spending-category-avatar.component.html',
  styleUrls: ['./spending-category-avatar.component.scss'],
})
export class SpendingCategoryAvatarComponent implements OnInit {
  @Input() category: string;

  get iconName(){
    switch (this.category) {
      case 'N':
        return 'wallet-sharp';
      case 'U':
        return 'thunderstorm-sharp';
      case 'W':
        return 'gift-sharp';
      case 'C':
        return 'library-sharp';
      default:
        return 'wallet-sharp';
    }
  }

  constructor() { }

  ngOnInit() {}

}
