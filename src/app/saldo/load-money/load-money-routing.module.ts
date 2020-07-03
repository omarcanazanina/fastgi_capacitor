import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoadMoneyPage } from './load-money.page';

const routes: Routes = [
  {
    path: '',
    component: LoadMoneyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoadMoneyPageRoutingModule {}
