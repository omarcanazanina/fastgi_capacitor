import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { TabsService } from 'src/app/services/tabs.service';
import { ContactsService } from 'src/app/services/contacts.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { TransferenciasService } from 'src/app/services/transferencias.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { FcmService } from '../../services/fcm.service';
import { PagarcobrosService } from 'src/app/services/pagarcobros.service';
import { PagarQRsinmontoService } from 'src/app/services/pagar-qrsinmonto.service';


@Component({
  selector: 'app-pin',
  templateUrl: './pin.page.html',
  styleUrls: ['./pin.page.scss'],
})
export class PinPage implements OnInit {
  //teclado amilkar
  pin: string = ""
  characters: string = "○ ○ ○ ○"

  //datos recibidos
  dato1
  dato2
  control
  monto
  //datosd el usuario
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
  cobro: any = []
  pagarcobro: any = []
  destinatario: any = []
  //datos para la fecha
  fecha: Date
  fechita: any
  //transferencia
  cajaactual
  cajainterna
  //recupera nombre de contactoa
  nombreusu: any
  nombrecob: any
  //datos para pagar ell cobro
  cajausuario
  cajadestinatario
  //observables
  primer: Subscription
  segundo: Subscription
  tercero: Subscription
  cuarto: Subscription
  constructor(private activatedRoute: ActivatedRoute,
    private Login_Service: LoginService,
    private Tabs_Service: TabsService,
    private Contacts_Service: ContactsService,
    private Alerts_Service: AlertsService,
    private Transferencia_Service: TransferenciasService,
    private fire: AngularFirestore,
    private router: Router,
    private fcm: FcmService,
    private PagarCobros_Service: PagarcobrosService,
    private PagoQRsinmonto: PagarQRsinmontoService,
    private Transferencias_Service: TransferenciasService
  ) { }

  ngOnInit() {
    this.Login_Service.recuperaid().then(res => {
      let primer = this.Tabs_Service.recuperaundato(res).subscribe(usu => {
        this.usuario = usu;
        this.dato1 = this.activatedRoute.snapshot.paramMap.get('dato1')
        this.dato2 = this.activatedRoute.snapshot.paramMap.get('dato2')
        this.control = this.activatedRoute.snapshot.paramMap.get('control')
        this.monto = this.activatedRoute.snapshot.paramMap.get('monto')
        // alert('el dato1 es ' + ' ' + this.dato1 + 'el dato 2 es ' + this.dato2 + 'el control es ' + this.control + 'el monto es' + this.monto);



        let segundo = this.Contacts_Service.Usuario_App(this.dato2).subscribe(dat => {
          this.destinatario = dat[0]
          //alert(JSON.stringify(this.destinatario))
          //recupera el cobro
          if (this.control == 'pagarcobro') {
            let cob = this.PagarCobros_Service.recuperacobro(this.usuario.uid, this.dato1).subscribe(res => {
              this.cobro = res

              let idcobro = this.PagarCobros_Service.recuperaenviocobros(this.destinatario.uid, this.usuario.uid, this.cobro.fechita).subscribe(res1 => {
                this.pagarcobro = res1[0]
                idcobro.unsubscribe()
              })
              cob.unsubscribe()
            })
          }

          //
          let tercero = this.Contacts_Service.Recupera_Contactos(this.usuario.uid).subscribe(dat => {
            const a = JSON.parse(dat[0].value)
            const b = a.todo
            for (let i = 0; i < b.length; i++) {
              const element = b[i];
              if (element.telefono == this.destinatario.telefono) {
                this.nombrecob = element.nombre
                // alert('el nombrecob es'+this.nombrecob)
              }
            } if (this.nombrecob == undefined || this.nombrecob == "") {
              this.nombrecob = this.destinatario.telefono
            }
            tercero.unsubscribe()
          })

          let cuarto = this.Contacts_Service.Recupera_Contactos(this.destinatario.uid).subscribe(dat => {
            const a = JSON.parse(dat[0].value)
            const b = a.todo
            for (let i = 0; i < b.length; i++) {
              const element = b[i];
              if (element.telefono == this.usuario.telefono) {
                this.nombreusu = element.nombre
                //alert('elnombre delusu'+this.nombreusu);
              }
            }
            if (this.nombreusu == undefined || this.nombreusu == "") {
              this.nombreusu = this.usuario.telefono
            }
            cuarto.unsubscribe()
          })
          segundo.unsubscribe()
        })
        primer.unsubscribe()
      })
    })
    //datos del pin con el teclado amilkar
    this.pin = ""
    this.characters = "○ ○ ○ ○"
  }

  ngOnDestroy(): void {
    // this.primer.unsubscribe()
    // this.segundo.unsubscribe()
    // this.tercero.unsubscribe()
    // this.cuarto.unsubscribe()
  }

  onClick(n) {
    if (this.pin.length < 4) {
      n == 'x' ? this.pin = this.pin.slice(0, -1) : this.pin += n
    }
    else {
      n == 'x' ? this.pin = this.pin.slice(0, -1) : null
    }
    switch (this.pin.length) {
      case 0:
        this.characters = "○ ○ ○ ○"
        break;
      case 1:
        this.characters = "● ○ ○ ○"
        break;
      case 2:
        this.characters = "● ● ○ ○"
        break;
      case 3:
        this.characters = "● ● ● ○"
        break;
      case 4:
        this.characters = "● ● ● ●"
        console.log(this.pin)
        this.funciones()
        //Consultar PIN en DB
        break;
      default:
        break;
    }
  }

  funciones() {
    if (this.control == 'pagarsinmonto') {
      //**empieza funcion pagar sin monto */
      this.Alerts_Service.load('Realizando pago').then(load => {
        this.fecha = new Date();
        const mes = this.fecha.getMonth() + 1;
        this.fechita = this.fecha.getDate() + "-" + mes + "-" + this.fecha.getFullYear() + " " + this.fecha.getHours() + ":" + this.fecha.getMinutes() + ":" + this.fecha.getSeconds();
        if (this.pin == this.usuario.password) {
          const cajaactualdest = parseFloat(this.destinatario.cajainterna) + parseFloat(this.monto);
          this.PagoQRsinmonto.actualizacaja({ cajainterna: cajaactualdest }, this.destinatario.uid);
          this.fire.collection('/user/' + this.destinatario.uid + '/ingresos').add({
            monto: this.monto,
            fecha: this.fecha,
            fechita: this.fechita,
            descripcion: 'pago',
            id: this.usuario.uid,
            nombre: this.nombreusu,
            telefono: this.usuario.telefono,
            identificador: '1',
            saldo: cajaactualdest
          })
          const cajausu = parseFloat(this.usuario.cajainterna) - parseFloat(this.monto);
          this.PagoQRsinmonto.actualizacaja({ cajainterna: cajausu }, this.usuario.uid);
          this.fire.collection('/user/' + this.usuario.uid + '/egreso').add({
            monto: this.monto,
            id: this.destinatario.uid,
            nombre: this.nombrecob,
            telefono: this.destinatario.telefono,
            fecha: this.fecha,
            fechita: this.fechita,
            descripcion: 'pago',
            saldo: cajausu,
            identificador: '0'
          })
          this.router.navigate(['/transaction-response'])
          //this.au.presentToast(this.monto_sinmonto, this.nombrecob);
          this.fcm.notificacionforToken("Fastgi", " Acaba de recibir el pago de " + this.monto + "Bs. de " + this.nombreusu + " ", this.destinatario.token, this.usuario.uid, "/tabs/tab1")
          load.dismiss()
        }
        else {
          this.Alerts_Service.passincorrecta();
          load.dismiss()
        }
      }).catch(err => {
        alert('error' + err)
      })
      // a.unsubscribe()
      //**termina funcion pagarsinmonto */
    }
    if (this.control == 'pagarconmonto') {
      //** inicio de funcion de pagarconmonto */
      this.Alerts_Service.load('Realizando el pago').then(load => {
        this.fecha = new Date();
        const mes = this.fecha.getMonth() + 1;
        this.fechita = this.fecha.getDate() + "-" + mes + "-" + this.fecha.getFullYear() + " " + this.fecha.getHours() + ":" + this.fecha.getMinutes() + ":" + this.fecha.getSeconds()
        if (parseInt(this.usuario.password) == 0) {
          this.router.navigate(['/form-add-pin'])
        } else {
          if (this.pin == this.usuario.password) {
            const caja_destinatario = parseFloat(this.destinatario.cajainterna) + parseFloat(this.monto);
            this.PagoQRsinmonto.actualizacaja({ cajainterna: caja_destinatario }, this.destinatario.uid);
            this.fire.collection('/user/' + this.destinatario.uid + '/ingresos').add({
              monto: this.monto,
              id: this.usuario.uid,
              nombre: this.nombreusu,
              telefono: this.usuario.telefono,
              fechita: this.fechita,
              fecha: this.fecha,
              descripcion: 'pago por lectura',
              saldo: caja_destinatario,
              identificador: '1'
            })
            const caja_usuario = parseFloat(this.usuario.cajainterna) - this.monto;
            this.PagoQRsinmonto.actualizacaja({ cajainterna: caja_usuario }, this.usuario.uid);
            this.fire.collection('/user/' + this.usuario.uid + '/egreso').add({
              monto: this.monto,
              id: this.destinatario.uid,
              nombre: this.nombrecob,
              telefono: this.destinatario.telefono,
              fechita: this.fechita,
              fecha: this.fecha,
              descripcion: 'pago por lectura',
              saldo: caja_usuario,
              identificador: '0'
            })
            this.router.navigate(['/transaction-response'])
            // this.au.presentToast(this.real_conmonto, this.nombrecob);
            this.fcm.notificacionforToken("Fastgi", " Acaba de recibir el pago de  " + this.monto + "Bs. de " + this.nombreusu + " ", this.destinatario.token, this.usuario.uid, "/tabs/tab1")
            load.dismiss()
          }
          else {
            this.Alerts_Service.passincorrecta();
            load.dismiss()
          }
        }
      }).catch(err => {
        alert('error' + err)
      })
      //**fin de funcion pagarconmonto */
      //d.unsubscribe()
    }
    /////////////////////////////
    if (this.control == 'transferir') {
      //**inicio de funcion transferir */
      const ruta = (['/load-money', 0])
      this.Alerts_Service.load('Transfiriendo').then(load => {
        if (parseFloat(this.usuario.cajainterna) >= this.monto) {
          this.fecha = new Date();
          const mes = this.fecha.getMonth() + 1;
          this.fechita = this.fecha.getDate() + "-" + mes + "-" + this.fecha.getFullYear() + " " + this.fecha.getHours() + ":" + this.fecha.getMinutes() + ":" + this.fecha.getSeconds();
          if (this.monto == 0) {
            this.Alerts_Service.ingresoinvalido()
            load.dismiss()
          } else {
            if (this.pin == this.usuario.password) {
              this.cajaactual = parseFloat(this.destinatario.cajainterna) + parseFloat(this.monto);
              this.Transferencia_Service.actualizacaja({ cajainterna: this.cajaactual }, this.destinatario.uid);
              this.fire.collection('/user/' + this.destinatario.uid + '/ingresos').add({
                monto: this.monto,
                id: this.usuario.uid,
                nombre: this.nombreusu,
                telefono: this.usuario.telefono,
                fechita: this.fechita,
                fecha: this.fecha,
                descripcion: 'transferencia',
                saldo: this.cajaactual,
                identificador: '1'
              })
              this.cajainterna = parseFloat(this.usuario.cajainterna) - this.monto;
              this.Transferencia_Service.actualizacaja({ cajainterna: this.cajainterna }, this.usuario.uid)
              this.fire.collection('/user/' + this.usuario.uid + '/egreso').add({
                monto: this.monto,
                id: this.destinatario.uid,
                nombre: this.nombrecob,
                telefono: this.destinatario.telefono,
                fechita: this.fechita,
                fecha: this.fecha,
                descripcion: 'transferencia',
                saldo: this.cajainterna,
                identificador: '0'
              })
              this.fire.collection('/user/' + this.usuario.uid + '/cobrostransferencias').add({
                dato: 'enviatransferencia',
                monto: this.monto,
                // detalle: this.detalle_transferencia,
                clave: this.destinatario.uid,
                formatted: this.nombrecob,
                telefono: this.destinatario.telefono,
                fechita: this.fechita,
                fecha: this.fecha,
                saldo: this.cajainterna,
                estadobadge: false
              })
              //
              this.fire.collection('/user/' + this.destinatario.uid + '/cobrostransferencias').add({
                dato: 'recibetransferencia',
                monto: this.monto,
                //detalle: this.detalle_transferencia,
                clave: this.usuario.uid,
                formatted: this.nombreusu,
                telefono: this.usuario.telefono,
                fechita: this.fechita,
                fecha: this.fecha,
                saldo: this.cajaactual,
                estadobadge: false
              })
              load.dismiss()
              this.router.navigate(['/transaction-response'])
              // this.Alerts_Service.transexitoso(this.monto, this.nombrecob)
              this.fcm.notificacionforToken("Fastgi", "Acaba de recibir una tranferencia de " + this.monto + "Bs. de " + this.nombreusu + " ", this.destinatario.token, this.usuario.uid, "/tabs/tab1")
            
              //this.badgeactual = this.cobrador.badge + 
              //this.au.actualizabadge({ badge: this.badgeactual }, this.cobrador.uid);
            } else {
              this.Alerts_Service.passincorrecta();
              load.dismiss()
            }
          }
        } else {
          this.Alerts_Service.ahorroinsuficiente(ruta);
          load.dismiss()
        }
      }).catch(err => {
        alert('error' + err)
      })
      //**final funcion transferir */
    }

    //else {
    if (this.control == 'pagarcobro') {
      //**inicio funcion pagarcobro */
      this.Alerts_Service.load('Pagando cobro').then(load => {
        this.fecha = new Date();
        const mes = this.fecha.getMonth() + 1;
        this.fechita = this.fecha.getDate() + "-" + mes + "-" + this.fecha.getFullYear() + " " + this.fecha.getHours() + ":" + this.fecha.getMinutes() + ":" + this.fecha.getSeconds();
        let ad = this.PagarCobros_Service.recuperaenviocobros(this.usuario.uid, this.destinatario.uid, this.pagarcobro.fechita).subscribe(dat => {
          let desdeDestinatario = dat[0]
          this.PagarCobros_Service.agregafechapagocobros({ fechapago: this.fechita }, this.usuario.uid, this.pagarcobro.id)
          this.PagarCobros_Service.agregafechapagocobros({ fechapago: this.fechita }, this.destinatario.uid, desdeDestinatario.id)
          this.PagarCobros_Service.actualizaestadodecobro({ estado: 1 }, this.destinatario.uid, desdeDestinatario.id)
          ad.unsubscribe()
        })
        if (parseInt(this.usuario.password) == 0) {
          this.router.navigate(['/form-add-pin'])
          load.dismiss()
        } else {
          if (this.pin == this.usuario.password) {
            this.cajausuario = parseFloat(this.usuario.cajainterna) - parseFloat(this.pagarcobro.monto);
            this.PagarCobros_Service.actualizacaja({ cajainterna: this.cajausuario }, this.usuario.uid);
            this.PagarCobros_Service.actualizaestadodecobro({ estado: 1 }, this.usuario.uid, this.pagarcobro.id)
            this.fire.collection('/user/' + this.usuario.uid + '/egreso').add({
              monto: this.pagarcobro.monto,
              id: this.destinatario.uid,
              nombre: this.nombrecob,
              telefono: this.destinatario.telefono,
              fechita: this.fechita,
              fecha: this.fecha,
              descripcion: 'pago por envio de cobro',
              saldo: this.cajausuario,
              identificador: '0'
            })
            this.cajadestinatario = parseFloat(this.destinatario.cajainterna) + parseFloat(this.pagarcobro.monto);
            this.PagarCobros_Service.actualizacaja({ cajainterna: this.cajadestinatario }, this.destinatario.uid)
            this.fire.collection('/user/' + this.destinatario.uid + '/ingresos').add({
              monto: this.pagarcobro.monto,
              id: this.usuario.uid,
              nombre: this.nombreusu,
              telefono: this.usuario.telefono,
              fechita: this.fechita,
              fecha: this.fecha,
              descripcion: 'recibio por envio de cobro',
              saldo: this.cajadestinatario,
              identificador: '1'
            })
            //this.Alerts_Service.pagodecobroexitoso(this.pagarcobro.monto, this.nombrecob);
            this.router.navigate(['/transaction-response'])
            this.fcm.notificacionforToken("Fastgi", " Acaba de recibir el pago de " + this.pagarcobro.monto + "Bs. de " + this.nombreusu + " ", this.destinatario.token, this.usuario.uid, "/tabs/tab1")
            load.dismiss()
            //this.estado_pagodeuda = true
          } else {
            this.Alerts_Service.passincorrecta();
            load.dismiss()
          }
        }
      }).catch(err => {
        alert('error' + err)
      })
      //**fin funcion pagarcobro */
    }
    //}
  }
}
