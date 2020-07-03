import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  @Input() transaccion;
  constructor(private modal:ModalController) { }

  ngOnInit() {
    
    
  }

  closeUsuario(){
    this.modal.dismiss()
  }
}
