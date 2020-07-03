import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AmountPageRoutingModule } from './amount-routing.module';

import { AmountPage } from './amount.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AmountPageRoutingModule
  ],
  declarations: [AmountPage]
})
export class AmountPageModule {}
