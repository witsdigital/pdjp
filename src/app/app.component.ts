import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { OneSignal } from '@ionic-native/onesignal';
import {TabsPage} from '../pages/tabs/tabs';
import{ServiceProvider} from '../providers/service/service';
import {LoginPage} from '../pages/login/login';
import {NotificacaoPage} from '../pages/notificacao/notificacao';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('content') navCtrl: NavController;

  dadosUser:any=[];

  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  para:any;
//  rootPage: any = TabsPage;

  pages: Array<{title: string, icon: string, component: any}>;

  constructor(public modalCtrl: ModalController, public service: ServiceProvider,private oneSignal: OneSignal, private localNotifications: LocalNotifications,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
this.para = {servico:10};



    if(localStorage.getItem('userData')){
      this.dadosUser = JSON.parse(localStorage.getItem('userData'));
      console.log(this.dadosUser[0].nome);

    }else{
        this.dadosUser.push( {nome:'thiago', email:'t@email.com'});
    }
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home',icon:'home', component: TabsPage },


    ];



  }

  sair(){
    localStorage.removeItem('userData');
       this.nav.setRoot(LoginPage);
  }

  initializeApp() {
    this.platform.ready().then(() => {
    this.statusBar.styleDefault();
    this.splashScreen.hide();
    if (this.platform.is('cordova')) {

      this.oneSignal.startInit('0424e1ef-4238-489a-898a-7c80d72f9ea0', '506511374389');

     this.oneSignal.getIds().then((data)=>{
              localStorage.setItem('pushkey', JSON.stringify(data));
    console.log(data);
  });
  this.oneSignal.handleNotificationOpened().subscribe(() => {
    let modal = this.modalCtrl.create(NotificacaoPage,{tp:'noti'});
    modal.onDidDismiss(data => {


    });
    modal.present();

  // do something when a notification is opened
});

  this.oneSignal.endInit();
  } else {



  }

    // OneSignal Code start:
    // Enable to debug issues:
    // window["plugins"].OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});




  });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
