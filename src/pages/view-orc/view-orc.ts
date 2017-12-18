import { Component } from '@angular/core';
import {  NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ViewOrcPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
//@IonicPage()
@Component({
  selector: 'page-view-orc',
  templateUrl: 'view-orc.html',
})

export class ViewOrcPage {

orc:any;
  constructor(public viewCtrl:ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.orc = this.navParams.get('item');
    console.log(this.orc);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewOrcPage');
  }
  close(){
    this.viewCtrl.dismiss();
  }

}
