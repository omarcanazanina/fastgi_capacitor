import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

export interface usu {
  cuenta: string;
  numerito: string,
  correo: string,
  nombre: string,
  id: string,
  telefono: string,
  cajabancaria: number,
  cajainterna: number,
  monto: number,
  clave: string,
  //  badge:number
}

export interface tarjetas {
  id?: string;
  name?: string;
  number?: string
  date?: string;
  code?: string
}

export interface datos {
  id?: string;
  name?: string;
  number?: string
  date?: string;
  code?: string
}

@Injectable({
  providedIn: 'root'
})
export class LoadMoneyService {

  id_cajaapp = 'ZRyippkKqJIiL1Ha5PR9';

  constructor(private fire: AngularFirestore,
    private alertController:AlertController) { }

  //recupera la caja de la aplicacion
  recuperacajaapp(): Observable<any> {
    return this.fire.collection('cajaapp').doc(this.id_cajaapp).valueChanges()
  }

  //para recuperar datos de la tarjeta
  recuperatarjeta(id: string) {
    return this.fire.collection('/user/' + id + '/tarjetas').snapshotChanges().pipe(map(dat => {
      return dat.map(a => {
        const data = a.payload.doc.data() as usu;
        data.id = a.payload.doc.id;
        return data;
      })
    }))
  }
  //actualiza la caja de la app
  actualizacajaapp(monto) {
    return this.fire.collection('cajaapp').doc(this.id_cajaapp).set(monto, { merge: true })
  }



  actualizaTarjeta(id:string,usuid:string,data:datos){
    //console.log(uid,data);
   // const aux = {empleado:{id:[]}} 
    return this.fire.collection('/user/' + usuid + '/tarjetas').doc(id).set(data,{ merge: true })
  }

  //actualiza cajainterna del usuario
  actualizacaja(cajainterna, id) {
    return this.fire.collection('user').doc(id).set(cajainterna, { merge: true })
  }
  //actualiza nombre dela tarjeta
  ActualizaNombre(nombre, usuid, idtarjeta) {
    return this.fire.collection('/user/' + usuid + '/tarjetas').doc(idtarjeta).set(nombre, { merge: true })
  }
  //actualiza numero dela tarjeta
  ActualizaNumero(numero, usuid, idtarjeta) {
    return this.fire.collection('/user/' + usuid + '/tarjetas').doc(idtarjeta).set(numero, { merge: true })
  }
  //actualiza vencimiento dela tarjeta
  ActualizaVencimiento(vencimiento, usuid, idtarjeta) {
    return this.fire.collection('/user/' + usuid + '/tarjetas').doc(idtarjeta).set(vencimiento, { merge: true })
  }
  
  EliminarTarjeta(usuid,idtarjeta){
    this.fire.collection('/user/' + usuid + '/tarjetas').doc(idtarjeta).delete().then(res=>{
      console.log('se borro la tarjeta');
    })
  } 

  async ConfirmaEliminacion(usuid,idtarjeta) {
    const alert = await this.alertController.create({
      header: 'Fastgi',
      message: 'Se eliminara la tarjeta seleccionada',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

            //this.route.navigate(ruta)
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.EliminarTarjeta(usuid,idtarjeta)
            console.log('Confirm Okay');
          }
        }
      ]
    })
    await alert.present();
  }


  //actualiza cvv dela tarjeta
  ActualizaCodigo(codigo, usuid, idtarjeta) {
    return this.fire.collection('/user/' + usuid + '/tarjetas').doc(idtarjeta).set(codigo, { merge: true })
  }
  //   //modificar tarjeta
  //  ModificarTarjeta(uid:string, nombre: string, numero: string, data:tarjetas){
  //  console.log(uid,data);
  // // return this.db.collection('/animales-linea/'+idlinea+'/productos/'+idproducto+'/detalle').doc(uid).set(data,{ merge: true })
  //}

}
