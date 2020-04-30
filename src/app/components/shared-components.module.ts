import { CategoryAliasPipe } from '@app/helpers/category-alias.pipe';
import { SpendingCategoryAvatarComponent } from './spending-category-avatar/spending-category-avatar.component';
import { IconAvatarComponent } from './icon-avatar/icon-avatar.component';
import { TextAvatarComponent } from './text-avatar/text-avatar.component';
import { IonicModule } from '@ionic/angular';
import { CurrencyInputComponent } from './currency-input/currency-input.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    CategoryAliasPipe,
    CurrencyInputComponent,
    TextAvatarComponent,
    IconAvatarComponent,
    SpendingCategoryAvatarComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    CategoryAliasPipe,
    CurrencyInputComponent,
    TextAvatarComponent,
    IconAvatarComponent,
    SpendingCategoryAvatarComponent
  ]
})
export class SharedComponentsModule { }
