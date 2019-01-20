import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaDocumentosPage } from './lista-documentos';

@NgModule({
  declarations: [
    ListaDocumentosPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaDocumentosPage),
  ],
})
export class ListaDocumentosPageModule {}
