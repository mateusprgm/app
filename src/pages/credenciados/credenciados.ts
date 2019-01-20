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

  public teste = "Buscar...";
  
  
  url = "http://webtecsites.com.br/api/doc/credeciamento";
  
  obs: Observable<any>;

  searchQuery: string = '';

  items = [];
  grupo = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public HttpClient: HttpClient) {

      this.obs = this.HttpClient.get(this.url);

      this.obs.
          subscribe(data =>{
              this.items = data['results'];
              this.grupo = this.items;
          })
      
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      this.obs.
          subscribe(data =>{
              this.items = data['results'];
              this.grupo = this.items;
          })
      refresher.complete();
    }, 2000);
  }

 
  

  initializeItems() {
    this.items = [];
    this.items = this.grupo;
  }
  
  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    
      if (val && val.trim() != '') {
        this.items = this.items.filter((item) => {
          
           return (item['name'].toLowerCase().indexOf(val.toLowerCase()) > -1);
           
        })
      }
    
    
  }
  pushPageG(grupo, nome_grupo, nome_pessoa){
    this.navCtrl.push(GrupoPage, {
        item: {
            grupo: grupo,
            nome_grupo: nome_grupo,
            nome_pessoa: nome_pessoa,
        }
        
    });
  }

  

}
