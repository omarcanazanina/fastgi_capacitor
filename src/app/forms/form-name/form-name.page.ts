import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//Validators
import { FormBuilder, Validators } from "@angular/forms";
import { LoginService } from 'src/app/services/login.service';
import { Subscription } from 'rxjs';
import { TabsService } from 'src/app/services/tabs.service';
import { PerfilService } from 'src/app/services/perfil.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-form-name',
  templateUrl: './form-name.page.html',
  styleUrls: ['./form-name.page.scss'],
})
export class FormNamePage implements OnInit {



  constructor(private activatedRoute: ActivatedRoute,
    private Login_Service: LoginService,
    private Tabs_Service: TabsService,
    private Perfil_Service: PerfilService,
    private Alert_Service: AlertsService,
    private navCtrl: NavController,
    //Validators
    private formBuilder: FormBuilder,
  ) { }
  usuario: any = []
  nombreusu: string
  listado: Subscription
  ngOnInit() {
    this.nombreusu = this.activatedRoute.snapshot.paramMap.get('nombre')
    //console.log(this.nombre);
    this.Login_Service.recuperaid().then(res => {
      this.listado = this.Tabs_Service.recuperaundato(res).subscribe(usu => {
        this.usuario = usu;
        console.log(this.usuario);

        this.listado.unsubscribe()
      })
    })

  }

  public submit() {
    this.Alert_Service.load('Modificando nombre').then(load =>{
      this.Perfil_Service.actualizanombre(this.usuario.uid, this.registrationForm.value).then(() => {
        this.Alert_Service.ModificoDato()
        this.navCtrl.back()
        load.dismiss()
      }).catch(err =>{
        alert('error'+err)
        load.dismiss()
      })
    })
  }



  //Validators
  registrationForm = this.formBuilder.group({
    nombre: [
      '',
      [
        Validators.required,
        //Validators.pattern("^[a-z0-9_-]{3,20}$"),
        Validators.maxLength(20),
        Validators.minLength(3)
      ]
    ]
  });

  public submit1() {
    console.log(this.registrationForm.value);
  }
  get nombre() {
    return this.registrationForm.get('nombre');
  }

  public errorMessages = {
    nombre: [
      { type: 'required', message: 'El nombre es obligatorio' },
      {
        type: 'pattern',
        message: 'Solo se permiten letras o números'
      },
      {
        type: 'maxlength',
        message: 'El nombre no debe contener mas de 20 caracteres'
      },
      {
        type: 'minlength',
        message: 'El nombre no debe contener menos de 3 caracteres'
      }

    ]
  };

}
