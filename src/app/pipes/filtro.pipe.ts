import { Pipe, PipeTransform } from '@angular/core';
import { Platform } from '@ionic/angular';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {
  constructor(){}
  transform(arreglo: any[], texto: string): any[] {
    if(texto ===''){
      return arreglo
    }
    texto=texto.toLowerCase()
        return arreglo.filter(item =>{
          //return item.name.formatted.toLowerCase()
          return item.nombre.toLowerCase()
                .includes(texto) 
        })
  } 

}
