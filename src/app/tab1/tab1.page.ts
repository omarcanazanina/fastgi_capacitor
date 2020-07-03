import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { TabsService } from '../services/tabs.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Router } from '@angular/router';
import { MenuController, AlertController } from '@ionic/angular';
import { FcmService } from '../services/fcm.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  user: string
  usuario = {
    cajainterna: "",
    correo: "",
    telefono: "",
    password: "",
    monto: "",
    nombre: "",
    uid: "",
    pass: "",
    estado: "",
    token: "",
    contacts: ""
  }
  //para el scaner y el lector
  qrData = 'omaro999'
  //para el scaner
  public data = {
    text: ""
  };
  tokencel: any

  constructor(private Login_Service: LoginService,
    private Tabs_Service: TabsService,
    private barcode: BarcodeScanner,
    private router: Router,
    public menuCtrl: MenuController,
    private fcm:FcmService,
    public alertController: AlertController,) {
  }

  ngOnInit() {
    this.Login_Service.recuperaid().then(res => {
      this.Tabs_Service.recuperaundato(res).subscribe(usu => {
        this.usuario = usu;
        this.guardarcontactos()
      //  this.cerrarsesionotro()
      })
    })
  }

  guardarcontactos() {
    if (parseInt(this.usuario.contacts) == 0) {
      this.Tabs_Service.guardarcontactos(this.usuario.uid)
      this.Tabs_Service.actualizarcontacts({ contacts: 1 }, this.usuario.uid);
    } else {
      //
    }
  }

// cerrarsesionotro() {
//   this.fcm.getToken().then(t => {
//     this.tokencel = t
//     if (this.tokencel == this.usuario.token) {
//       //alert('es el dispositivo')
//     } else {
//       this.Login_Service.cerrarsesion()
//       this.cerrarsesion()
//     }
//   })
// }



  scan() {
    //merfe barcodeScanner
    this.barcode.scan().then(barcodeData => {
      this.data = barcodeData;
      const convertido = this.data.text.split("/");
      const convertido1 = convertido[0];
      const convertido2 = convertido[1];
      var c = 0;
      var letra = "/"
      for (var i = 0; i <= this.data.text.length; i++) {
        if (this.data.text[i] == letra) {
          c++
        }
      }
      if (c == 0 && this.data.text != "") {
        // alert('estamos en el sinmonto')
        this.router.navigate(['/amount', this.usuario.uid, this.data.text, 'pagarsinmonto'])
      } else {
        this.router.navigate(['/pin', 'dato1', convertido2, 'pagarconmonto', convertido1])
      }
    }).catch(err => {
      console.log('Error', err);
    });
  }

  qr() {
    this.router.navigate(['/charge-money', ""])
  }

  loadMoney() {
    this.router.navigate(['/load-money', 0])
  }



  flag_money = true


  ionViewWillEnter() {
    //Enable menu
    this.menuCtrl.enable(true);
    //console.log(this.usuario.cajainterna)
    if (this.usuario.cajainterna == "") {
      this.flag_money = false;
    }
  }

  async cerrarsesion() {
    const alert = await this.alertController.create({
      header: 'Fastgi',
      message: 'Acaba de iniciar sesión en otro dispositivo',
      backdropDismiss: false,
      buttons: [
       {
          text: 'Aceptar',
          handler: () => {
           // this.Login_Service.cerrarsesion()
          }
        }
      ]
    });
    await alert.present();
  }

}