import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Contacts, Contact } from '@ionic-native/contacts/ngx';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface contactos {
  id: string
  nombre: string
  key:string
  value:string
}

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private contactos: Contacts,
    private fire: AngularFirestore) { }

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



  codigo(num) {
    let nuevo = num.replace("+591", "").trim()
    return nuevo
  }

  actualizarcontacts(contacts, id) {
    return this.fire.collection('user').doc(id).set(contacts, { merge: true })
  }

  Recupera_Contactos(uid:string) {
    return this.fire.collection('/user/'+uid+'/contactostext').snapshotChanges().pipe(map(dat => {
      return dat.map(a => {
        const data = a.payload.doc.data() as contactos;
        data.id = a.payload.doc.id;
        return data;
      })
    }))
  }

  deletecontact(id,uid): Promise <void> {
    return this.fire.collection('/user/'+id+'/contactostext').doc(uid).delete()
   }

  Ordenar_Json(data, key, orden) {
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

  //recupera usuario por numero
  Usuario_App(numero): Observable<any> {
    var query = ref => ref.where('telefono', '==', numero)
    return this.fire.collection('user', query).valueChanges()
  }

}
