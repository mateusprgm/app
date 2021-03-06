import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


import { ContactPage } from '../contact/contact';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { NoticiaPage } from '../noticia/noticia';
import { EventoPage } from '../evento/evento';
import { AboutPage } from '../about/about';
import { PublicacoesPage } from '../publicacoes/publicacoes';
import { ListaDocumentosPage } from '../lista-documentos/lista-documentos';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public slidesOptions = [];
 

  url = "http://app.andes.org.br/api/doc/noticias";
  url2 = "http://app.andes.org.br/api/doc/agendas";
  url3 = "http://app.andes.org.br/api/doc/documentos/categorias";

  obs:Observable<any>;
  obs2:Observable<any>; 
  obs3:Observable<any>;

  public noticias: Array<Object>;
  
  public eventos = [];
  public evento = [];
  public documentos = [];
  public categoria_destaque = [];
  public texto:string;


  public quatroNoticias = [];

  constructor(public navCtrl: NavController, public HttpClient: HttpClient) {

    this.obs = HttpClient.get(this.url);
    this.obs2 = HttpClient.get(this.url2);
    this.obs3 = HttpClient.get(this.url3);

    this.obs.subscribe(data =>{
      this.noticias = data['results'];
      this.noticias.reverse();

      let i = 0;

      this.noticias.forEach(element => {
        if(i < 4){
          this.quatroNoticias.push(
            element
          );
          i++;
        }
      });

   
      console.log(this.quatroNoticias);
    });

    this.obs2.subscribe(data =>{
      let ev = false;
      let month:string;
      let day:string;
      let mes = (new Date().getMonth()+1);
      let dia = (new Date().getDate());

      month = mes.toString();
      day = dia.toString();
      
      if(day.length < 2){
        day = 0 + day;
      
      }
      if(month.length < 2){
        month = 0 + month;
      }

      this.eventos = data['results'];
      this.eventos.forEach(element => {
      data = day + "-" + month +  "-" + new Date().getFullYear();
      console.log(data);
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
      }else{
        this.texto = "Não Existe eventos hoje!";
      }
    })

    this.obs3.subscribe(data =>{
    this.documentos = data['results'];

    this.documentos.forEach(element =>{
      if(element.destaque != false){
        this.categoria_destaque.push({
              lista:element
        });
        this.categoria_destaque.reverse();
      }
    })
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

  pushPageListaDoc(lista){
     
    
     this.navCtrl.push(ListaDocumentosPage,{
       lista:lista
     })
     
  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.obs.subscribe(data =>{
        this.noticias = data['results'];
        this.noticias.reverse();
        // console.log(this.noticias);
      });
      this.obs2.subscribe(data =>{
        let ev = false;
        this.evento = [];

        let month:string;
        let day:string;
        let mes = (new Date().getMonth()+1);
        let dia = (new Date().getDate());

        month = mes.toString();
        day = dia.toString();

        month = mes.toString();
        day = dia.toString();
        
        if(day.length < 2){
          day = 0 + day;
        
        }
        if(month.length < 2){
          month = 0 + month;
        }
        this.eventos = data['results'];
        this.eventos.forEach(element => {
        data = day + "-" + month +  "-" + new Date().getFullYear();
        console.log(data);
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
      this.categoria_destaque = [];
      this.obs3.subscribe(data =>{
        this.documentos = data['results'];
    
        this.documentos.forEach(element =>{
          if(element.destaque != false){
            this.categoria_destaque.push({
                  lista:element
            });
          }
          this.categoria_destaque.reverse();
        })
        })
      
      let i = 0;
      this.quatroNoticias = [];
      this.noticias.forEach(element => {
        if(i < 4){
          this.quatroNoticias.push(
            element
          );
          i++;
        }
      });
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