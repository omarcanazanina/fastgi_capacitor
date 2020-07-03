import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(private router: Router,
    public menuCtrl: MenuController) { }

  ngOnInit() {
  }


  loadMoney() {
    const monto = 0
    this.router.navigate(['/load-money', monto])
    this.menuCtrl.toggle()
  }
  removeMoney() {
    this.router.navigate(['/remove-money'])
    this.menuCtrl.toggle()
  }
  pin() {
    this.router.navigate(['/pin'])
    this.menuCtrl.toggle()
  }
  amount() {
    this.router.navigate(['/amount'])
    this.menuCtrl.toggle()
  }

}
