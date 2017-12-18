import { Component, ViewChild } from '@angular/core';
import { App , ModalController, Nav, NavController, LoadingController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import {LoginPage} from '../login/login';
import {UpdatePassPage} from '../update-pass/update-pass';
import {ServiceProvider} from '../../providers/service/service';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
    @ViewChild(Nav) nav: Nav;
dadosUser:any;
tabBarElement:any;
solics:any;
countpend:any;


  constructor(public service: ServiceProvider, public modal: ModalController, public app:  App, public loadingCtrl:LoadingController, private socialSharing: SocialSharing, public navCtrl: NavController, public navParams: NavParams) {
 this.tabBarElement = document.querySelector('#tabs ion-tabbar-section');
    if(localStorage.getItem('userData')){
      this.dadosUser = JSON.parse(localStorage.getItem('userData'));
      console.log(this.dadosUser[0].nome);

    }
    this.getSol();
  }
  share(){
    this.socialSharing.share("Precisando de um profissional pra te dar uma forcinha? Baixe agora o aplicativo Serviços Ja",null/*Subject*/,null/*File*/,"http://www.google.com")

    .then(() => {
  // Sharing via email is possible
}).catch(() => {
  // Sharing via email is not possible
});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  exit(){
    let loader = this.loadingCtrl.create({
      content: "Aguarde...",
      duration: 6000
    });
    loader.present();
    localStorage.removeItem('userData');
       loader.dismiss();
       this.nav.setRoot(LoginPage);
  this.app.getRootNav().setRoot(LoginPage);

  }


  sair(){
    localStorage.removeItem('userData');


  }

  getSol(){

    this.service.getSol(this.dadosUser[0].id_usuario).subscribe((data)=>{
      this.solics = data;
      this.countpend = this.solics.length;
console.log(this.solics.length);
    },(erro)=>{
      console.log(erro);
    });


  }
  updatePass(){
    let modal = this.modal.create(UpdatePassPage);
    modal.present();
  }

}
