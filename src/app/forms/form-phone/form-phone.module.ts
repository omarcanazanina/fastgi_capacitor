import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormPhonePageRoutingModule } from './form-phone-routing.module';

import { FormPhonePage } from './form-phone.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FormPhonePageRoutingModule
  ],
  declarations: [FormPhonePage]
})
export class FormPhonePageModule {}
