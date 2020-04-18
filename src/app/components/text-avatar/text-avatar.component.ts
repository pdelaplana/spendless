import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ColorGenerator } from './color-generator';

@Component({
  selector: 'app-text-avatar',
  templateUrl: './text-avatar.component.html',
  styleUrls: ['./text-avatar.component.scss'],
})
export class TextAvatarComponent implements OnInit, OnChanges {
  @Input() text: string;
  @Input() color: string;
  @Input() textColor: string;

  public firstLetter = '';
  public styles = {
    backgroundColor: '#fff',
    color: '#000'
  };

  constructor(private colorGenerator: ColorGenerator) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes', changes);
    const  text = changes.text ? changes.text.currentValue : null;
    const  color = changes.color ? changes.color.currentValue : null;
    const textColor = changes.textColor ? changes.textColor.currentValue : this.styles.color;

    this.firstLetter = this.extractFirstCharacter(text);

    this.styles = {...this.styles, backgroundColor: this.backgroundColorHexString(color, text), color: textColor}
  }

  private extractFirstCharacter(text: string): string {
    return text.charAt(0) || '';
  }

  private backgroundColorHexString(color: string, text: string): string {
    return color || this.colorGenerator.getColor(text);
  }
}
