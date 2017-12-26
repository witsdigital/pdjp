import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ViewSaldoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-view-saldo',
  templateUrl: 'view-saldo.html',
})
export class ViewSaldoPage {

  ct: any;

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.ct = this.navParams.get('ct');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewSaldoPage');
  }

  close(){
    this.viewCtrl.dismiss();
  }

}
