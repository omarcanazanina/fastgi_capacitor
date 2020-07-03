import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleContactPageRoutingModule } from './single-contact-routing.module';

import { SingleContactPage } from './single-contact.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingleContactPageRoutingModule
  ],
  declarations: [SingleContactPage]
})
export class SingleContactPageModule {}
