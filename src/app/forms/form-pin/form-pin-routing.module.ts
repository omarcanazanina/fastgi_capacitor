import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormPinPage } from './form-pin.page';

const routes: Routes = [
  {
    path: '',
    component: FormPinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormPinPageRoutingModule {}
