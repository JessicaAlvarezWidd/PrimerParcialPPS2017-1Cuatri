import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Trivia } from './trivia';

@NgModule({
  declarations: [
    Trivia,
  ],
  /*imports: [
    IonicModule.forChild(Trivia),
  ],*/
  exports: [
    Trivia
  ]
})
export class TriviaModule {}
