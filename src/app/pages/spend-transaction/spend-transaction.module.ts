import { SharedComponentsModule } from './../../components/shared-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpendTransactionPageRoutingModule } from './spend-transaction-routing.module';

import { SpendTransactionPage } from './spend-transaction.page';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    SharedComponentsModule,
    SpendTransactionPageRoutingModule
  ],
  declarations: [
    SpendTransactionPage
  ],
})
export class SpendTransactionPageModule {}
