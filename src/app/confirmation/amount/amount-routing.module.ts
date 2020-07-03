import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AmountPage } from './amount.page';

const routes: Routes = [
  {
    path: '',
    component: AmountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmountPageRoutingModule {}
