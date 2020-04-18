import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedComponentsModule } from '@app/components/shared-components.module';

import { EditSpendingLimitPageRoutingModule } from './edit-spending-limit-routing.module';
import { EditSpendingLimitPage } from './edit-spending-limit.page';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    SharedComponentsModule,
    EditSpendingLimitPageRoutingModule
  ],
  declarations: [
    EditSpendingLimitPage
  ]
})
export class EditSpendingLimitPageModule {}
