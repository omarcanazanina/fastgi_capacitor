import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RemoveMoneyPageRoutingModule } from './remove-money-routing.module';

import { RemoveMoneyPage } from './remove-money.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RemoveMoneyPageRoutingModule
  ],
  declarations: [RemoveMoneyPage]
})
export class RemoveMoneyPageModule {}
