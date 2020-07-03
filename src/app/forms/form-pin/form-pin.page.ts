import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { TabsService } from 'src/app/services/tabs.service';
import { PerfilService } from 'src/app/services/perfil.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { NavController } from '@ionic/angular';
//Validators
import { FormBuilder, Validators } from "@angular/forms";
import { MustMatch } from "../../_helpers/must-match.validator";
@Component({
  selector: 'app-form-pin',
  templateUrl: './form-pin.page.html',
  styleUrls: ['./form-pin.page.scss'],
})
export class FormPinPage implements OnInit {

  constructor(private Login_Service: LoginService,
    private Tabs_Service: TabsService,
    private Perfil_Service: PerfilService,
    private Alert_Service: AlertsService,
    private navCtrl: NavController,
    //Validators
    private formBuilder: FormBuilder,) { }

  usuario: any = []
  ngOnInit() {
    this.Login_Service.recuperaid().then(res => {
      this.Tabs_Service.recuperaundato(res).subscribe(usu => {
        this.usuario = usu;
      })
    })
  }

 public submit() {
    console.log(this.registrationForm.value);
    if (this.registrationForm.value.currentPin == this.usuario.password) {
      if (this.registrationForm.value.newPin == this.registrationForm.value.pinConfirm) {
        this.Perfil_Service.actualizapin({ password: this.registrationForm.value.newPin }, this.usuario.uid).then(res => {
          this.Alert_Service.ModificoDato()
          this.navCtrl.back()
        })
      } else {
        this.Alert_Service.ingresoinvalido()
      }
    } else {
      this.Alert_Service.ingresoinvalido()
    }
  }

  //Validators
  registrationForm = this.formBuilder.group({
    currentPin: [
      '',
      [
        Validators.required,
        Validators.pattern("^[0-9]{4}$")

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
      validator: MustMatch('newPin', 'pinConfirm')
    }
  );



  get currentPin() {
    return this.registrationForm.get('currentPin');
  }
  get newPin() {
    return this.registrationForm.get('newPin');
  }
  get pinConfirm() {
    return this.registrationForm.get('pinConfirm');
  }

  public errorMessages = {
    currentPin: [
      { type: 'required', message: 'El PIN es obligatorio' },
      {
        type: 'minlength',
        message: 'El PIN debe contener 4 dígitos'
      },
      {
        type: 'maxlength',
        message: 'El PIN debe contener 4 dígitos'
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
