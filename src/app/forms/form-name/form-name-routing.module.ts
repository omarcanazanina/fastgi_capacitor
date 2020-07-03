import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormNamePage } from './form-name.page';

const routes: Routes = [
  {
    path: '',
    component: FormNamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormNamePageRoutingModule {}
