import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the NotificacaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-notificacao',
  templateUrl: 'notificacao.html',
})
export class NotificacaoPage {
  tppage:any;

  constructor(public viewCtrl:ViewController, public navCtrl: NavController, public navParams: NavParams) {
  if(this.navParams.get('tp')){
    this.tppage = true;

  }else{
    this.tppage= false;
  }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificacaoPage');
  }

  close(){
    this.viewCtrl.dismiss();
  }

}
