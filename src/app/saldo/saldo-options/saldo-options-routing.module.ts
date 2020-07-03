import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SaldoOptionsPage } from './saldo-options.page';

const routes: Routes = [
  {
    path: '',
    component: SaldoOptionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaldoOptionsPageRoutingModule {}
