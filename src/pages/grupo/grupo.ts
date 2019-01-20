import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

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
  grupo_nome: string;
  lista = [];
  grupo = [];

  url = "http://webtecsites.com.br/api/doc/credeciamento";

  negrito1 = "";
  negrito2 = "";
  obs: Observable<any>;
  cordova: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public HttpClient: HttpClient) {

    

      this.item = navParams.get('item');
      this.grupo_id = this.item['grupo'];
      this.grupo_nome = this.item['nome_grupo'];
      this.nome_pessoa = this.item['nome_pessoa'];

      this.obs = this.HttpClient.get(this.url);

      this.obs
      .subscribe(data => {
        this.lista = data['results'];

        this.lista.forEach(element => {

          if(element.grupo.id == parseInt(this.grupo_id)){
                if(element.name == this.item['nome_pessoa']){
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
          console.log(this.grupo);
          }
            
        });
      })
  }
}
