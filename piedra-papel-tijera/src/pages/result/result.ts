import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

/**
 * Generated class for the Result page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class Result {

  juegos: FirebaseListObservable<any>; 
  userLogin;
  Ganados : Array<any> = [];
  Empatados : Array<any> = [];
  Perdidos : Array<any> = [];
  seleccion = 'Ganados';

 constructor(public navCtrl: NavController, public navParams: NavParams,af:AngularFire) {

  af.auth.subscribe(auth => this.userLogin =  auth);
      
  this.juegos = af.database.list('/PPT');

  this.juegos.subscribe(juego => {juego.forEach(item => {
        
    if(item.estado == "Ganado" && item.nombre == this.userLogin.auth.displayName){
      this.Ganados.push(item);
      
    }
    if(item.estado == "Empatado" && item.nombre == this.userLogin.auth.displayName){
      this.Empatados.push(item);
      
    }
    if(item.estado == "Perdido" && item.nombre == this.userLogin.auth.displayName){
      this.Perdidos.push(item);
        
    }

  }); 

  this.Ganados = this.Ganados.slice().reverse();
  this.Empatados = this.Empatados.slice().reverse();
  this.Perdidos = this.Perdidos.slice().reverse();

  });

  

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad Result');
  }

}
