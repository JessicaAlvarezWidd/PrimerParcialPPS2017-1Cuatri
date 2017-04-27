import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Result } from './result';

@NgModule({
  declarations: [
    Result,
  ],
  imports: [
    //IonicModule.forChild(Result),
  ],
  exports: [
    Result
  ]
})
export class ResultModule {}
