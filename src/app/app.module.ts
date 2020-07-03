import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';

import {firebaseConfig} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
//import { FCM } from '@ionic-native/fcm/ngx';
import { AngularFirestore } from '@angular/fire/firestore';
import { BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import { Contacts } from '@ionic-native/contacts/ngx';
import { HttpClientModule } from '@angular/common/http';
//import { NgxQRCodeModule } from 'ngx-qrcode2';
//import { FormsModule } from '@angular/forms';
//Plugins
//import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Brightness } from '@ionic-native/brightness/ngx';

//import { Camera } from '@ionic-native/camera/ngx';
import { AngularFireStorageModule} from '@angular/fire/storage'
//import { EmailComposer } from '@ionic-native/email-composer/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ComponentsModule,
  AngularFireModule.initializeApp(firebaseConfig),
  AngularFireAuthModule,
  HttpClientModule,

  AngularFireStorageModule,
 // NgxQRCodeModule,
 // FormsModule,
],
  providers: [
    StatusBar,
    SplashScreen,
    //FCM,  
    AngularFirestore,
    BarcodeScanner,
    Contacts,
    //Plugins
   // SocialSharing,
    Brightness,
   // Camera,
   // EmailComposer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
