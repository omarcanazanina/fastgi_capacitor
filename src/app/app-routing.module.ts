import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from '../app/guards/auth.guard';
import {NologinGuard} from '../app/guards/nologin.guard'

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),canActivate:[AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),canActivate:[NologinGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'pin/:dato1/:dato2/:control/:monto',
    loadChildren: () => import('./confirmation/pin/pin.module').then( m => m.PinPageModule)
  },
  {
    path: 'amount/:dato1/:dato2/:control',
    loadChildren: () => import('./confirmation/amount/amount.module').then( m => m.AmountPageModule)
  },
  {
    path: 'send-money',
    loadChildren: () => import('./send_charge/send-money/send-money.module').then( m => m.SendMoneyPageModule)
  },
  {
    path: 'charge-money/:dato1',
    loadChildren: () => import('./send_charge/charge-money/charge-money.module').then( m => m.ChargeMoneyPageModule)
  },
  {
    path: 'load-money/:monto',
    loadChildren: () => import('./saldo/load-money/load-money.module').then( m => m.LoadMoneyPageModule)
  },
  {
    path: 'remove-money',
    loadChildren: () => import('./saldo/remove-money/remove-money.module').then( m => m.RemoveMoneyPageModule)
  },
  {
    path: 'form-card',
    loadChildren: () => import('./forms/form-card/form-card.module').then( m => m.FormCardPageModule)
  },
  {
    path: 'single-contact/:nombre/:telefono',
    loadChildren: () => import('./single-contact/single-contact.module').then( m => m.SingleContactPageModule)
  },
  {
    path: 'form-name/:nombre',
    loadChildren: () => import('./forms/form-name/form-name.module').then( m => m.FormNamePageModule)
  },
  {
    path: 'form-phone',
    loadChildren: () => import('./forms/form-phone/form-phone.module').then( m => m.FormPhonePageModule)
  },
  {
    path: 'form-mail/:correo',
    loadChildren: () => import('./forms/form-mail/form-mail.module').then( m => m.FormMailPageModule)
  },
  {
    path: 'form-pin',
    loadChildren: () => import('./forms/form-pin/form-pin.module').then( m => m.FormPinPageModule)
  },
  {
    path: 'transaction-response',
    loadChildren: () => import('./send_charge/transaction-response/transaction-response.module').then( m => m.TransactionResponsePageModule)
  },
  {
    path: 'saldo-options',
    loadChildren: () => import('./saldo/saldo-options/saldo-options.module').then( m => m.SaldoOptionsPageModule)
  },
  {
    path: 'form-add-pin',
    loadChildren: () => import('./forms/form-add-pin/form-add-pin.module').then( m => m.FormAddPinPageModule)
  },



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
