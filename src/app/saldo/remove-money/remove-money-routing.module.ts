import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RemoveMoneyPage } from './remove-money.page';

const routes: Routes = [
  {
    path: '',
    component: RemoveMoneyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RemoveMoneyPageRoutingModule {}
