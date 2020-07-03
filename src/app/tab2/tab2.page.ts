import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../services/login.service';
import { TabsService } from '../services/tabs.service';
import { ContactsService } from '../services/contacts.service';
import { AlertsService } from '../services/alerts.service';
import { IonList } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
//import { SocialSharing } from '@ionic-native/social-sharing/ngx';

//capacitor
import { Plugins } from '@capacitor/core';
const { Share } = Plugins;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit {
  textoBuscar = ''
  @ViewChild('lista', { static: true }) lista: IonList;
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
  //para guardar los contactos
  contactstext = []
  contactstexttrue = []
  contactstextnone = []
  // observables
  listado: Subscription
  a: Subscription

  constructor(private Login_Service: LoginService,
    private Tabs_Service: TabsService,
    private Contacts_Service: ContactsService,
    private Alerts_Service: AlertsService,
    private router: Router,
    //private socialShare: SocialSharing,
    ) {
      this.Login_Service.recuperaid().then(res => {
      this.Tabs_Service.recuperaundato(res).subscribe(usu => {
          this.usuario = usu;
        })
      })
  }

  ngOnInit() {
    this.listarcontactos()
  }
  ngOnDestroy(): void {
    this.listado.unsubscribe()
    this.a.unsubscribe()
  }

  doRefresh(event) {
    setTimeout(() => {
      this.updatecontacts()
      event.target.complete()
    }, 2000)
  }


  BuscarContacto(event) {
    this.textoBuscar = event.target.value;
  }

  listarcontactos() {
    this.Alerts_Service.load('Cargando contactos').then(loading => {
      this.a = this.Contacts_Service.Recupera_Contactos(this.usuario.uid).subscribe(dat => {
        const a = JSON.parse(dat[0].value)
        this.contactstext = a.todo
        const order = this.Contacts_Service.Ordenar_Json(this.contactstext, 'nombre', 'asc')
        order.forEach(element => {
          let b = this.Contacts_Service.Usuario_App(element.telefono).subscribe(res => {
            if (res.length > 0) {
              this.contactstexttrue.push(element)
            } else {
              this.contactstextnone.push(element)
            }
            loading.dismiss()
            b.unsubscribe()  
          })
        });
        this.a.unsubscribe()
      })
    }).catch(err =>{
      alert('el error es' + err)
    })
  }

  transferir(item) {
    const control = 'transferir'
    this.router.navigate(['/amount', item.nombre, item.telefono, control])
    this.lista.closeSlidingItems()
  }

  historial(usu) {
    this.router.navigate(['/single-contact', usu.nombre, usu.telefono])

  }

  cobrar(item) {
    const control = 'cobrar'
    this.router.navigate(['/amount', item.nombre, item.telefono, control])
    this.lista.closeSlidingItems()
  }
  async invitar(){
    let shareRet = await Share.share({
      title: 'Fastgi',
      text: "Prueba Fastgi, es ideal para realizar pagos y transferencias de una manera secilla y fácil",
      url: 'https://play.google.com/store/apps/details?id=com.hegaro.goodme&hl=es_BO',
      dialogTitle: 'Compartir via'
    });
  }

 // invitar() {
 //   this.socialShare.shareWithOptions({
 //     message: "Prueba Fastgi, es ideal para realizar pagos y transferencias de una manera secilla y fácil",
 //     subject: "QR Transaccion",
 //     url: 'Android:https://play.google.com/store/apps/details?id=com.hegaro.goodme&hl=es_BO  IOS:www.hegaro.com.bo',
 //     chooserTitle: 'Compartir Via'
 //   }).then(() => {
 //     console.log("shared successfull");
 //   }).catch((e) => {
 //     console.log("shared failed" + e);
 //   });
 // }

 updatecontacts() {
   this.Contacts_Service.Recupera_Contactos(this.usuario.uid).subscribe(res => {
     const contact = res[0].id
     this.Contacts_Service.deletecontact(this.usuario.uid, contact).then(dat => {
       this.Contacts_Service.guardarcontactos(this.usuario.uid)
       this.Alerts_Service.updatecontacts()
       this.contactstexttrue=[]
       this.contactstextnone=[]
       this.ngOnInit()
       //this.router.navigate(["/tabs/tab1"])

     })
   })
 }

}
