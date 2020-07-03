import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { TabsService } from '../services/tabs.service';
import { HistorialService } from '../services/historial.service';
import { AlertController, ModalController } from '@ionic/angular';
import { DetallePage } from '../modals/detalle/detalle.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private Login_Service: LoginService,
    private Tabs_Service: TabsService, 
    private Historial_Service:HistorialService,
    private modal:ModalController) { }
  usuario: any = []
  img_perfil
  control_ingreso = 0
  lista_ingresos
  lista_egresos
  ingresos_egresos: any = []
  ingresos_egresos_ordenados:any=[]

  ngOnInit() {
    this.Login_Service.recuperaid().then(res => {
      this.Tabs_Service.recuperaundato(res).subscribe(datosusuario => {
        this.usuario = datosusuario;
        this.img_perfil = this.usuario.img
        //console.log(this.usuario);
       let subs= this.Historial_Service.ordenaringresos(this.usuario.uid).subscribe(ingresos => {
          this.lista_ingresos = ingresos;
          //console.log(this.lista_ingresos);
          this.control_ingreso = 0;
        
        let subs1=this.Historial_Service.ordenaregresos(this.usuario.uid).subscribe(egresos => {
          this.lista_egresos = egresos;
         // console.log(this.lista_egresos);
         this.ingresos_egresos = [].concat(this.lista_ingresos, this.lista_egresos);
         this.ingresos_egresos_ordenados = this.Historial_Service.ordenarjson(this.ingresos_egresos, 'fecha', 'desc')
         console.log(this.ingresos_egresos_ordenados);
         subs1.unsubscribe()
         })
         subs.unsubscribe()
        })
      })
    })
  }

  async detalle(item){
    const modal = await this.modal.create({
      component:DetallePage,
      cssClass: 'detalle',
      componentProps:{
        transaccion:item

      }
    })
    await modal.present()
  }



}
