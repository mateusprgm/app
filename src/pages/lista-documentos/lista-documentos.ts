import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ListaDocumentosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-documentos',
  templateUrl: 'lista-documentos.html',
})
export class ListaDocumentosPage {
  public lista: Array<Object>;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.lista = navParams.get("lista");
    this.lista['documentos'].reverse();
    console.log(this.lista['documentos']);
  }
}
