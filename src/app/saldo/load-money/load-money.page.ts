import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadMoneyService } from 'src/app/services/load-money.service';
import { LoginService } from 'src/app/services/login.service';
import { TabsService } from 'src/app/services/tabs.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertsService } from 'src/app/services/alerts.service';
import { ActionSheetController, IonCard } from '@ionic/angular';


@Component({
  selector: 'app-load-money',
  templateUrl: './load-money.page.html',
  styleUrls: ['./load-money.page.scss'],
})
export class LoadMoneyPage implements OnInit {




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

  tarjetas: any = []
  monto = null
  cajaapp
  caja_app_modificada
  cajausu
  fecha: Date
  fechita: any
  //seleccion de tarjeta
  seleccion = 0
  guardarselect = []
  constructor(private router: Router,
    private Load_Service: LoadMoneyService,
    private Login_Service: LoginService,
    private Tabs_Service: TabsService,
    private activate: ActivatedRoute,
    public fire: AngularFirestore,
    private Alerts_Service: AlertsService,
    private actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
    //recibe el monto de 'amount'
    this.monto = this.activate.snapshot.paramMap.get('monto')
    //recupera datos del usuario y las tarjetas
    this.Login_Service.recuperaid().then(res => {
      this.Tabs_Service.recuperaundato(res).subscribe(usu => {
        this.usuario = usu;
        this.Load_Service.recuperatarjeta(this.usuario.uid).subscribe(data => {
          this.tarjetas = data;
        })
      })
    })
    //recupera datos de la caja de la app
    this.Load_Service.recuperacajaapp().subscribe(cajaapp => {
      this.cajaapp = cajaapp;

    })
    //recupera la fecha
    this.fecha = new Date();
    const mes = this.fecha.getMonth() + 1;
    this.fechita = this.fecha.getDate() + "-" + mes + "-" + this.fecha.getFullYear() + " " + this.fecha.getHours() + ":" + this.fecha.getMinutes() + ":" + this.fecha.getSeconds();
  }

  agregartarjeta() {
    this.router.navigate(['/form-card'])
  }

  introducir_monto() {
    const dato1 = 'dato1'
    const dato2 = 'dato2'
    const control = 1
    this.router.navigate(['/amount', dato1, dato2, control])
  }

  select(item, index) {
    this.guardarselect = item
    console.log(this.guardarselect);
    
   // alert(JSON.stringify(this.guardarselect));
    // this.Load_Service.recuperatarjeta(this.usuario.uid).subscribe(data => {
    //   this.tarjetas = data;
    // })
    this.addStyle(index)
  }

  cargar_saldo(monto) {
    this.caja_app_modificada = parseFloat(this.cajaapp.monto) + parseFloat(monto)
    this.Load_Service.actualizacajaapp({ monto: this.caja_app_modificada })
    this.cajausu = parseFloat(this.usuario.cajainterna) + parseFloat(monto)
    this.Load_Service.actualizacaja({ cajainterna: this.cajausu }, this.usuario.uid);
    this.fire.collection('/user/' + this.usuario.uid + '/ingresos').add({
      monto: monto,
      //nombre es los ultimos numeros de la tarjeta
      nombre: "····" + '1234',
      fechita: this.fechita,
      fecha: this.fecha,
      descripcion: 'carga desde tarjeta',
      saldo: this.cajausu,
      identificador: '1'
    })
    //el 1234 eso los ultimos numeros de la tarjeta
    const as = 1234
    this.Alerts_Service.cargocontarjeta(monto, '····' + as)
    this.router.navigate(['/tabs/tab1'])
  }

  modificar(item) {
    this.router.navigate(['/form-card', item])
  }

  async crud(item) {
    item.modificar = 1
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [
        {
          text: 'Modificar',
          icon: 'create',
          handler: () => {
            this.router.navigate(['form-card', item])
          }
        },
        {
          text: 'Eliminar',
          icon: 'trash',
          handler: () => {
            this.Load_Service.ConfirmaEliminacion(this.usuario.uid, item.id)
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
    });
    await actionSheet.present();
  }

  addStyle(index) {
    index = index + 2;
    let cards = document.querySelectorAll('ion-card');
    for (let i = 0; i < cards.length; i++) {
      cards[i].classList.remove('select_card');
      if (i == index) {
        cards[i].classList.add('select_card');
      }
    }
  }
}
