import { Component } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
//import { FCM } from '@ionic-native/fcm/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    //private fcm: FCM,
    private route: Router,
    public toastController: ToastController,
  ) {
    console.log('inicio de todo');
    
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.checkTheme();
    });

    //this.fcm.subscribeToTopic('marketing');
//    this.fcm.onNotification().subscribe(data => {
//      if (data.wasTapped) {
//        console.log("Received in background");
//        this.route.navigate(data.landing_page)
//      } else {
//      // const a=this.plt.is('ios')
//      //alert('llego la notificacion')
//       //alert(a)
//        //this.confirma(data.omar,data.jaime)
//        this.confirma(data.omar, data.jaime, data.landing_page)
//        // alert(data.omar+" "+data.jaime+" "+data.landing_page)
//        //this.route.navigate(data.landing_page)
//      };
//    }),err=>{
//     //console.log("no funciona !!!!!!!!!!!");
//      console.log(err);
//    }

  }

  async confirma(t,m,ruta) {
    const toast = await this.toastController.create({
      header: t,
      message: m,
      position: 'top',
      buttons: [
     {
          text: 'Aceptar',
          role: 'cancel',
          handler: () => {  
            this.route.navigate(ruta)
          }
        }
      ]
    });
    toast.present();
  }

  checkTheme() {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.toggle('dark');
    }
  }
}
