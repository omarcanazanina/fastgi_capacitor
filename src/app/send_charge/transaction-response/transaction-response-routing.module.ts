import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionResponsePage } from './transaction-response.page';

const routes: Routes = [
  {
    path: '',
    component: TransactionResponsePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionResponsePageRoutingModule {}
