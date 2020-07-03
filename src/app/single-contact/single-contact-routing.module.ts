import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleContactPage } from './single-contact.page';

const routes: Routes = [
  {
    path: '',
    component: SingleContactPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleContactPageRoutingModule {}
