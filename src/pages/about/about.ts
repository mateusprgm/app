import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NoticiaPage } from '../noticia/noticia';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  
  
  
  url = "http://app.andes.org.br/api/doc/noticias";

  obs:Observable<any>;
  public noticia: Array<Object>;
  
  constructor(public navCtrl: NavController, public HttpClient: HttpClient) {
    this.obs = HttpClient.get(this.url);

     this.obs.subscribe(data =>{
       this.noticia = data['results'];
       this.noticia.reverse();
     })
     console.log(this.noticia);
  }
    
  
  pushPageN(titulo, descricao, image){
    this.navCtrl.push(NoticiaPage, {
        noticia: {
            titulo: titulo,
            descricao: descricao,
            image: image
        }
    });
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      this.obs.subscribe(data =>{
        this.noticia = data['results'];
        this.noticia.reverse();
      })
      console.log(this.noticia);
      refresher.complete();
    }, 2000);
  }
  

}
