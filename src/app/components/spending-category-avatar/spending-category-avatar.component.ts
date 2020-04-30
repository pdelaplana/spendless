import { Component, OnInit, Input } from '@angular/core';
import { SPEND_CATEGORIES } from '@app/shared/constants';

@Component({
  selector: 'app-spending-category-avatar',
  templateUrl: './spending-category-avatar.component.html',
  styleUrls: ['./spending-category-avatar.component.scss'],
})
export class SpendingCategoryAvatarComponent implements OnInit {
  @Input() category: string;

  get iconName() {
    switch (this.category) {
      case SPEND_CATEGORIES.NEEDS.code:
        return SPEND_CATEGORIES.NEEDS.icon;
      case SPEND_CATEGORIES.UNEXPECTED.code:
        return SPEND_CATEGORIES.UNEXPECTED.icon;
      case SPEND_CATEGORIES.WANTS.code:
        return SPEND_CATEGORIES.WANTS.icon;
      case SPEND_CATEGORIES.CULTURE.code:
        return SPEND_CATEGORIES.CULTURE.icon;
      default:
        return SPEND_CATEGORIES.NEEDS.icon;
    }
  }

  constructor() { }

  ngOnInit() {}

}
