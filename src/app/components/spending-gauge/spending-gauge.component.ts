import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import * as moment from 'moment';


@Component({
  selector: 'app-spending-gauge',
  templateUrl: './spending-gauge.component.html',
  styleUrls: ['./spending-gauge.component.scss'],
  providers: [CurrencyPipe]
})
export class SpendingGaugeComponent implements OnInit {

  gaugeType = 'arch';
  gaugeLabel = 'of $3824';
  gaugePrependText = '';
  gaugeMaxValue = 1;
  gaugeValue = 1;

  @ViewChild('picker', {static: true}) picker;

  @Input() set totalAvailableToSpendAmount(value: number) {
    this.gaugeMaxValue = value;
    this.gaugeLabel = `of ${this.currencyPipe.transform(this.gaugeMaxValue)}`;
  }
  get totalAvailableToSpendAmount() {
    return this.gaugeMaxValue;
  }
  @Input() set totalSpendAmount(value: number){
    this.gaugeValue = value;
  }
  get totalSpendAmount() {
    return this.gaugeValue;
  }


  @Input() spendingPeriod = new Date();
  @Input() totalNeedsAmount = 0;
  @Input() totalWantsAmount = 0;
  @Input() totalCultureAmount = 0;
  @Input() totalUnexpectedAmount = 0;
  @Input() enabled = true;

  constructor(private currencyPipe: CurrencyPipe) { 
    this.gaugeMaxValue = 1;
    this.gaugeValue = 1;
  }

  ngOnInit() {
  
  }

  get daysLeft() {
    const daysDiff = moment(this.spendingPeriod).endOf('month').diff(moment(), 'days');
    if (daysDiff > 0) {
      return `${daysDiff} days left`;
    } else {
      return '';
    }
  }

  openPicker() {
    this.picker.open();
  }

}
