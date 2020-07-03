import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormNamePageRoutingModule } from './form-name-routing.module';

import { FormNamePage } from './form-name.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FormNamePageRoutingModule
  ],
  declarations: [FormNamePage]
})
export class FormNamePageModule {}
