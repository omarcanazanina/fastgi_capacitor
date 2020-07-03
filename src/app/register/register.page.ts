import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';
import { LoginService } from '../services/login.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
//import { FCM } from '@ionic-native/fcm/ngx';
import { RegisterService } from '../services/register.service';
import { AlertsService } from '../services/alerts.service';
import { MenuController } from '@ionic/angular';
//Validators
import { FormBuilder, Validators } from "@angular/forms";
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  datos: any
  nombre = ''
  email = ''
  pin = 0
  cajainterna = 0
  estado = 0
  contacts = "0"
  img = 'https://firebasestorage.googleapis.com/v0/b/aplicacion-bdcf5.appspot.com/o/default.jpg?alt=media&token=a566c63e-e013-4a59-aefc-79610f1fa2b8'

  constructor(private Login_Service: LoginService,
    private alertCtrl: AlertController,
    private router: Router,
    //private fcm: FCM,
    private Register_Service: RegisterService,
    private Alerts_Service: AlertsService,
    public menuCtrl: MenuController,
    //Validators
    private formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container1', {
      'size': 'invisible'
    })
  }
  // public submit() {
  //   //console.log(this.registrationForm.value);
  //   this.registrar(this.registrationForm.value.code, this.registrationForm.value.phone)
  // }


  // registrar usuario
  submit() {
    this.Alerts_Service.load('Cargando').then(load => {
      let codtel = this.registrationForm.value.code;
      let phoneNumber = this.registrationForm.value.phone;
      let verifi = this.Login_Service.verificausuarioexistente(phoneNumber.toString()).subscribe(usu => {
        this.datos = usu
        verifi.unsubscribe()
        if (this.datos != '') {
          this.Alerts_Service.usuarioyaexiste()
          load.dismiss()
        } else {
          const appVerifier1 = this.recaptchaVerifier;
          const phoneNumberString = codtel + phoneNumber.toString();
          const phoneNumber1 = phoneNumber.toString();
          firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier1)
            .then(async confirmationResult => {
              load.dismiss()
              const alert = await this.alertCtrl.create({
                header: 'Ingresar código',
                inputs: [{ name: 'confirmationCode', placeholder: 'Código' }],
                backdropDismiss: false,
                buttons: [
                  {
                    text: 'Cancelar',
                    handler: data => { console.log('Cancel clicked'); }
                  },
                  {
                    text: 'Enviar',
                    handler: data => {
                      this.Alerts_Service.load('Registrando Usuario').then(cargar => {
                        confirmationResult.confirm(data.confirmationCode)
                          .then((result) => {
                            //this.Alerts_Service.load('Registrando Usuario').then(cargar => {
                           // this.fcm.getToken().then(token => {
                             let token = 's123sadkjan'
                              this.Register_Service.crearcontel(result.user.uid, this.email, this.pin, this.nombre, codtel, phoneNumber1, this.cajainterna, token, this.estado, this.contacts, this.img)
                              this.Alerts_Service.creocorrecto();
                              this.router.navigate(['/tabs/tab1']);
                              cargar.dismiss()
                            }).catch(err => {
                              cargar.dismiss()
                              this.Alerts_Service.codigoinvalido()
                            })
                            // })

                          //}).catch((error) => {
                          //  this.Alerts_Service.codigoinvalido()
                          //  cargar.dismiss()
                          //})
                      }).catch(err => {
                        console.log('error en enviar el sms' + err);
                        load.dismiss()
                      })
                    }
                  }
                ]
              });
              alert.present();
            })
            .catch(error => {
              this.Alerts_Service.noenviosms(error)
              load.dismiss()
            });
        }
      })
    }).catch(err => {
      alert('error de logueo' + err)
    })
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }



  //Validators
  registrationForm = this.formBuilder.group({
    phone: [
      '',
      [
        Validators.required,
        Validators.pattern("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$")
      ]
    ],
    code: [
      '',
      [
        Validators.required,
        Validators.pattern("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$")
      ]
    ]
  });


  get phone() {
    return this.registrationForm.get('phone');
  }
  get code() {
    return this.registrationForm.get('code');
  }


  public errorMessages = {
    phone: [
      { type: 'required', message: 'El número de telefono es obligatorio' },
      { type: 'pattern', message: 'Por favor, ingrese un número valido' }
    ],
    code: [
      { type: 'required', message: 'El código de país es obligatorio' },
      { type: 'pattern', message: 'Por favor, ingrese un código valido' }
    ]
  };

}
