import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ListaDocumentosPage } from '../lista-documentos/lista-documentos';

/**
 * Generated class for the PublicacoesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-publicacoes',
  templateUrl: 'publicacoes.html',
})
export class PublicacoesPage {

  
  
  url = "http://webtecsites.com.br/api/doc/documentos/categorias";
  obs: Observable<any>;
  publicacoes: Array<object>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public HttpClient: HttpClient) {
    
    this.obs = HttpClient.get(this.url);

    this.obs.subscribe(data =>{
      this.publicacoes = data['results'];
      this.publicacoes.sort();
      // console.log(this.publicacoes);
    })
     console.log(this.publicacoes);
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      this.obs.subscribe(data =>{
        this.publicacoes = data['results'];
        this.publicacoes.sort();
        // console.log(this.publicacoes);
      })
      refresher.complete();
    }, 2000);
  }

  pushPageListaDoc(lista){
    this.navCtrl.push(ListaDocumentosPage,{
      lista: lista
    })
  };

}
