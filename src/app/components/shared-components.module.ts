import { IonicModule } from '@ionic/angular';
import { CurrencyInputComponent } from './currency-input/currency-input.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    CurrencyInputComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    CurrencyInputComponent
  ]
})
export class SharedComponentsModule { }
