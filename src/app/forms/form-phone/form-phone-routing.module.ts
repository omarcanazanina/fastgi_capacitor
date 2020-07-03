import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormPhonePage } from './form-phone.page';

const routes: Routes = [
  {
    path: '',
    component: FormPhonePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormPhonePageRoutingModule {}
