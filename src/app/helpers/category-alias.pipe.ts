import { SPEND_CATEGORIES } from './../shared/constants';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryAlias'
})
export class CategoryAliasPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    switch (value) {
      case SPEND_CATEGORIES.NEEDS.code:
        return SPEND_CATEGORIES.NEEDS.label;
      case SPEND_CATEGORIES.UNEXPECTED.code:
        return SPEND_CATEGORIES.UNEXPECTED.label;
      case SPEND_CATEGORIES.WANTS.code:
        return SPEND_CATEGORIES.WANTS.label;
      case SPEND_CATEGORIES.CULTURE.code:
        return SPEND_CATEGORIES.CULTURE.label;
      default:
        return 'Unknown';
    }
  }

}
