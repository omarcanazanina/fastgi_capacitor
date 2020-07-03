import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormAddPinPageRoutingModule } from './form-add-pin-routing.module';

import { FormAddPinPage } from './form-add-pin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FormAddPinPageRoutingModule
  ],
  declarations: [FormAddPinPage]
})
export class FormAddPinPageModule {}
