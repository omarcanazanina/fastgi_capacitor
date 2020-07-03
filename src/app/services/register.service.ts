import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(public fire: AngularFirestore) { }

  //metodo para el registro
  crearcontel(uid: string, correo: string, password: number, nombre: string, codtel: string, telefono: string, cajainterna: number, token: string, estado: number,contacts:string,img: string) {
    this.fire.collection('user').doc(uid).set({
      uid: uid,
      correo: correo,
      nombre: nombre,
      codtel: codtel,
      telefono: telefono,
      cajainterna: cajainterna,
      token: token,
      password: password,
      estado: estado,
      contacts: contacts,
      img:img
    })
  }

}
