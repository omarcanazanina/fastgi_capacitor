import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoadMoneyPageRoutingModule } from './load-money-routing.module';

import { LoadMoneyPage } from './load-money.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadMoneyPageRoutingModule
  ],
  declarations: [LoadMoneyPage]
})
export class LoadMoneyPageModule {}
