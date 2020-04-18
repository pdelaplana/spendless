import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditDisplayNamePageRoutingModule } from './edit-display-name-routing.module';

import { EditDisplayNamePage } from './edit-display-name.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    EditDisplayNamePageRoutingModule
  ],
  declarations: [EditDisplayNamePage]
})
export class EditDisplayNamePageModule {}
