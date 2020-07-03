
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
//import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Brightness } from '@ionic-native/brightness/ngx';
import * as QRCode from 'easyqrcodejs';
import { LoginService } from 'src/app/services/login.service';
import { TabsService } from 'src/app/services/tabs.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-charge-money',
  templateUrl: './charge-money.page.html',
  styleUrls: ['./charge-money.page.scss'],
})
export class ChargeMoneyPage implements OnInit, AfterViewInit {
  usuario = {
    cajainterna: "",
    correo: "",
    telefono: "",
    password: "",
    monto: "",
    nombre: "",
    uid: "",
    pass: "",
    estado: "",
    token: "",
    contacts: ""
  }
  //monto para generar
  montorecibido: any
  qr:any
  constructor(
    //private socialSharing: SocialSharing,
    private brightness: Brightness,
    private Login_Service: LoginService,
    private Tabs_Service: TabsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.montorecibido = this.activatedRoute.snapshot.paramMap.get('dato1')
    if(this.montorecibido == ""){
     // console.log('el monto es vacio');
    }else{
     // console.log('con monto'+this.montorecibido);
      
    }
  }

  ngOnInit() {
    this.brightness.setBrightness(1);


  }
  @ViewChild('qrcode', { static: false }) qrcode: ElementRef;

  ngAfterViewInit() {
    this.Login_Service.recuperaid().then(res => {
      let dat = this.Tabs_Service.recuperaundato(res).subscribe(usu => {
        this.usuario = usu;
        console.log(this.usuario.telefono);
        if(this.montorecibido == ""){
          this.qr=this.usuario.telefono
        }else{
          this.qr =this.montorecibido+'/'+this.usuario.telefono
        }

        var options = {
          dotScale: 1,
          text: this.qr,
          logo: "/assets/fastgi.svg",
          logoWidth: 100,
          logoHeight: 100,
          logoBackgroundColor: 'rgba(255, 255, 255, 0.3)',
          logoBackgroundTransparent: false,
          //Border
          quietZone: 15,
          quietZoneColor: '#ffffff',
    
          // ====== Title
          title: 'Fastgi QR', 
          titleFont: "bold 16px Arial", 
          titleColor: "#000", 
          titleBackgroundColor: "#fff", 
          titleHeight: 20, 
          titleTop: 12, 
    
          // ====== SubTitle
          // subTitle: 'Sub título', 
          // subTitleFont: "14px Arial", 
          // subTitleColor: "#000",
          // subTitleTop: 40,
        }

        // Create new QRCode Object
        new QRCode(this.qrcode.nativeElement, options);
        dat.unsubscribe()
      })
    })
  }

  onShare() {
    var imag = document.querySelectorAll('img')[0];
    //console.log(imag.src)
    //capacitor
  //  this.socialSharing.share(null, 'MyQR', imag.src, null)
  }

  //Brightness 100%
  ionViewWillEnter(){
    this.brightness.setBrightness(1);
  }
  //Brightness Default System
  ionViewDidLeave(){
    this.brightness.setBrightness(-1)
  }

  monto() {
    this.router.navigate(['/amount', this.usuario.uid, this.usuario.telefono, 'generarcodigo'])
  }
}
