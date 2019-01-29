import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the GrupoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-grupo',
  templateUrl: 'grupo.html',
})
export class GrupoPage {

  

  item = [];
  nome_pessoa: string;
  grupo_id: string;
 
  lista = [];
  grupo = [];
  lista_credenciados = [];

  url = "http://app.andes.org.br/api/doc/credeciamento";

  negrito1 = "";
  negrito2 = "";
  obs: Observable<any>;
  nome_grupo:string;
  loading: any;
  conta = 0;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public HttpClient: HttpClient, public loadingCtrl: LoadingController) {
    
    
    if(navParams.get('item')){
      this.showLoader();
      this.item = navParams.get('item');
      this.nome_grupo = this.item['grupo']['name'];
     
      this.obs = this.HttpClient.get(this.url);

      this.obs
      .subscribe(data => {
        this.lista = data['results'];
      
        console.log(this.lista.length);
        this.lista.forEach(element => {

          if(element.grupo.id == parseInt(this.item['grupo']['id'])){
                if(element.name ==this.item['name']){
                  this.negrito1 = "<b>";
                  this.negrito2 = "</b>";
                }else{
                  this.negrito1 = "";
                  this.negrito2 = "";
                }

            this.grupo.push({
              id: element['id'],
              nome: this.negrito1+element['name']+this.negrito2,
              sessao_sindical: element['sessao_sindical']

            });
          }
          this.conta++;
          if(this.lista.length == this.conta){
            this.loading.dismiss();
          }
        });

      })
    }else if(navParams.get('grupo')){
        this.lista_credenciados = navParams.get('grupo');
        this.nome_grupo = this.lista_credenciados['name'];
        this.lista_credenciados = this.lista_credenciados['credeciados'];
    }
    
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Aguarde...',
    });

    if(this.lista.length == this.conta){
      console.log('aqui');
      this.loading.duration = 0
    };
    this.loading.present();
  }
}
