import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditEmailPageRoutingModule } from './edit-email-routing.module';

import { EditEmailPage } from './edit-email.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditEmailPageRoutingModule
  ],
  declarations: [EditEmailPage]
})
export class EditEmailPageModule {}
