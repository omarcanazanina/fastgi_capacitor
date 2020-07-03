import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { LoginService } from '../services/login.service';
import { AlertController } from '@ionic/angular';
//import { FCM } from '@ionic-native/fcm/ngx';
import { AlertsService } from '../services/alerts.service';
import { MenuController } from '@ionic/angular';
//Validators
import { FormBuilder, Validators } from "@angular/forms";
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public recaptchaVerifier: firebase.auth.RecaptchaVerifier;

  constructor(private router: Router,
    private Login_Service: LoginService,
    public alertCtrl: AlertController,
    //private fcm: FCM,
    private Alert_Service: AlertsService,
    public menuCtrl: MenuController,
    //Validators
    private formBuilder: FormBuilder,
  ) { }

  //variables para el logueo
  usuario = {
    uid: ""
  }
  existe: any

  ngOnInit() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible'
    })
  }

  //logueo
  public submit() {
    let codtel = this.registrationForm.value.code;
    let phoneNumber = this.registrationForm.value.phone
    this.Alert_Service.load('Cargando').then(load => {
      let subs = this.Login_Service.verificausuarioexistente(phoneNumber.toString())
        .subscribe(resul => {
          this.existe = resul
          // subs.unsubscribe();
          if (this.existe == '') {
            this.Alert_Service.usuarionoexiste()
            load.dismiss()
          } else {
            const appVerifier = this.recaptchaVerifier;
            const phoneNumberString = codtel + phoneNumber.toString();
            firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
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
                        this.Alert_Service.load('Iniciando Sesión').then(cargar => {
                          confirmationResult.confirm(data.confirmationCode).then((result) => {
                           // this.fcm.getToken().then(t => {
                             let t = '123sda'
                              this.Login_Service.actualizatoken({ token: t }, result.user.uid).then(() => {
                                this.Login_Service.recuperaundato(result.user.uid).subscribe(usuario => {
                                  this.usuario = usuario;
                                  this.router.navigate(["/tabs/tab1"])
                                  cargar.dismiss()
                                })
                              }).catch(error => {
                              }).catch(err => {
                                cargar.dismiss()
                                this.Alert_Service.codigoinvalido()
                              })
                            //}).catch(err => {
                           // })
                          }).catch((error) => {
                            this.Alert_Service.codigoinvalido()
                            load.dismiss()
                          })
                        }).catch(err => {
                          console.log('error' + err)
                          load.dismiss()
                        })
                      }
                    }
                  ]
                });
                alert.present();
              })
              .catch(error => {
                this.Alert_Service.noenviosms(error)
                load.dismiss()
              });
          }
          subs.unsubscribe()
        })
    }).catch(err => {
      alert('error de logueo' + err)
    })
  }

  registro() {
    this.router.navigate(['/register'])
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
