import { GetPedidosPage } from './../get-pedidos/get-pedidos';
import { PedidoPage } from './../pedido/pedido';
import { ViewSaldoPage } from './../view-saldo/view-saldo';
import { Component  } from '@angular/core';
import { NavController,LoadingController, ModalController } from 'ionic-angular';
import {OrcamentoPage} from '../orcamento/orcamento';
import {ServicosPage} from '../servicos/servicos';
import {ServiceProvider} from '../../providers/service/service';
import { Network } from '@ionic-native/network';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

cats : any = [];
dadosUser:any;

    servicos:any = ServicosPage;


destaques:any;
img:any = {src:'assets/slide.jpg'};
tem:any;
homeOptions = {
       initialSlide: 0,
       loop: true,
       autoplay:2000
     };

searchQuery: string = '';
lista:any[];
 items: any[];
 status:any = '';
 para:any;
 pedidos:any;
 saldo:any;


constructor(public localNotifications:LocalNotifications, public network: Network, public navCtrl: NavController,public modalCtrl: ModalController,public loadingCtrl: LoadingController, public service: ServiceProvider) {
 this.initializeItems();



    if(localStorage.getItem('userData')){
      this.dadosUser = JSON.parse(localStorage.getItem('userData'));
      console.log(this.dadosUser[0].nome);

      
    }

this.getSaldo();
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

  viewSolic(item){
    let modal = this.modalCtrl.create(OrcamentoPage, {ct: item});
    modal.onDidDismiss(data => {
    });
    modal.present();


  }

getpedidos(){
  
    setInterval(() => {
      this.service.getped(this.dadosUser[0].id_usuario).then((data)=>{
      this.pedidos = data;
      console.log(this.pedidos);
      })



    }, 10000);
}

  teste(){

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


  initializeItems() {

    this.items = this.lista;


 }

 getItems(ev: any) {
    // Reset items back to all of the items

this.initializeItems();
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.tem = true;
      this.items = this.items.filter((item) => {
        return (item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }else{
          this.tem = false;

    }
  }

  openPedido(item){
    let modal = this.modalCtrl.create(PedidoPage, {ct: item});
    modal.onDidDismiss(data => {
    });
    modal.present();

  }

getDestaques(){
  this.service.getdestaques().subscribe((data)=>{
    console.log(data);
    this.destaques = data;
  },(error)=>{

  });
}

  getDados(){

    let loader = this.loadingCtrl.create({
      content: "Carregando...",
      duration: 5000
    });
    loader.present();

    this.service.getCat().subscribe(
      (data)=>{
        this.cats = data;
  
  this.getDestaques();
  loader.dismiss();



      }
        ,

      (err)=> {console.log(err);
      alert("Ops algo deu errado");
    }
    );
    this.service.getServicos().subscribe((data)=>{

 this.lista = data;
 this.items = this.lista;
 console.log(this.items);
    },(err)=>{

    });

  }

  animateElem(page: any, dados: any) {
 this.navCtrl.setRoot(page, { cat: dados });

  // ;
  }




  onMenu(page: any){
this.navCtrl.setRoot(page);
}


getSaldo(){
  this.service.getSaldo(this.dadosUser[0].id_usuario).subscribe((data)=>{
    this.saldo = data;
    console.log(this.saldo);
  },(error)=>{

  });
}

openSaldo(item){
  
    let modal = this.modalCtrl.create(ViewSaldoPage, {ct: item});
    modal.onDidDismiss(data => {


    });
    modal.present();

  
}


openAll(){
  let modal = this.modalCtrl.create(GetPedidosPage);
  modal.onDidDismiss(data => {


  });
  modal.present();

}

}



