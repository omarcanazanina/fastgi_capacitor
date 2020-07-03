import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormMailPage } from './form-mail.page';

const routes: Routes = [
  {
    path: '',
    component: FormMailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormMailPageRoutingModule {}
