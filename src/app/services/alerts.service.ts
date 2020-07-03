import { Injectable } from '@angular/core';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(private loadingController: LoadingController,
    public alertController: AlertController,
    private router: Router,
    public toastController: ToastController,) { }

  //usuario existente
  async usuarioyaexiste() {
    const alert = await this.alertController.create({
      header: 'Error de ingreso',
      message: 'El número ya fue registrado.',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ingresar',
          handler: () => {
            this.router.navigate(['/login'])
          }
        }
      ]
    });
    await alert.present();
  }

  async loadinginicio() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    return loading
  }
  //usuario se registro correcto
  async creocorrecto() {
    const alert = await this.alertController.create({
      header: 'Éxito',
      // subHeader: 'Envio Exitoso',
      message: 'Registro exitoso.',
      backdropDismiss: false,
      buttons: ['Aceptar']
    });
    await alert.present();
  }
  // sms incorrecto
  async codigoinvalido() {
    const alert = await this.alertController.create({
      //header: 'Error',
      // subHeader: 'Envio Exitoso',
      message: 'Código incorrecto.',
      backdropDismiss: false,
      buttons: ['Aceptar']

    });
    await alert.present();
  }
  //no envio sms
  async noenviosms(error) {
    const alert = await this.alertController.create({
      header: error,
      // subHeader: 'Envio Exitoso',
      message: 'Intente nuevamente por favor.',
      backdropDismiss: false,
      buttons: ['Aceptar']

    });
    await alert.present();
  }
  async usuarionoexiste() {
    const alert = await this.alertController.create({
      header: 'Error de ingreso',
      message: 'EL número no está registrado.',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Registrarse',
          handler: () => {
            this.router.navigate(['/register'])
          }
        }
      ]
    });
    await alert.present();
  }

  //tarjeta registrada
  async creotarjeta() {
    const alert = await this.alertController.create({
      header: 'Éxito',
      // subHeader: 'Envio Exitoso',
      message: 'La tarjeta se registró correctamente.',
      backdropDismiss: false,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  //tarjeta eliminada
  async eliminotarjeta() {
    const alert = await this.alertController.create({
      header: 'Éxito',
      // subHeader: 'Envio Exitoso',
      message: 'La tarjeta se eliminó correctamente',
      backdropDismiss: false,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  //tarjeta registrada
  async cargocontarjeta(monto, tarjeta) {
    const alert = await this.alertController.create({
      header: 'Éxito',
      // subHeader: 'Envio Exitoso',
      message: '  La carga de ' + monto + ' BOB desde ' + tarjeta + ' fue exitosa.',
      backdropDismiss: false,
      buttons: ['Aceptar']
    });
    await alert.present();
  }
  //tarjeta registrada
  async ModificoTarjeta() {
    const alert = await this.alertController.create({
      header: 'Éxito',
      // subHeader: 'Envio Exitoso',
      message: 'La tarjeta se modificó correctamente.',
      backdropDismiss: false,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  async ahorroinsuficiente(ruta) {
    const alert = await this.alertController.create({
      header: 'Error de saldo',
      message: 'Su ahorro es insuficiente, verifique los datos.',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Carga saldo',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.router.navigate(ruta)
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    })
    await alert.present();
  }
  async ingresoinvalido() {
    const alert = await this.alertController.create({
      header: 'Ingreso invalido',
      // subHeader: 'Envio Exitoso',
      message: 'Revise sus datos por favor.',
      backdropDismiss: false,
      buttons: ['Aceptar']
    });
    await alert.present();
  }
  //realizo transferencia correctamente
  async transexitoso(monto, usu) {
    const alert = await this.alertController.create({
      header: 'Éxito',
      // subHeader: 'Envio Exitoso',
      message: 'La transferencia de ' + monto + '  BOB a ' + usu + ' se realizó con éxito.',
      buttons: ['Aceptar']
    });
    await alert.present();
  }
  //pin incorrecto (pagar un cobro)
  async passincorrecta() {
    const alert = await this.alertController.create({
      //header: 'Atención',
      message: 'PIN incorrecto.',
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  // confirmacion de envio de cobro
  async enviocobro(monto, usu) {
    const alert = await this.alertController.create({
      header: 'Éxito',
      // subHeader: 'Envio Exitoso',
      message: 'La petición de pago de ' + monto + ' BOB a ' + usu + ' fue enviada correctamente.',
      backdropDismiss: false,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  async pagodecobroexitoso(monto, usu) {
    const toast = await this.toastController.create({
      header: 'Éxito',
      message: 'El pago de ' + monto + ' BOB a ' + usu + ' se realizó con correctamente.',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  //modifica dato de perfil
  async ModificoDato() {
    const alert = await this.alertController.create({
      header: 'FASTGI',
      // subHeader: 'Envio Exitoso',
      message: 'Modificación exitosa',
      backdropDismiss: false,
      buttons: ['Aceptar']
    });
    await alert.present();
  }
  //alertas actualizo contactos
  async updatecontacts() {
    const toast = await this.toastController.create({
      message: 'Se actualizó tu lista de contactos.',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
  async load(message) {
    const loading = await this.loadingController.create({
      message: message,
    });
    await loading.present();
    return loading
  }
}
