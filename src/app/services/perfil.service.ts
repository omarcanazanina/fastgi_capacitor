import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
//import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';
//capacitor
import { Plugins, CameraResultType } from '@capacitor/core';
const { Camera } = Plugins;

export interface Usuario {
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
export class PerfilService {

  constructor(public fire: AngularFirestore,
   // private camera: Camera,
    private afStorage: AngularFireStorage,
    private loadingController: LoadingController,) { }

 // //regitra o actualiza nombre 
 // actualizanombre1(nombre, id) {
 //   return this.fire.collection('user').doc(id).set(nombre, { merge: true })
 // }
//capacitor
async photo() {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Base64
  });

  // image.webPath will contain a path that can be set as an image src.
  // You can access the original file using image.path, which can be
  // passed to the Filesystem API to read the raw data of the image,
  // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
  let base64Image = 'data:image/jpeg;base64,' + image.base64String;
    //var imageUrl = image.webPath;
  // Can be set to the src of an image now
  return base64Image;
}




  //form
  actualizanombre(uid:string,data:Usuario){
   // console.log(uid,data);
   // const aux = {empleado:{id:[]}} 
    return this.fire.collection('user').doc(uid).set(data,{ merge: true })
  }

  //regitra o actualiza correo
  actualizacorreo(correo, id) {
    return this.fire.collection('user').doc(id).set(correo, { merge: true })
  }
  //regitra o actualiza pin
  actualizapin(password, id) {
    return this.fire.collection('user').doc(id).set(password, { merge: true })
  }

  takecamera() {
   //const options: CameraOptions = {
   //  quality: 100,
   //  destinationType: this.camera.DestinationType.DATA_URL,
   //  encodingType: this.camera.EncodingType.JPEG,
   //  mediaType: this.camera.MediaType.PICTURE
   //}
   //return this.camera.getPicture(options).then((imageData) => {
   //  // imageData is either a base64 encoded string or a file URI
   //  // If it's base64 (DATA_URL):
   //  let base64Image = 'data:image/jpeg;base64,' + imageData;
   //  return this.reducirImagen(base64Image).then(imgsmall => {
   //    return imgsmall
   //  })
   //});
  }
  takeGalley() {
  // const options: CameraOptions = {
  //   quality: 100,
  //   destinationType: this.camera.DestinationType.DATA_URL,
  //   encodingType: this.camera.EncodingType.JPEG,
  //   sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  //   mediaType: this.camera.MediaType.PICTURE
  // }

  // return this.camera.getPicture(options).then((imageData) => {
  //   // imageData is either a base64 encoded string or a file URI
  //   // If it's base64 (DATA_URL):
  //   let base64Image = 'data:image/jpeg;base64,' + imageData;
  //   return this.reducirImagen(base64Image).then(imgsmall => {
  //     return imgsmall
  //   })
  // });
  }

  // subir imagen base 64
  uploadImgB64(path: string, imageB64): Promise<any> {
    return new Promise((resolve, reject) => {
      let ref = this.afStorage.ref(path)
      let task = ref.putString(imageB64, 'data_url');
      task.snapshotChanges().pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe(data => {
            console.log(data);
            resolve(data)
          })
        })
      )
        .subscribe()
    });
  }

  async loading() {
    const loading = await this.loadingController.create({
      message: 'Espere por favor...',
      duration: 2000
    });
    await loading.present();
    return loading;
  }

  actualizarimg(image, id) {
    return this.fire.collection('user').doc(id).set(image, { merge: true })
  }

  //reducir imagen base64
  reducirImagen(base64) {
    return this.generateFromImage(base64, 500, 500, 1)
      .then(data => {
        //this.smallImg = data;
        //this.smallSize = this.getImageSize(this.smallImg);
        //return { base64: data, size: this.getImageSize(this.smallImg), blob: this.dataURLtoBlob(data) }
        //return this.dataURLtoBlob(data)
        return data
      });
  }

  //imagen resize
  private generateFromImage(img, MAX_WIDTH: number = 1025, MAX_HEIGHT: number = 1025, quality: number = 1): Promise<string> {
    return new Promise((resolve, reject) => {
      var canvas: any = document.createElement("canvas");
      var image = new Image();
      image.onload = () => {
        var width = image.width;
        var height = image.height;
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, width, height);
        // IMPORTANT: 'jpeg' NOT 'jpg'
        var dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl)
      }
      image.src = img;
    })
  }
}
