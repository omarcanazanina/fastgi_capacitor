import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionResponsePageRoutingModule } from './transaction-response-routing.module';

import { TransactionResponsePage } from './transaction-response.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionResponsePageRoutingModule
  ],
  declarations: [TransactionResponsePage]
})
export class TransactionResponsePageModule {}
