import { ChatPage } from './../chat/chat';
import { ServiceProvider } from './../../providers/service/service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { LocalizacaoPage } from '../localizacao/localizacao';
import { CallNumber } from '@ionic-native/call-number';

/**
 * Generated class for the PedidoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-pedido',
  templateUrl: 'pedido.html',
})
export class PedidoPage {
  fn: any;
  dadosUser: any;
  rate: any;
  chat: any;
  resultado: any;

  constructor(private callNumber: CallNumber, public service: ServiceProvider, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.fn = this.navParams.get('ct');
    this.getdados(this.fn.cod_usuario_solicitante);
    this.service.getMedia(this.fn.cod_usuario_solicitante).subscribe(data=>{
      this.rate = data[0].media;
    });
  }

  ionViewDidLoad() {
    console.log(this.fn);
  }

  close(){
    this.viewCtrl.dismiss();
  }

  openMap(item){
    this.navCtrl.push(LocalizacaoPage, {item: item});

  }

  openChat(item){

    this.chat = [
      {
        user1: this.fn.cod_fornecedor,
        user2: this.fn.cod_usuario_solicitante,
        nome: item.nome
      }
    ];
    console.log(this.chat);
  this.service.newChat(this.chat[0]).then((result)=>{
    this.resultado = result;
    if(this.resultado.mensage == 1){
      this.navCtrl.push(ChatPage, {
        users: this.chat
      });
    }else{
      console.log("erro");
    }
  },(error)=>{

  });





    }

  cal(d){
    this.callNumber.callNumber(d, true)
  .then(() => console.log('Launched dialer!'))
  .catch(() => console.log('Error launching dialer'));

  }

  getdados(d){
    this.service.getCliente(d).then((data)=>{

        this.dadosUser = data;
        console.log(this.dadosUser[0]);
        console.log(data);

    },(err)=>{

    });

  }



}
