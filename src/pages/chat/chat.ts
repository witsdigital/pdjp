import { ServiceProvider } from './../../providers/service/service';
import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  lista: any;
  mensagem: string;
  setmensagem: any;
  usuarios: any;
  chat: any;
  dadosUser: any;
  id;

  constructor (public navParams: NavParams, public service: ServiceProvider, public navCtrl: NavController) {
    this.usuarios = this.navParams.get('users');
    this.dadosUser = JSON.parse(localStorage.getItem('userData'));
    this.getMensagens();


  }


  enviarMensagem(){
    this.usuarios = this.navParams.get('users');
    this.setmensagem = [
      {
        mensagem: this.mensagem,
        data: new Date(),
        id1: this.usuarios[0].user1,
        id2: this.usuarios[0].user2
      }
    ];

    this.service.postMensagem(this.setmensagem[0]).then((result)=>{
      this.setmensagem = result;
      if(this.setmensagem.mensage == 1){
        console.log("sucesso");
      }else{
        console.log("erro");
      }
    },(error)=>{

    });





    }




getMensagens(){

  this.service.getChat(this.usuarios[0].user1, this.usuarios[0].user2).subscribe((data)=>{
    this.chat = data;
    console.log(this.chat);
  },(erro)=>{
    console.log(erro);
  });

  setInterval(() => {
    this.service.getMensagens(this.chat[0].id_chat).subscribe((data)=>{
      this.lista = data;
    },(erro)=>{
      console.log(erro);
    });


  }, 1000);


    }








}
