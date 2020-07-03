import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Contacts, Contact } from '@ionic-native/contacts/ngx';
import { map } from 'rxjs/operators';
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
export class TabsService {

  
  constructor(private fire: AngularFirestore,
    private contactos: Contacts) { }

  recuperaundato(usu_id: string): Observable<any> {
    return this.fire.collection('user').doc(usu_id).valueChanges()
  }

  //recuperar todos los contactos
  guardarcontactos(id_usuario) {  
    let options = {
      filter: '',
      multiple: true,
      hasPhoneNumber: true
    }
    this.contactos.find(['*'], options).then((contactos: Contact[]) => {
      const aux: any = []
      for (let item of contactos) {
        aux.push({ 'nombre': item.name.formatted, 'telefono': this.codigo(item.phoneNumbers[0].value) })
      }
      this.fire.collection('/user/' + id_usuario + '/contactostext').add({
        key: 'contactstext',
        value: JSON.stringify({
          todo: aux
        })
      })

    })
  }

  //eliminar codigo +591
  codigo(num) {
    let nuevo = num.replace("+591", "").trim()
    return nuevo
  }
  //actualiza el estado 
  actualizarcontacts(contacts, id) {
    return this.fire.collection('user').doc(id).set(contacts, { merge: true })
  }
  
}
