import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import { Result } from '../result/result';
import { Vibration } from '@ionic-native/vibration';
import { NativeAudio } from '@ionic-native/native-audio';

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
  providers: [ Vibration, NativeAudio ]
})
export class Trivia {

  items: FirebaseListObservable<any>;
  ResUser: FirebaseListObservable<any>;  
  preguntasRespondidas:Array<any>=[];
  cantPreguntas = 0;
  cantRespuestas;
  preguntaActual = 0;
  cntCorrecta = 0;
  cntIncorrecta = 0;
  userLogin;
  preguntas: Array<any> = [];
  respuestas: Array<any> = [];
  exitoCargarSonidoCorrecto : boolean = false;
  exitoCargarSonidoError : boolean = false;


  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire, 
  public alertCtrl: AlertController, public toastCtrl: ToastController, public vibration : Vibration, public native : NativeAudio) {

    af.auth.subscribe(auth => this.userLogin =  auth);
    console.log(this.userLogin.auth.displayName);

    this.CargarSonidos(); 
    
    this.items = af.database.list('/Trivia');
    //console.log(this.items);
    this.ResUser = af.database.list('/ResUser');

    this.ResUser.subscribe(result =>{
       this.cantRespuestas = result.length;
    })

    this.items.subscribe(result => {this.cantPreguntas = result.length
    var numRandom = Math.floor(Math.random()*(this.cantPreguntas)+1);
    this.preguntasRespondidas.push(numRandom);
    this.preguntaActual = numRandom;
    console.log(this.preguntasRespondidas);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Trivia');
  }

  Respuesta(ResSelect,clave,preg)
  {
    let toast;
    this.preguntas.push(preg);

    this.items.subscribe(items => items.forEach(
      item => {
                    
          if(item.$key == clave)
          {
            var resString;
            switch(ResSelect)
            {
                case "res1":
                  resString = item.opciones.res1;
                  break;
                case "res2":
                  resString = item.opciones.res2;
                  break;
                case "res3":
                  resString = item.opciones.res3;
                  break;
              } 
              this.respuestas.push(resString);
              //console.log(this.respuestas);         
            
              if(ResSelect == item.respuesta)
              {
                this.ReproducirSonido("correcto");
                this.vibration.vibrate(550);
                //alert('ACERTASTE');
                toast = this.toastCtrl.create({
                  message: 'ACERTASTE',
                  duration: 500,
                  position: 'middle',
                  cssClass: 'clase-toast-acierto'
                }); 
                this.cntCorrecta += 1;

              }
              else
              {
                this.ReproducirSonido("error");
                this.vibration.vibrate([200,300,200]);
                //alert('ERRASTE');
                toast = this.toastCtrl.create({
                  message: 'FALLASTE',
                  duration: 500,
                  position: 'middle',
                  cssClass: 'clase-toast-fallo'
                });  
                this.cntIncorrecta += 1;
              }

              toast.present();
          }
      }

      ));      
      
      if(this.preguntasRespondidas.length > 4)
      {
        this.EliminarSonidos();
        this.finalRound();
      }
      else
      {
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

  finalRound()
  {     
          
        let alert = this.alertCtrl.create({
          title: 'Felicidades!',
          subTitle: 'Terminaste esta Ronda. Gracias por jugar!',
          buttons: ['OK']
        });
    alert.present();

    this.ResUser.subscribe(ResUser => ResUser.forEach(
      item => {

        if(item.$key == this.userLogin.auth.uid)
        {
          this.cntCorrecta += item.resCorrectas;
          this.cntIncorrecta += item.resIncorrectas;
        }
      }
    ));    

    this.ResUser.update(this.userLogin.auth.uid,
    { 
        "Username" : this.userLogin.auth.displayName,        
        "resCorrectas" : this.cntCorrecta,
        "resIncorrectas" : this.cntIncorrecta,
        "lastRes" : {
                              "pregunta01" : {
                                                "Preg" : this.preguntas[0],
                                                "Rta" : this.respuestas[0]
                                              },
                              "pregunta02" : {
                                                "Preg" : this.preguntas[1],
                                                "Rta" : this.respuestas[1]
                                              },
                              "pregunta03" : {
                                                "Preg" : this.preguntas[2],
                                                "Rta" : this.respuestas[2]
                                              },
                              "pregunta04" : {
                                                "Preg" : this.preguntas[3],
                                                "Rta" : this.respuestas[3]
                                              },
                              "pregunta05" : {
                                                "Preg" : this.preguntas[4],
                                                "Rta" : this.respuestas[4]
                                              }
                               }
        }
    );

  this.navCtrl.setRoot(Result);
}

 CargarSonidos()
  {
    this.native.preloadSimple('correcto', 'assets/sound/Correcto.wav')
      .then(
        resp => {
          this.exitoCargarSonidoCorrecto = true;
          console.log("Exito al cargar sonido 'correcto'. " + resp);
        },
        err => { console.log("Error al cargar el sonido 'correcto'. " + err); });

    this.native.preloadSimple('error', 'assets/sound/Error.wav')
      .then(
        resp => {
          this.exitoCargarSonidoError = true;
          console.log("Exito al cargar sonido 'error'. " + resp);
        },
        err => { console.log("Error al cargar el sonido 'error'. " + err); });
    
  }

  ReproducirSonido(sonido)
  {
    if (!(this.exitoCargarSonidoCorrecto && this.exitoCargarSonidoError))
    {
      console.log("No se pudo reproducir el sonido por que no se cargo. ");
      return;
    }
    this.native.play(sonido, () => console.log(sonido + " se termino de reproducir."))
      .then(
        resp => {
          console.log("Exito al reproducir el sonido. " + resp);
        },
        err => { console.log("Error al reproducir el sonido. " + err); });
  }

   EliminarSonidos()
  {
    if (this.exitoCargarSonidoCorrecto)
      this.native.unload("correcto");
    if (this.exitoCargarSonidoError)
      this.native.unload("error");
    
  }




}
