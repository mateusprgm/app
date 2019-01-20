import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PublicacoesPage } from './publicacoes';

@NgModule({
  declarations: [
    PublicacoesPage,
  ],
  imports: [
    IonicPageModule.forChild(PublicacoesPage),
  ],
})
export class PublicacoesPageModule {}
