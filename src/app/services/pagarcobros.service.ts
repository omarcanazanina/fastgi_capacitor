import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface cobros {
  id: string,
  clave: string,
  dato: string,
  estado: number,
  fecha: Date,
  fechita: string,
  formatted:string,
  monto:string,
  telefono:string
}
@Injectable({
  providedIn: 'root'
})
export class PagarcobrosService {

  constructor(public fire: AngularFirestore) { }

  //recupera enviocobros
  recuperaenviocobros( iddestinatario,idusuario, fechita): Observable<any> {
    var query = ref => ref.where('clave', '==', iddestinatario).where('fechita', '==', fechita)
    return this.fire.collection('/user/' + idusuario + '/cobrostransferencias', query).snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as cobros;
        data.id = a.payload.doc.id;
        return data;
      })
    }))
  }



  //recpera un cobro
  recuperacobro(id: string, uid: string): Observable<any> {
    return this.fire.collection('/user/' + id + '/cobrostransferencias').doc(uid).valueChanges()
  }

  //actualiza el estado de enviocobro *pagarenviocobro*
  agregafechapagocobros(fecha, id, id1) {
    return this.fire.collection('/user/' + id + '/cobrostransferencias').doc(id1).set(fecha, { merge: true })
  }

 //actualiza el estado de cobrosapagar *pagarenviocobro*
 actualizaestadodecobro(estado, id, id1) {
  return this.fire.collection('/user/' + id + '/cobrostransferencias').doc(id1).set(estado, { merge: true })
}

 //actualiza cajainterna del usuario
 actualizacaja(cajainterna, id) {
  return this.fire.collection('user').doc(id).set(cajainterna, { merge: true })
}

}
