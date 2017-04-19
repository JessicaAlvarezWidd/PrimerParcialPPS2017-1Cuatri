import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

/**
 * Generated class for the Trivia page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-trivia',
  templateUrl: 'trivia.html',
})
export class Trivia {

  items: FirebaseListObservable<any>;
  ResUser: FirebaseListObservable<any>;
  points = 0;
  preguntasRespondidas:Array<any>=[];
  cantPreguntas = 0;
  preguntaActual = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,af: AngularFire) {
    this.items = af.database.list('/Trivia');
    //console.log(this.items);
    this.ResUser = af.database.list('/ResUser');
    this.items.subscribe(result => {this.cantPreguntas = result.length});
    var numRandom = Math.floor(Math.random()*(this.cantPreguntas)+1);
    this.preguntasRespondidas.push(numRandom);
    this.preguntaActual = numRandom;
    console.log(this.preguntasRespondidas);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Trivia');
  }

  Respuesta(ResSelect,clave)
  {
    var preguntaCorrecta = false;

    this.items.subscribe(items => items.forEach(
      item => {
                    
          if(item.$key == clave)
          {          
            
              if(ResSelect == item.respuesta)
              {
                  preguntaCorrecta = true;
                  this.points += 5;
              
              }
          }
      }

      ));      
      
      do
      {
        var numRandom = Math.floor(Math.random()*(this.cantPreguntas)+1);       
      }
      while(this.preguntasRespondidas.indexOf(numRandom) != -1); 
      this.preguntasRespondidas.push(numRandom); 
      this.preguntaActual = numRandom;
      console.log(this.preguntasRespondidas);
      
  }

}
