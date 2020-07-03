import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
//import { EmailComposer } from '@ionic-native/email-composer/ngx';


export interface ingresos {
  id: string,
  descripcion: string,
  fecha: string,
  monto: number,
  saldo: number,
  nombre: string
}
@Injectable({
  providedIn: 'root'
})
export class TransferenciasService {

  constructor( private fire: AngularFirestore,
    public alertController: AlertController,
   // private emailComposer: EmailComposer,
   ) { 

  }
   //actualiza cajainterna del usuario
   actualizacaja(cajainterna, id) {
    return this.fire.collection('user').doc(id).set(cajainterna, { merge: true })
  }
  //recupera las transferencias para meter en *pagarenviocobro* aun no usado
  recuperacobrostransferencias(idco, id): Observable<any> {
    var query = ref => ref.where('clave', '==', idco)
    return this.fire.collection('/user/' + id + '/cobrostransferencias', query).snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as ingresos;
        data.id = a.payload.doc.id;
        return data;
      })
    }))
  }
  //ordena cualquie json
  ordenarjson(data, key, orden) {
    return data.sort(function (a, b) {
      var x = a[key],
        y = b[key];
      if (orden === 'asc') {
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      }
      if (orden === 'desc') {
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
      }
    });
  }

  //para enviar el pin al correo
  async enviocorreo(idusuario, telefonousuario) {
    const alert = await this.alertController.create({
      header: 'Muy importante!',
      message: 'PIN para realizar transacciones, CORREO para guardar sus datos.',
      backdropDismiss: false,
      inputs: [
        {
          name: 'pin',
          type: 'number',
          placeholder: 'Pin'
        }, 
        {
          name: 'correo',
          type: 'text',
          placeholder: 'Correo'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Aceptar',
          handler: data => {
            console.log('Confirm Ok');
            this.registrapin({ password: data.pin }, idusuario);
            this.registracorreo({ correo: data.correo }, idusuario);
            this.datosgmail(data.pin, data.correo, telefonousuario)
          }
        }
      ]
    });
    await alert.present();
  }

    //regitra pin
    registrapin(pin, id) {
      return this.fire.collection('user').doc(id).set(pin, { merge: true })
    }

      //regitra correo
  registracorreo(correo, id) {
    return this.fire.collection('user').doc(id).set(correo, { merge: true })
  }

  async datosgmail(pin, correo, telefono) {
    const alert = await this.alertController.create({
      header: 'Fastgi',
      message: '<div> Por su seguridad y respaldo se enviara los datos a su correo <strong>' + correo + '</strong><br><br></div><table><tr><td><strong>Telefono:</strong></td><td>' + telefono + '</td></tr> <tr><td><strong>Correo:</strong></td><td>' + correo + '</td></tr><tr><td><strong>Pin:</strong></td><td>' + pin + '</td></tr></table>',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Enviar',
          handler: () => {
            let email = {
              to: correo,
              cc: [],
              bcc: [],
              attachments: [],
              subject: 'Fastgi',
              body: 'MUY IMPORTANTE, SE RECOMIENDA GUARDAR SUS DATOS <br><br>' + ' ' + '<strong>Telefono:</strong>' + ' ' + telefono + '<br> ' + '<strong>Correo:</strong>' + ' ' + correo + ' <br>' + '<strong>Pin:</strong>' + ' ' + pin,
              isHtml: true
              //app: 'Gmail'
            }
           // this.emailComposer.open(email);
            //modificar el estado
            //this.au.enviocorreo({ estado: 1 }, this.usuario.uid)
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }

}
