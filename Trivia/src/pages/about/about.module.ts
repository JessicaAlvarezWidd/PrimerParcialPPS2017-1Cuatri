import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { About } from './about';

@NgModule({
  declarations: [
    About,
  ],
  /*imports: [
    IonicModule.forChild(About),
  ],*/
  exports: [
    About
  ]
})
export class AboutModule {}
