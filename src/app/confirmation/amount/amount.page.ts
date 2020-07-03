import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactsService } from 'src/app/services/contacts.service';
import { TabsService } from 'src/app/services/tabs.service';
import { LoginService } from 'src/app/services/login.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertsService } from 'src/app/services/alerts.service';
import { FcmService } from 'src/app/services/fcm.service';
import { Subscription } from 'rxjs';
import { TransferenciasService } from 'src/app/services/transferencias.service';

@Component({
  selector: 'app-amount',
  templateUrl: './amount.page.html',
  styleUrls: ['./amount.page.scss'],
})
export class AmountPage implements OnInit {

  //Configs
  integers: number = 5
  decimals: number = 2

  amount: string = "";
  amount_show: string = "";
  array: string[];
  dot: boolean = true;
  isDecimal: number = 1;
  isInteger: number = 1;
  //reciebe datos de load money
  dato1
  dato2
  control
  fecha: Date
  fechita: any
  usuario: any = []
  destinatario: any = []
  nombreusu

  //recuperar nombre del destinatario
  primero: Subscription
  segundo: Subscription
  nombrecob
  telefono
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private Contacts_Service: ContactsService,
    private Tabs_Service: TabsService,
    private Login_Service: LoginService,
    public fire: AngularFirestore,
    private Alerts_Service: AlertsService,
    private fcm: FcmService,
    private Transferencias_Service: TransferenciasService) {
    this.dato1 = this.activatedRoute.snapshot.paramMap.get('dato1')
    this.dato2 = this.activatedRoute.snapshot.paramMap.get('dato2')
    this.control = this.activatedRoute.snapshot.paramMap.get('control')

  }

  ngOnInit() {
    if (this.control == '1') {
      console.log('carga tarjeta');
    } else {
      this.Login_Service.recuperaid().then(res => {
        this.Tabs_Service.recuperaundato(res).subscribe(usu => {
          this.usuario = usu;
          let primero = this.Contacts_Service.Recupera_Contactos(this.usuario.uid).subscribe(dat => {
            const a = JSON.parse(dat[0].value)
            const b = a.todo
            for (let i = 0; i < b.length; i++) {
              const element = b[i];
              if (element.telefono == this.destinatario.telefono) {
                this.nombrecob = element.nombre
                //this.telefono = element.telefono
                // alert('el nombrecob es' + this.nombrecob)
              }
            } if (this.nombrecob == undefined || this.nombrecob == "") {
              this.nombrecob = this.destinatario.telefono
            }
            primero.unsubscribe()
          })
          let segundo = this.Contacts_Service.Usuario_App(this.dato2).subscribe(dat => {
            this.destinatario = dat[0]
            let nomc = this.Contacts_Service.Recupera_Contactos(this.destinatario.uid).subscribe(dat => {
              const a = JSON.parse(dat[0].value)
              const b = a.todo
              for (let i = 0; i < b.length; i++) {
                const element = b[i];
                if (element.telefono == this.usuario.telefono) {
                  this.nombreusu = element.nombre
                  //  console.log(this.nombreusu);
                }
              }
              if (this.nombreusu == undefined || this.nombreusu == "") {
                this.nombreusu = this.usuario.telefono
              }
              nomc.unsubscribe()
            })
            segundo.unsubscribe()
          })
        })
      })
    }




    //teclado numerico
    this.amount = ""
    this.amount_show = "";
    this.dot = true
    this.isDecimal = 1
    this.isInteger = 1
  }


  onClick(n) {
    if (n == '.' && this.amount.length == 0 && this.dot) {
      this.amount = '0.'
      this.dot = false
    }
    if (n == '.' && this.dot) {
      this.amount += n
      this.dot = false
    }
    if (n == 'x') {
      this.amount = this.amount.slice(0, -1)
      if (this.isInteger > 1 && this.dot) {
        this.isInteger--
      }
      if (this.amount.indexOf(".") == -1) {
        this.dot = true
      }
      if (!this.dot) {
        this.isDecimal--
      }
    }
    if (n != 'x' && n != '.') {
      if (this.isDecimal <= this.decimals && !this.dot) {
        this.amount += n
        this.isDecimal++
      }
      if (this.isInteger <= this.integers && this.dot) {
        this.amount += n
        this.isInteger++
      }
    }

    this.array = this.amount.split('.');
    var decimal = this.array[1]
    this.array = this.array[0].split('');
    var count = 1;
    var characters = "";

    for (let i = this.array.length - 1; i >= 0; i--) {
      if (count == 3 && i > 0) {
        characters += this.array[i] + ','
        count = 1
      }
      else {
        characters += this.array[i]
        count++
      }
    }

    this.array = characters.split('');
    this.array = this.array.reverse()

    characters = "";
    for (let i = 0; i < this.array.length; i++) {
      characters += this.array[i];
    }

    if (decimal != undefined) {
      this.amount_show = characters + '.' + decimal
    }
    else {
      this.amount_show = characters
    }
    console.log(this.amount)
  }

  confirmar() {
    if (this.control == '1') {
      this.router.navigate(['/load-money', this.amount])
    }
    //////
    if (this.control == 'transferir') {
      if (parseInt(this.usuario.password) == 0) {
        this.router.navigate(['/form-add-pin'])
      } else {
        this.router.navigate(['/pin', this.dato1, this.dato2, this.control, this.amount])
      }
    }
    ///////
    if (this.control == 'pagarsinmonto') {
      if (parseInt(this.usuario.password) == 0) {
        this.router.navigate(['/form-add-pin'])
      } else {
        this.router.navigate(['/pin', this.dato1, this.dato2, this.control, this.amount])
      }
    }
    ////
    if (this.control == 'generarcodigo') {
      this.router.navigate(['/charge-money', this.amount])
    }
    if (this.control == 'cobrar') {
      /**inicio funcion cobrar */
      this.Alerts_Service.load('Enviando cobro').then(load=> {
      this.fecha = new Date();
      const mes = this.fecha.getMonth() + 1;
      this.fechita = this.fecha.getDate() + "-" + mes + "-" + this.fecha.getFullYear() + " " + this.fecha.getHours() + ":" + this.fecha.getMinutes() + ":" + this.fecha.getSeconds();

      this.fire.collection('/user/' + this.usuario.uid + '/cobrostransferencias').add({
        monto: this.amount,
        dato: 'enviado',
        clave: this.destinatario.uid,
        formatted: this.dato1,
        telefono: this.destinatario.telefono,
        fechita: this.fechita,
        fecha: this.fecha,
        fechapago: '',
        estado: 0
      })
      this.fire.collection('/user/' + this.destinatario.uid + '/cobrostransferencias').add({
        monto: this.amount,
        dato: 'recibio',
        clave: this.usuario.uid,
        formatted: this.nombreusu,
        telefono: this.usuario.telefono,
        fechita: this.fechita,
        fecha: this.fecha,
        fechapago: '',
        estado: 0
      })
      this.router.navigate(['/transaction-response'])
      //this.Alerts_Service.enviocobro(this.amount, this.dato1)
      this.fcm.notificacionforToken("Fastgi", "Acaba de recibir una solicitud de pago de " + this.amount + "Bs. de " + this.nombreusu + " ", this.destinatario.token, this.usuario.uid, "/tabs/tab1")
      load.dismiss()
    }).catch(err =>{
      alert('error'+err)
    })
       /**fin funcion cobrar */
    }

    //if (this.control == 1) {
    //  this.router.navigate(['/load-money', this.amount])
    //} else {
    //  if (this.control == 'transferir') {
    //    this.router.navigate(['/pin', this.dato1, this.dato2, this.control, this.amount])
    //  } else {
    //    if (this.control == 'cobrar') {
    //      this.fecha = new Date();
    //      const mes = this.fecha.getMonth() + 1;
    //      this.fechita = this.fecha.getDate() + "-" + mes + "-" + this.fecha.getFullYear() + " " + this.fecha.getHours() + ":" + this.fecha.getMinutes() + ":" + this.fecha.getSeconds();
    //      this.Contacts_Service.Usuario_App(this.dato2).subscribe(dat => {
    //        this.destinatario = dat[0]
    //        this.Contacts_Service.Recupera_Contactos(this.destinatario.uid).subscribe(dat => {
    //          const a = JSON.parse(dat[0].value)
    //          const b = a.todo
    //          for (let i = 0; i < b.length; i++) {
    //            const element = b[i];
    //            if (element.telefono == this.usuario.telefono) {
    //              this.nombreusu = element.nombre
    //              console.log(this.nombreusu);
    //            }
    //          }
    //          if (this.nombreusu == undefined || this.nombreusu == "") {
    //            this.nombreusu = this.usuario.telefono
    //          }
    //          this.fire.collection('/user/' + this.usuario.uid + '/cobrostransferencias').add({
    //            monto: this.amount,
    //            dato: 'enviado',
    //            clave: this.destinatario.uid,
    //            formatted: this.dato1,
    //            telefono: this.destinatario.telefono,
    //            fechita: this.fechita,
    //            fecha: this.fecha,
    //            fechapago: '',
    //            estado: 0
    //          })
    //          this.fire.collection('/user/' + this.destinatario.uid + '/cobrostransferencias').add({
    //            monto: this.amount,
    //            dato: 'recibio',
    //            clave: this.usuario.uid,
    //            formatted: this.nombreusu,
    //            telefono: this.usuario.telefono,
    //            fechita: this.fechita,
    //            fecha: this.fecha,
    //            fechapago: '',
    //            estado: 0
    //          })
    //          this.router.navigate(['/transaction-response'])
    //          //this.Alerts_Service.enviocobro(this.amount, this.dato1)
    //        //  this.fcm.notificacionforToken("Fastgi", "Acaba de recibir una solicitud de pago de " + this.amount + "Bs. de " + this.nombreusu + " ", this.destinatario.token, this.usuario.uid, "/tabs/tab2")
    //          //this.router.navigate(['/tabs/tab2'])
    //        })
    //      })
    //    }
    //   
    //  }
    //}
  }
}
