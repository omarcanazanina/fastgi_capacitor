import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Subscription } from 'rxjs';
import { TabsService } from '../services/tabs.service';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PerfilService } from '../services/perfil.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(private Login_Service: LoginService,
    private Tabs_Service: TabsService,
    public alertController: AlertController,
    private router: Router,
    private Perfil_Service: PerfilService,
    private actionSheetController: ActionSheetController, ) { }

  darkMode: boolean = true;
  //datos del usuario
  usuario: any = []
  //imagen
  imm: any
  urlfinal: any
  ngOnInit() {
    this.darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.Login_Service.recuperaid().then(res => {
      this.Tabs_Service.recuperaundato(res).subscribe(usu => {
        this.usuario = usu;
        this.imm = this.usuario.img
      })
    })
  }

  changeTheme() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark');
  }

  editarnombre() {
    this.router.navigate(['/form-name', this.usuario.nombre])
  }

  editarcorreo() {
    this.router.navigate(['/form-mail', this.usuario.correo])
  }

  editarpin() {
    this.router.navigate(['/form-pin'])
  }
  async cerrarsesion() {
    const alert = await this.alertController.create({
      header: 'Fastgi',
      message: 'Esta seguro que desea cerrar sesión',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.Login_Service.cerrarsesion()
          }
        }
      ]
    });
    await alert.present();
  }

  galeria() {
  //  this.Perfil_Service.takeGalley().then(res => {
  //    let load = this.Perfil_Service.loading()
  //    this.Perfil_Service.uploadImgB64('user/' + this.usuario.telefono + 'galery.jpg', res).then(url => {
  //      this.urlfinal = url
  //      //this.au.reducirImagen(url).then( imgreducido =>{} )
  //      // this.perfil=1
  //      this.imm = this.Perfil_Service.actualizarimg({ img: url }, this.usuario.uid)
  //      load.then(loading => {
  //        loading.dismiss();
  //      })
  //    }).catch(err => alert('error de upload' + err))
  //  }).catch(err => alert(err))
  }

  camara() {
  //  this.Perfil_Service.takecamera().then(res => {
  //    let load = this.Perfil_Service.loading()
  //    this.Perfil_Service.uploadImgB64('user/' + this.usuario.telefono + 'camara.jpg', res).then(url => {
  //      this.urlfinal = url
  //      //this.perfil=1
  //      this.imm = this.Perfil_Service.actualizarimg({ img: url }, this.usuario.uid)
  //      load.then(loading => {
  //        loading.dismiss();
  //      })
  //    }).catch(err => alert('error de upload' + err))
  //  }).catch(err => alert(err))
  }

  eliminar() {
    //this.perfil = 0
    let url = 'https://firebasestorage.googleapis.com/v0/b/aplicacion-bdcf5.appspot.com/o/default.jpg?alt=media&token=a566c63e-e013-4a59-aefc-79610f1fa2b8'
    this.imm = this.Perfil_Service.actualizarimg({ img: url }, this.usuario.uid)
  }



  async funciones() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Foto de perfil',
      buttons: [{
        text: 'Eliminar foto',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          // this.perfil = 0
          this.eliminar()
          console.log('Delete clicked');
        }
      }, {
        text: 'Camara',
        icon: 'camera',
        handler: () => {
          this.camara()
          console.log('Share clicked');
        }
      }, {
        text: 'Galeria',
        icon: 'image',
        handler: () => {
          this.galeria()
          console.log('Play clicked');
        }
      },]
    });
    await actionSheet.present();
  }

  photo(){
    this.Perfil_Service.photo().then(img =>{
      console.log(img);
    })
  }

}
