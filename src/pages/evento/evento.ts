import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EventoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-evento',
  templateUrl: 'evento.html',
})
export class EventoPage {
  palestra = [];
  label = "";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
   
   this.palestra = navParams.get('palestra');
   this.palestra = this.palestra['palestra'];
   if(this.palestra['documentos']['length'] != "0"){
     this.label = "Documentos";
   }
   console.log(this.palestra['documentos']['length']);
   
  }
}
