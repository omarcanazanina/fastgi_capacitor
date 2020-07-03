import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormPinPageRoutingModule } from './form-pin-routing.module';

import { FormPinPage } from './form-pin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FormPinPageRoutingModule
  ],
  declarations: [FormPinPage]
})
export class FormPinPageModule {}
