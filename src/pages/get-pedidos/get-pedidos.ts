import { ServiceProvider } from './../../providers/service/service';
import { Network } from '@ionic-native/network';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, ViewController } from 'ionic-angular';

/**
 * Generated class for the GetPedidosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-get-pedidos',
  templateUrl: 'get-pedidos.html',
})
export class GetPedidosPage {

dadosUser;
pedidos: any;
status: any;

constructor(public viewCtrl: ViewController, public localNotifications:LocalNotifications, public network: Network, public navCtrl: NavController,public modalCtrl: ModalController,public loadingCtrl: LoadingController, public service: ServiceProvider) {



     if(localStorage.getItem('userData')){
       this.dadosUser = JSON.parse(localStorage.getItem('userData'));
       console.log(this.dadosUser[0].nome);


     }

 this.getpedidos();

 this.network.onDisconnect().subscribe(() => {
   console.log('network desconnected!');
 this.status = "desconectado";
 });

 this.network.onConnect().subscribe(() => {
   console.log('network connected!');
   this.status = "conectado"
   // We just got a connection but we need to wait briefly
    // before we determine the connection type. Might need to wait.
   // prior to doing any api requests as well.
   setTimeout(() => {
     if (this.network.type === 'wifi') {
       console.log('we got a wifi connection, woohoo!');
     }
   }, 3000);
 });



   }



 getpedidos(){

       this.service.getped(this.dadosUser[0].id_usuario).then((data)=>{
       this.pedidos = data;
       console.log(data);
       })

 }

 close(){
  this.viewCtrl.dismiss();
}









 }
