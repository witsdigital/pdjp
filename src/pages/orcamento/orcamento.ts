import { Component } from '@angular/core';
import { ToastController, NavController, NavParams,ViewController } from 'ionic-angular';
import {ServiceProvider} from '../../providers/service/service';
import {TabsPage} from '../tabs/tabs';

/**
 * Generated class for the OrcamentoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
//@IonicPage()
@Component({
  selector: 'page-orcamento',
  templateUrl: 'orcamento.html',
})
export class OrcamentoPage {

  ct:any;
  cadastro:any= [];
  endenew:any= [];
  dadosUser:any;
  mensage:any;
  dados: any;
  imagens: any;

  constructor(public navCtrl: NavController,public toastCtrl:ToastController, public service : ServiceProvider, public navParams: NavParams, public viewCtrl: ViewController) {
    this.ct = this.navParams.get('ct');
    console.log(this.ct);
    this.cadastro = this.navParams.get('ct');

    this.getimagensorc();

  }

  ionViewDidLoad() {
    console.log(this.imagens);
  }

  cadOrc(dados){
    if(dados.selcan == true){
      dados.desc_orcamentos = 'Não poderemos executar o seu serviço, pois, ';

      dados.statusresp = 2;
      dados.valor = 0;
      dados.cod_user = this.ct.cod_user;
      if(dados.nc){
          dados.desc_orcamentos +=  dados.desc_orcamentos+'o orçamento não foi compreendido';

      }
      if(dados.nd){
          dados.desc_orcamentos +=  dados.desc_orcamentos+'a data solicitada não esta disponível';

      }
      if(dados.nc){
          dados.desc_orcamentos +=  dados.desc_orcamentos+'não temos essa disponibilidade';

      }


    }else{
      dados.statusresp = 1;
      dados.desc_orcamentos = 'O seu serviço pode ser executado';
    }

    this.service.postRespOrc(dados).then((data)=>{
      console.log(data);
      this.mensage = data;
      if(this.mensage.mensage == 1){
        let toast = this.toastCtrl.create({
          message: 'Orçamento respondido com sucesso',
          duration: 3000,
          position: 'bottom',
       cssClass: "toast-success"
        });
        toast.present();
           this.navCtrl.setRoot(TabsPage);


      }else{
        let toast = this.toastCtrl.create({
          message: 'Error',
          duration: 3000,
          position: 'top',
       cssClass: "toast-error"
        });
        toast.present();
      }

    }, (err)=>{

    })



  }

getimagensorc(){

  this.service.getimagensorc(this.ct.id_solicitacao_orcamento).then((data)=>{
    console.log(data);
    this.imagens = data;

  })


}


  close(){
    this.viewCtrl.dismiss();
  }

}
