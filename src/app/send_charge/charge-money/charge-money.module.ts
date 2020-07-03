import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChargeMoneyPageRoutingModule } from './charge-money-routing.module';

import { ChargeMoneyPage } from './charge-money.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChargeMoneyPageRoutingModule
  ],
  declarations: [ChargeMoneyPage]
})
export class ChargeMoneyPageModule {}
