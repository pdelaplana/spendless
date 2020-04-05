import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, Input, ViewChild } from '@angular/core';


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

  @Input() set totalAvailableToSpendAmount(value: number) {
    this._totalAvailableToSpendAmount = value;
    this.gaugeLabel = `of ${this.currencyPipe.transform(this._totalAvailableToSpendAmount)}`;
  }
  get totalAvailableToSpendAmount() {
    return this._totalAvailableToSpendAmount;
  }

  @ViewChild('picker', {static: true}) picker;

  @Input() spendingPeriod = new Date();
  @Input() totalSpendAmount = 0;
  @Input() totalNeedsAmount = 0;
  @Input() totalWantsAmount = 0;
  @Input() totalCultureAmount = 0;
  @Input() totalUnexpectedAmount = 0;

  constructor(private currencyPipe: CurrencyPipe) { }

  ngOnInit() {
  }

  openPicker() {
    this.picker.open();
  }

}
