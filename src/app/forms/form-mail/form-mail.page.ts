import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { TabsService } from 'src/app/services/tabs.service';
import { Subscription } from 'rxjs';
import { PerfilService } from 'src/app/services/perfil.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { NavController } from '@ionic/angular';

//Validators
import { FormBuilder, Validators } from "@angular/forms";
import { MustMatch } from "../../_helpers/must-match.validator";
@Component({
  selector: 'app-form-mail',
  templateUrl: './form-mail.page.html',
  styleUrls: ['./form-mail.page.scss'],
})
export class FormMailPage implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private Login_Service: LoginService,
    private Tabs_Service: TabsService,
    private Perfil_Service: PerfilService,
    private Alert_Service: AlertsService,
    private navCtrl: NavController,
    //Validators
    private formBuilder: FormBuilder,
  ) { }
  correo: string
  listado: Subscription
  usuario: any = []
  ngOnInit() {
    this.correo = this.activatedRoute.snapshot.paramMap.get('correo');
    this.Login_Service.recuperaid().then(res => {
      this.listado = this.Tabs_Service.recuperaundato(res).subscribe(datosusuario => {
        this.usuario = datosusuario;
        this.listado.unsubscribe()
      })
    })
  }



  modificar(correo, confirmacorreo) {
    if (correo == confirmacorreo) {
      this.Perfil_Service.actualizacorreo({ correo: correo }, this.usuario.uid).then(res => {
        this.Alert_Service.ModificoDato()
        this.navCtrl.back()
      })
    } else {
      this.Alert_Service.ingresoinvalido()
    }
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
    emailConfirm: [
      '',
      [
        Validators.required,
        Validators.email,
      ]
    ]
  },
    {
      validator: MustMatch('email', 'emailConfirm')
    }
  );





  public submit() {
    console.log(this.registrationForm.value);
  }
  get email() {
    return this.registrationForm.get('email');
  }
  get emailConfirm() {
    return this.registrationForm.get('emailConfirm');
  }

  public errorMessages = {
    email: [
      { type: 'required', message: 'El correo es obligatorio' },
      {
        type: 'email',
        message: 'Correo invalido'
      }
    ],
    emailConfirm: [
      { type: 'required', message: 'El correo es obligatorio' },
      {
        type: 'email',
        message: 'Correo invalido'
      },
      {
        type: 'mustMatch',
        message: 'Los correos no son iguales'
      }
    ],
  };
}
