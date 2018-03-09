import { Component } from '@angular/core';
import {  NavController, NavParams,ViewController,ToastController } from 'ionic-angular';
import {ServiceProvider} from '../../providers/service/service';
import {LoginPage} from '../login/login';
/**
 * Generated class for the CadUserPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-cad-user',
  templateUrl: 'cad-user.html',
})
export class CadUserPage {


  cadastro:any = {};
  cidades:any;
  mensage:any;
  dadospush:any;

  constructor( public navCtrl: NavController, public navParams: NavParams,public toastCtrl:ToastController,public viewCtrl: ViewController, public service: ServiceProvider) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadUserPage');
  }
  close(){
    this.viewCtrl.dismiss();
  }
  salvar(cad:any){

    cad.data = new Date().toISOString();

    this.service.preCadastroApp(cad).then((result)=>{
      console.log(result);
      this.mensage = result;
      if(this.mensage.mensage==2){

        let toast = this.toastCtrl.create({
          message: 'Desculpe, ocorreu um erro. Tente novamente mais tarde',
          duration: 3000,
          position: 'top',
       cssClass: "toast-error"
        });
        toast.present();
      
      }
    if(this.mensage.mensage==1){

  let toast = this.toastCtrl.create({
    message: 'Esse email já esta cadastrado em nosso sistema',
    duration: 3000,
    position: 'top',
 cssClass: "toast-error"
  });
  toast.present();

}
if(this.mensage.mensage==0){

  let toast = this.toastCtrl.create({
    message: 'Pré Cadastro realizado com sucesso, em breve entraremos em contato',
    duration: 6000,
    position: 'top',
 cssClass: "toast-success"
  });
  toast.present();
       this.navCtrl.push(LoginPage);

}

    },(err)=>{
      console.log(err);
    });


  }

}
