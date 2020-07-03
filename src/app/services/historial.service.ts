import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
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

export class HistorialService {
  ingresoscollection: AngularFirestoreCollection<ingresos>;
  ingresos: Observable<ingresos[]>;
  ingresosDoc: AngularFirestoreDocument<ingresos>;
  
  constructor(public fire: AngularFirestore,) { }

  //recupera lista de todos los ingresos
  ordenaringresos(id: string): Observable<any> {
    this.ingresoscollection = this.fire.collection('/user/' + id + '/ingresos/', x => x.orderBy('fecha', 'desc'));
    return this.ingresos = this.ingresoscollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as ingresos;
        data.id = a.payload.doc.id;
        return data;
      })
    }))
  }
  //recupera lista de todos los egresos
  ordenaregresos(id: string): Observable<any> {
    this.ingresoscollection = this.fire.collection('/user/' + id + '/egreso/', x => x.orderBy('fecha', 'desc'));
    return this.ingresos = this.ingresoscollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as ingresos;
        data.id = a.payload.doc.id;
        return data;
      })
    }))
  }

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
  

}
