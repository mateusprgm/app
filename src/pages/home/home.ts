import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


import { ContactPage } from '../contact/contact';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { NoticiaPage } from '../noticia/noticia';
import { EventoPage } from '../evento/evento';
import { AboutPage } from '../about/about';
import { PublicacoesPage } from '../publicacoes/publicacoes';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public slidesOptions = [];
 

  url = "http://webtecsites.com.br/api/doc/noticias";
  url2 = "http://webtecsites.com.br/api/doc/agendas";

  obs:Observable<any>;
  obs2:Observable<any>; 
  public noticias: Array<Object>;
  public eventos = [];
  public evento= [];
  public texto:string;


  constructor(public navCtrl: NavController, public HttpClient: HttpClient) {

  
    
    

    this.obs = HttpClient.get(this.url);
    this.obs2 = HttpClient.get(this.url2);

    this.obs.subscribe(data =>{
      this.noticias = data['results'];
    });

    this.obs2.subscribe(data =>{
      let ev = false;
      this.eventos = data['results'];
      this.eventos.forEach(element => {
      data = new Date().getDate() + "-" + new Date().getMonth()+1 + "-" + new Date().getFullYear();
        if(element.data == data){
            this.evento.push({
              evento:{
                atual: element
              }
            }
          );
          ev = true;
        }
      }); 
      if(ev){
        this.evento = this.evento[0]['evento'].atual;
        this.texto = "";
        console.log(this.evento);
      }else{
        this.texto = "Não Existe eventos hoje!";
      }
      
      
    })
  }

  pushPageEventos(horario, titulo){
    this.navCtrl.push(ContactPage, {
        evento: {
            horario: horario,
            titulo: titulo,
        }
    });
  }

  pushPagePalestra(palestra){
    this.navCtrl.push(EventoPage, {
        palestra: {palestra}
    });
  }

  pushPageNoticias(titulo, descricao, image){
    this.navCtrl.push(NoticiaPage, {
      noticia: {
          titulo: titulo,
          descricao: descricao,
          image: image
      }
    });
  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.obs.subscribe(data =>{
        this.noticias = data['results'];
        // console.log(this.noticias);
      });
      this.obs2.subscribe(data =>{
        let ev = false;
        this.evento = [];
        this.eventos = data['results'];
        this.eventos.forEach(element => {
        data = new Date().getDate() + "-" + new Date().getMonth()+1 + "-" + new Date().getFullYear();
          if(element.data == data){
              this.evento.push({
                evento:{
                  atual: element
                }
              }
            );
            ev = true;
          }
        }); 
        if(ev){
          this.evento = this.evento[0]['evento'].atual;
          this.texto = "";
          console.log(this.evento);
        }else{
          this.texto = "Não existe eventos hoje!";
        }
      })

      refresher.complete();
    }, 2000);
  }
  pushPageListNoticias(){
    this.navCtrl.push(AboutPage);
  }
  pushPageListPublicacoes(){
    this.navCtrl.push(PublicacoesPage);
  }
}