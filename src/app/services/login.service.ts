import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

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


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(public fire: AngularFirestore,
    private db: AngularFireAuth,
    private route: Router) { }


  cerrarsesion() {
    this.db.signOut().then(() => {
      this.route.navigate(['/login']);
    });
  }
  //verifica si el usuario existe 
  verificausuarioexistente(telefono): Observable<any> {
    var query = ref => ref.where('telefono', '==', telefono)
    return this.fire.collection('user', query).valueChanges()
  }
  //actualiza token
  actualizatoken(token, id) {
    return this.fire.collection('user').doc(id).set(token, { merge: true })
  }
  recuperaundato(usu_id: string): Observable<any> {
    return this.fire.collection('user').doc(usu_id).valueChanges()
  }

  //para recuperar el logueado
  recuperaid(){
    return this.db.currentUser.then(res =>{
      var uid
      if (res != null) {
        uid = res.uid;
        return uid;
      }
    })
  }

}
