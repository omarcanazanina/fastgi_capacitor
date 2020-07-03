import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { TabsService } from 'src/app/services/tabs.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadMoneyService } from 'src/app/services/load-money.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts.service';
import { isNullOrUndefined } from 'util';
//Validators
import { FormBuilder, Validators } from "@angular/forms";
import { parse } from 'querystring';
import * as moment from 'moment';
moment.locale('es')
@Component({
  selector: 'app-form-card',
  templateUrl: './form-card.page.html',
  styleUrls: ['./form-card.page.scss'],
})
export class FormCardPage implements OnInit {
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
  cajaapp
  caja

  //datos de la tarjeta
  uid
  name1
  number1
  date1
  code1
  //control agregar o modificar tarjetta
  control
  montoruta = 0
  //control para disabled boton eliminar
  controldisabled = 0
  constructor(private Login_Service: LoginService,
    private Tabs_Service: TabsService,
    private fire: AngularFirestore,
    private Load_Service: LoadMoneyService,
    private router: Router,
    private Alerts_Service: AlertsService,
    private Activate_route: ActivatedRoute,
    //Validators
    private formBuilder: FormBuilder,
  ) {
    let params = Activate_route.snapshot.params
    console.log(params)
    this.uid = params.id
    this.name1 = params.name
    this.number1 = params.number
    this.date1 = params.date
    this.code1 = params.code
    this.control = params.modificar
    if (this.control == undefined) {
      this.control = 0
    }
    if (isNullOrUndefined(this.uid)) {
      this.controldisabled = 1
    } else {
      this.controldisabled = 2
    }
  }

  ngOnInit() {


    this.Login_Service.recuperaid().then(res => {
      this.Tabs_Service.recuperaundato(res).subscribe(usu => {
        this.usuario = usu;
      })
    })
    this.Load_Service.recuperacajaapp().subscribe(cajaapp => {
      this.cajaapp = cajaapp;

    })
  }

  //public submit() {
  //  console.log(this.registrationForm.value);
  //  //this.guardar(this.registrationForm.value.name,this.registrationForm.value.numer,this.registrationForm.value.date,this.registrationForm.value.code)
  //}


  public submit() {
    this.Alerts_Service.load('Cargando').then(load => {
      if (this.control == 1) {
        //  //this.controldisabled =2
        //  //*********METODO PARA MODIFICAR DATOS DE LA TARJETA \
        console.log(this.registrationForm.value);
        let fecha = this.convertirFecha(this.registrationForm.value.date)
        let fecha1 = fecha.substring(3, 10)
        let num = this.registrationForm.value.number
        let num1 = num.substring(15, 19)
        const datos = { name: this.registrationForm.value.name, number: num1, date: fecha1, code: this.registrationForm.value.code }
        this.Load_Service.actualizaTarjeta(this.uid, this.usuario.uid, datos).then(() => {
          this.Alerts_Service.ModificoTarjeta()
          this.router.navigate(['/load-money', this.montoruta])
          load.dismiss()
        })
      } else {
        //this.controldisabled =1
        //******ESTAMOS EN EL METODO PARA AGREGAR TARJETA */
        
        let fecha = this.convertirFecha(this.registrationForm.value.date)
        let fecha1 = fecha.substring(3, 10)
        let num = this.registrationForm.value.number
        let num1 = num.substring(15, 19)
        this.fire.collection('/user/' + this.usuario.uid + '/tarjetas').add({
          name: this.registrationForm.value.name,
          number: num1,
          date: fecha1,
          code: this.registrationForm.value.code,
          //monto: 0
        })
        this.Alerts_Service.creotarjeta()
        this.router.navigate(['/load-money', this.montoruta])
        load.dismiss()
      }
    }).catch(err=>{
      alert('error'+err)
    })
  }

  eliminar() {
    this.Load_Service.ConfirmaEliminacion(this.usuario.uid, this.uid).then(() => {
      this.router.navigate(['/load-money', this.montoruta])
    })
    //this.Load_Service.EliminarTarjeta(this.usuario.uid,this.uid)
    // this.Alerts_Service.eliminotarjeta()
  }


  creditCardNumber: string;

  cc_format(value: string) {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length > 0) {
      this.creditCardNumber = parts.join('-');
    } else {
      this.creditCardNumber = value;
    }
  }

  convertirFecha(fecha: any) {
    let date = new Date(fecha)
    return moment(date).subtract(10,'days').calendar();
  }


  //Validators
  registrationForm = this.formBuilder.group({
    name: [
      '',
      [
        Validators.required,
        Validators.maxLength(20)
      ]
    ],
    number: [
      '',
      [
        Validators.required,
        Validators.pattern("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$"),
        Validators.minLength(19)
      ]
    ],
    date: [
      '',
      [
        Validators.required,
      ]
    ],
    code: [
      '',
      [
        Validators.required,
        Validators.pattern("^[0-9]{3}$"),
        Validators.maxLength(3)
      ]
    ]
  });


  get name() {
    return this.registrationForm.get('name');
  }
  get number() {
    return this.registrationForm.get('number');
  }
  get date() {
    return this.registrationForm.get('date');
  }
  get code() {
    return this.registrationForm.get('code');
  }


  public errorMessages = {
    name: [
      { type: 'required', message: 'El nombre es obligatorio' },
      {
        type: 'pattern',
        message: 'Solo se permiten letras o números'
      },
      {
        type: 'maxlength',
        message: 'El nombre no debe contener mas de 20 caracteres'
      }

    ],
    number: [
      { type: 'required', message: 'El número es obligatorio' },
      { type: 'pattern', message: 'Por favor, ingrese un número valido' }
      ,
      {
        type: 'minlength',
        message: 'El número debe contener 16 dígitos'
      }
    ],
    date: [
      { type: 'required', message: 'La fecha de vencimiento es obligatorio' }
    ],
    code: [
      { type: 'required', message: 'El código de seguridad es obligatorio' },
      { type: 'pattern', message: 'Por favor, ingrese un código valido' },
      {
        type: 'maxlength',
        message: 'El código de seguridad no debe contener mas de 3 caracteres'
      }
    ]
  };
}
