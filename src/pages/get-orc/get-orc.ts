import { PedidoPage } from './../pedido/pedido';
import { OrcamentoPage } from './../orcamento/orcamento';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import {ServiceProvider} from '../../providers/service/service';
import{ViewOrcsPage} from '../view-orcs/view-orcs';

@Component({
  selector: 'page-get-orc',
  templateUrl: 'get-orc.html',
})
export class GetOrcPage {
  orcs:any;
  solics:any;


  para:any;
  pedidos:any;
  pedidosa:any;
  pedidosr:any;


dadosUser:any;

  constructor(public modalCtrl: ModalController, public service : ServiceProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.dadosUser = JSON.parse(localStorage.getItem('userData'));
    console.log(this.dadosUser[0]);
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GetOrcPage');
  }
  getOrc(){
    this.service.getOrc(this.dadosUser[0].id_usuario).subscribe((data)=>{
      this.orcs = data;
console.log(data);
    },(erro)=>{
      console.log(erro);
    });

  }
  getSol(){

    this.service.getSol(this.dadosUser[0].id_usuario).subscribe((data)=>{
      this.solics = data;
console.log(data);
    },(erro)=>{
      console.log(erro);
    });


  }
  openOrc(item){
        console.log(item);
  this.navCtrl.push(ViewOrcsPage,  {item: item});
  }


  getpedidos(){
    
           this.service.getped(this.dadosUser[0].id_usuario).then((data)=>{
           this.pedidos = data;
           console.log(data);
           })
    
  }

  openPedido(item){
    let modal = this.modalCtrl.create(PedidoPage, {ct: item});
    modal.onDidDismiss(data => {
    });
    modal.present();
  
  }

  getAllOrc(){
    this.para = {user:this.dadosUser[0].id_usuario};
    this.service.getOrcamentos(this.para).then((data)=>{
      console.log(data);
      this.pedidos = data;
  
    })


}

getOrcAber(){
  this.para = {user:this.dadosUser[0].id_usuario};
  this.service.getOrcamentosAber(this.para).then((data)=>{
    console.log(data);
    this.pedidosa = data;

  })


}

getOrcRes(){
  this.para = {user:this.dadosUser[0].id_usuario};
  this.service.getOrcamentosResp(this.para).then((data)=>{
    console.log(data);
    this.pedidosr = data;

  })


}



viewSolic(item){
  let modal = this.modalCtrl.create(OrcamentoPage, {ct: item});
  modal.onDidDismiss(data => {
  });
  modal.present();


}



}
