import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { TransferenciasService } from '../services/transferencias.service';

@Component({
  selector: 'app-single-contact',
  templateUrl: './single-contact.page.html',
  styleUrls: ['./single-contact.page.scss'],
})
export class SingleContactPage implements OnInit {
  idususario
  telefono
  nombre
  usuario: any = []
  contacto: any = []
  lista: any = []
  constructor(private activatedRoute: ActivatedRoute,
    private Login_Service: LoginService,
    private Transferencias_Service: TransferenciasService,
    private router: Router) {

    this.nombre = this.activatedRoute.snapshot.paramMap.get('nombre')
    this.telefono = this.activatedRoute.snapshot.paramMap.get('telefono')

  }

  ngOnInit() {
    this.Login_Service.recuperaid().then(res => {
      this.Login_Service.recuperaundato(res).subscribe(usu => {
        this.usuario = usu;
        this.Login_Service.verificausuarioexistente(this.telefono).subscribe(res => {
          this.contacto = res[0]
          this.Transferencias_Service.recuperacobrostransferencias(this.contacto.uid, this.usuario.uid).subscribe(datos => {
            this.lista = this.Transferencias_Service.ordenarjson(datos, 'fecha', 'desc')
          })
        })
      })
    })
  }

  transferir() {
    const control = 'transferir'
    this.router.navigate(['/amount', this.nombre, this.telefono, control])
  }

  cobro() {
    const control = 'cobrar'
    this.router.navigate(['/amount', this.nombre, this.telefono, control])
  }

  pagarcobro(item) {
    const control = 'pagarcobro'
    this.router.navigate(['/pin', item.id, this.telefono, control,item.monto])
  }
}
