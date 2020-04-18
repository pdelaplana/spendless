import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ColorGenerator } from '../text-avatar/color-generator';

@Component({
  selector: 'app-icon-avatar',
  templateUrl: './icon-avatar.component.html',
  styleUrls: ['./icon-avatar.component.scss'],
})
export class IconAvatarComponent implements OnInit, OnChanges {
  @Input() iconName: string;
  @Input() color: string;
  @Input() iconColor: string;

  public styles = {
    backgroundColor: '#fff',
    color: '#000'
  };

  constructor(private colorGenerator: ColorGenerator) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {

    const iconName = changes.iconName ? changes.iconName.currentValue : null;
    const color = changes.color ? changes.color.currentValue : null;
    const iconColor = changes.iconColor ? changes.iconColor.currentValue : this.styles.color;

    this.styles = {...this.styles, backgroundColor: this.backgroundColorHexString(color, iconName), color: iconColor };
  }


  private backgroundColorHexString(color: string, text: string): string {
    return color || this.colorGenerator.getColor(text);
  }
}
