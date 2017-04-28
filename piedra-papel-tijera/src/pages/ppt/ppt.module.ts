import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Ppt } from './ppt';

@NgModule({
  declarations: [
    Ppt,
  ],
  /*imports: [
    IonicPageModule.forChild(Ppt),
  ],*/
  exports: [
    Ppt
  ]
})
export class PptModule {}
