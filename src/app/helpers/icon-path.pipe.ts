import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iconPath'
})
export class IconPathPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    switch (value) {
      case 'N':
        return 'assets/images/Bill.svg';
      case 'U':
        return 'assets/images/Bill.svg';
      case 'W':
        return 'assets/images/Bill.svg';
      case 'C':
        return 'assets/images/Bill.svg';
      default:
        return 'assets/images/Bill.svg';
    }
  }

}
