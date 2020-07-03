import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChargeMoneyPage } from './charge-money.page';

const routes: Routes = [
  {
    path: '',
    component: ChargeMoneyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChargeMoneyPageRoutingModule {}
