import { Component } from '@angular/core';
import {  NavController, NavParams,ModalController } from 'ionic-angular';
import {ServiceProvider} from '../../providers/service/service';
import {ViewOrcPage} from '../view-orc/view-orc';
/**
 * Generated class for the ViewOrcsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
//@IonicPage()
@Component({
  selector: 'page-view-orcs',
  templateUrl: 'view-orcs.html',
})
export class ViewOrcsPage {
  itens:any;
  dadosUser:any;
  orcs:any;

  constructor(public modalCtrl: ModalController, public service: ServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    console.log(navParams.get('item'));
        this.dadosUser = JSON.parse(localStorage.getItem('userData'));

    this.service.getOrcs(this.dadosUser[0].id_usuario).subscribe((data)=>{
      this.orcs = data;
console.log(data);
    },(erro)=>{
      console.log(erro);
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewOrcsPage');
  }

  viewOrc(item){
    let modal = this.modalCtrl.create(ViewOrcPage, {item: item});
    modal.onDidDismiss(data => {


    });
    modal.present();
  }

}
