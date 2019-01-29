import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GrupoPage } from '../grupo/grupo';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the CredenciadosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-credenciados',
  templateUrl: 'credenciados.html',
}
)
export class CredenciadosPage {

  public label = "Buscar credenciado...";
  
  
  url = "http://app.andes.org.br/api/doc/credeciamento";
  url_grupos = "http://app.andes.org.br/api/doc/grupos";

  obs: Observable<any>;
  obs_grupos: Observable<any>;
  obs_ordem : Observable<any>;

  searchQuery: string = '';

  items = [];
  grupo = [];
  grupo_lista = [];
  aux = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public HttpClient: HttpClient) {

      this.obs = this.HttpClient.get(this.url);

      this.obs_grupos = this.HttpClient.get(this.url_grupos);

      this.obs_grupos.subscribe(data => {
        this.grupo_lista = data['results'];
        console.log(this.grupo_lista);
      });

      this.obs.
          subscribe(data =>{
              this.aux = data['results'];
          })
      
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      this.obs.
          subscribe(data =>{
            this.aux = data['results'];
          })
      this.obs_grupos.
          subscribe(data => {
              this.grupo_lista = data['results'];
              console.log(this.grupo_lista);
      });    
      refresher.complete();
    }, 2000);
  }

  pulllist(){
    
    this.grupo = this.aux;
     
  }
  
  

  initializeItems() {
    
    this.items = this.aux;
    this.items = this.grupo;

  }
  
  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;
    if(val == ''){
      val = "@#@#";
    }
    

    // if the value is an empty string don't filter the items
    
      if (val && val.trim() != '') {
        this.items = this.items.filter((item) => {
          
           return (item['name'].toLowerCase().indexOf(val.toLowerCase()) > -1);
           
        })
      }
    
    
  }
  pushPageG(item){
    this.navCtrl.push(GrupoPage, {
        item: item
    });
  }
  pushPageGL(grupo){
    this.navCtrl.push(GrupoPage, {
        grupo: grupo
    });
  }
}
