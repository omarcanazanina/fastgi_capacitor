import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormMailPageRoutingModule } from './form-mail-routing.module';

import { FormMailPage } from './form-mail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FormMailPageRoutingModule
  ],
  declarations: [FormMailPage]
})
export class FormMailPageModule {}
