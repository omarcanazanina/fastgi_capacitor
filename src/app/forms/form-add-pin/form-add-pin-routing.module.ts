import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormAddPinPage } from './form-add-pin.page';

const routes: Routes = [
  {
    path: '',
    component: FormAddPinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormAddPinPageRoutingModule {}
