import { TextAvatarComponent } from '../../components/text-avatar/text-avatar.component';
import { SharedComponentsModule } from './../../components/shared-components.module';
import { SpendingGaugeComponent } from '../../components/spending-gauge/spending-gauge.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpendingListPageRoutingModule } from './spending-list-routing.module';
import { SpendTransactionPageModule } from '../../pages/spend-transaction/spend-transaction.module';

import { SpendingListPage } from './spending-list.page';
import { NgxGaugeModule } from 'ngx-gauge';
import { IconPathPipe } from '@app/helpers/icon-path.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedComponentsModule,
    NgxGaugeModule,
    SpendingListPageRoutingModule,
    SpendTransactionPageModule
  ],
  declarations: [
    IconPathPipe,
    SpendingGaugeComponent,
    SpendingListPage
  ]
})
export class SpendingListPageModule {}
