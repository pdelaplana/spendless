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

  // tslint:disable-next-line: variable-name
  private _totalAvailableToSpendAmount = 1000;

  gaugeType = 'arch';
  gaugeLabel = 'of $3824';
  gaugePrependText = '';

  @ViewChild('picker', {static: true}) picker;

  @Input() set totalAvailableToSpendAmount(value: number) {
    this._totalAvailableToSpendAmount = value;
    this.gaugeLabel = `of ${this.currencyPipe.transform(this._totalAvailableToSpendAmount)}`;
  }
  get totalAvailableToSpendAmount() {
    return this._totalAvailableToSpendAmount;
  }

  @Input() spendingPeriod = new Date();
  @Input() totalSpendAmount = 0;
  @Input() totalNeedsAmount = 0;
  @Input() totalWantsAmount = 0;
  @Input() totalCultureAmount = 0;
  @Input() totalUnexpectedAmount = 0;

  constructor(private currencyPipe: CurrencyPipe) { }

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
