import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GetPedidosPage } from './get-pedidos';

@NgModule({
  declarations: [
    GetPedidosPage,
  ],
  imports: [
    IonicPageModule.forChild(GetPedidosPage),
  ],
})
export class GetPedidosPageModule {}
