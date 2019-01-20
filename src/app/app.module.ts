import { NgModule, ErrorHandler, enableProdMode, LOCALE_ID} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { NgCalendarModule } from 'ionic2-calendar';

import localePtBr from '@angular/common/locales/pt';

import { registerLocaleData } from '@angular/common';
import { EventoPage } from '../pages/evento/evento';
import { NoticiaPage } from '../pages/noticia/noticia';
import { CredenciadosPage } from '../pages/credenciados/credenciados';
import { PublicacoesPage } from '../pages/publicacoes/publicacoes';
import { GrupoPage } from '../pages/grupo/grupo';
import { ListaDocumentosPage } from '../pages/lista-documentos/lista-documentos';


enableProdMode()
registerLocaleData(localePtBr);

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    EventoPage,
    NoticiaPage,
    CredenciadosPage,
    PublicacoesPage,
    GrupoPage,
    ListaDocumentosPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    NgCalendarModule,
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    EventoPage,
    NoticiaPage,
    CredenciadosPage,
    PublicacoesPage,
    GrupoPage,
    ListaDocumentosPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ]
})
export class AppModule {}
