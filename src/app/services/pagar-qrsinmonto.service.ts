import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PagarQRsinmontoService {

  constructor(public fire: AngularFirestore, ) { }

  //actualiza cajainterna del usuario
  actualizacaja(cajainterna, id) {
    return this.fire.collection('user').doc(id).set(cajainterna, { merge: true })
  }

}
