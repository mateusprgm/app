import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CredenciadosPage } from './credenciados';

@NgModule({
  declarations: [
    CredenciadosPage,
  ],
  imports: [
    IonicPageModule.forChild(CredenciadosPage),
  ],
})
export class CredenciadosPageModule {}
