import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import { Vibration } from '@ionic-native/vibration';

/**
 * Generated class for the Ppt page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-ppt',
  templateUrl: 'ppt.html',
  providers: [ Vibration ]
})
export class Ppt {

  userLogin;
  fecha:String;
  juegos : FirebaseListObservable<any>;
  resultado : String;

  constructor(public navCtrl: NavController, public navParams: NavParams, af: AngularFire, 
  public toastCtrl: ToastController, public vibration : Vibration) {
  
    af.auth.subscribe(auth => this.userLogin =  auth); 
    console.log(this.userLogin.auth.displayName);

    this.juegos = af.database.list('/PPT');   

}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Ppt');
  }

   botonPrecionado(botonPrecionado) 
  {   
    let toast;
    var numRandom = Math.floor(Math.random()*3)+1;   

    if(botonPrecionado == numRandom)
    {
      this.vibration.vibrate(550);
      toast = this.toastCtrl.create({
              message: 'EMPATASTE',
              duration: 700,
              position: 'middle',
              cssClass: 'clase-toast-empate'
                }); 
      toast.present();
      this.resultado = "Empatado";
    }
    else
    {
      switch(botonPrecionado)
      {
        case 1: 
          if(numRandom == 2) 
          {
            this.vibration.vibrate(550);
            toast = this.toastCtrl.create({
                  message: 'PERDISTE',
                  duration: 700,
                  position: 'middle',
                  cssClass: 'clase-toast-perdido'
                });
            this.resultado = "Perdido";
          }
          else
          {
            this.vibration.vibrate(550);
            toast = this.toastCtrl.create({
                  message: 'GANASTE!',
                  duration: 700,
                  position: 'middle',
                  cssClass: 'clase-toast-ganado'
                });
            this.resultado = "Ganado";
          }
          break;

        case 2: 
          if(numRandom == 3) 
          {
            this.vibration.vibrate(550);
            toast = this.toastCtrl.create({
                  message: 'PERDISTE',
                  duration: 700,
                  position: 'middle',
                  cssClass: 'clase-toast-perdido'
                });
            this.resultado = "Perdido";
          }
          else
          {
            this.vibration.vibrate(550);
            toast = this.toastCtrl.create({
                  message: 'GANASTE!',
                  duration: 700,
                  position: 'middle',
                  cssClass: 'clase-toast-ganado'
                });
            this.resultado = "Ganado";
          }
          break;
    
          
          case 3: 
            if(numRandom == 1) 
          {
            this.vibration.vibrate(550);
            toast = this.toastCtrl.create({
                  message: 'PERDISTE',
                  duration: 700,
                  position: 'middle',
                  cssClass: 'clase-toast-perdido'
                });
            this.resultado = "Perdido";
          }
          else
          {
            this.vibration.vibrate(550);
            toast = this.toastCtrl.create({
                  message: 'GANASTE!',
                  duration: 700,
                  position: 'middle',
                  cssClass: 'clase-toast-ganado'
                });
            this.resultado = "Ganado";
          }
          break;          
          
      }

      toast.present();
      
    }
    console.log(this.resultado);
    this.subidaDeDatos();
    

  }

  subidaDeDatos()
  {
    var today = new Date();
    this.fecha= today.getDate()+'/'+(today.getUTCMonth()+1)+'/'+today.getFullYear()+' '
                +today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
    console.log(this.fecha);
    this.juegos.push( //subida de datos a la firebase (creacion nueva de un objeto)
      {
        "estado" : this.resultado,
        "fecha" : this.fecha,
        "nombre" : this.userLogin.auth.displayName
      }
    );
  }
}


