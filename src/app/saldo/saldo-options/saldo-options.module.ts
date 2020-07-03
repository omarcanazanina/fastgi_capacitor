import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SaldoOptionsPageRoutingModule } from './saldo-options-routing.module';

import { SaldoOptionsPage } from './saldo-options.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SaldoOptionsPageRoutingModule
  ],
  declarations: [SaldoOptionsPage]
})
export class SaldoOptionsPageModule {}
