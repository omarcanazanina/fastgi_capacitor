import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { TabsService } from 'src/app/services/tabs.service';
import { TransferenciasService } from 'src/app/services/transferencias.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
//Validators
import { FormBuilder, Validators } from "@angular/forms";
import { MustMatch } from "../../_helpers/must-match.validator";
@Component({
  selector: 'app-form-add-pin',
  templateUrl: './form-add-pin.page.html',
  styleUrls: ['./form-add-pin.page.scss'],
})
export class FormAddPinPage implements OnInit {
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
  constructor(private Login_Service: LoginService,
    private Tabs_Service: TabsService,
    private Transferencias_Service: TransferenciasService,
    private Alert_Service: AlertsService,
    private nctrl: NavController,
    //Validators
    private formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.Login_Service.recuperaid().then(res => {
      let primer = this.Tabs_Service.recuperaundato(res).subscribe(usu => {
        this.usuario = usu;
        console.log(this.usuario);
        primer.unsubscribe()
      })
    })
  }

  submit() {
    this.Alert_Service.load('Guardando datos').then(load=>{
    console.log(this.registrationForm.value);
    if (this.registrationForm.value.newPin == this.registrationForm.value.pinConfirm) {
      this.Transferencias_Service.registrapin({ password: this.registrationForm.value.newPin }, this.usuario.uid);
      this.Transferencias_Service.registracorreo({ correo: this.registrationForm.value.email }, this.usuario.uid);
      this.Transferencias_Service.datosgmail(this.registrationForm.value.newPin, this.registrationForm.value.email, this.usuario.telefono);
      this.nctrl.back()
      load.dismiss()
    } else {
      this.Alert_Service.ingresoinvalido()
      load.dismiss()
    }
  }).catch(err =>{
    alert('error'+err)
  })
  }


  //Validators
  registrationForm = this.formBuilder.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email,
      ]
    ],
    newPin: [
      '',
      [
        Validators.required,
        Validators.pattern("^[0-9]{4}$"),
        Validators.minLength(4),
        Validators.maxLength(4),
      ]
    ],
    pinConfirm: [
      '',
      [
        Validators.required,
        Validators.pattern("^[0-9]{4}$"),
        Validators.minLength(4),
        Validators.maxLength(4),
      ]
    ]
  },
    {
      validator: MustMatch('newPin', 'pinConfirm'),
    }
  );

  

  get email() {
    return this.registrationForm.get('email');
  }
  get newPin() {
    return this.registrationForm.get('newPin');
  }
  get pinConfirm() {
    return this.registrationForm.get('pinConfirm');
  }




  public errorMessages = {

    email: [
      { type: 'required', message: 'El correo es obligatorio' },
      {
        type: 'email',
        message: 'Correo invalido'
      }
    ],

    newPin: [
      { type: 'required', message: 'El nuevo PIN es obligatorio' },
      {
        type: 'minlength',
        message: 'El nuevo PIN debe contener 4 dígitos'
      },
      {
        type: 'maxlength',
        message: 'El nuevo PIN debe contener 4 dígitos'
      }
    ],
    pinConfirm: [
      { type: 'required', message: 'El PIN de confirmación es obligatorio' },
      {
        type: 'mustMatch',
        message: 'Los PIN no son iguales'
      },
      {
        type: 'minlength',
        message: 'El PIN de confirmación debe contener 4 dígitos'
      },
      {
        type: 'maxlength',
        message: 'El PIN de confirmación debe contener 4 dígitos'
      }
    ],
  };
}
