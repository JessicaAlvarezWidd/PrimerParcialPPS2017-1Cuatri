import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

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

  ResUser: FirebaseListObservable<any>;
  settings = {};
  userLogin;
  arrayPregRta: Array<datos> = [];
  miPreg;
  miRta;
  correctas;
  incorrectas;

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {

    af.auth.subscribe(auth => this.userLogin = auth);
    this.ResUser = af.database.list('/ResUser');
    this.ResUser.subscribe(ResUser => ResUser.forEach(
      item => {

        if(item.$key == this.userLogin.auth.uid)
        {
          for(var i=0; i<5; i++)
          {
            switch(i){ 
                    case 0:
                      this.miPreg = item.lastRes.pregunta01.Preg; 
                      this.miRta = item.lastRes.pregunta01.Rta; 
                    break;
                    case 1:
                      this.miPreg = item.lastRes.pregunta02.Preg; 
                      this.miRta = item.lastRes.pregunta02.Rta;
                    break;
                    case 2:
                      this.miPreg = item.lastRes.pregunta03.Preg; 
                      this.miRta = item.lastRes.pregunta03.Rta;
                    break;
                    case 3:
                      this.miPreg = item.lastRes.pregunta04.Preg; 
                      this.miRta = item.lastRes.pregunta04.Rta;
                    break;
                    case 4:
                      this.miPreg = item.lastRes.pregunta05.Preg; 
                      this.miRta = item.lastRes.pregunta05.Rta;
                    break;
                    
                   }      
           var dato = new datos(this.miPreg, this.miRta, null, null); 
           this.arrayPregRta.push(dato);   
          }

          this.correctas = item.resCorrectas;
          this.incorrectas = item.resIncorrectas;
          var dato2 = new datos(null, null,this.correctas, this.incorrectas);
          this.arrayPregRta.push(dato2);


      }
  }
    ));

this.settings = { 
              columns : { 
                pregunta: {title:"Pregunta",editable:false}, 
                respuesta: {title:"Respuesta",editable:false},
                correct: {title: "Total Respuestas Correctas", editable:false },
                incorrect: {title: "Total Respuestas Incorrectas", editable: false}
      
                        },    
              noDataMessage: "No hay datos para mostrar", 
              actions: { 
                edit:false,
                add:false,
                delete:false
                      }, 
                 
                }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Result');
  }

}

export class datos
{
    pregunta;
    respuesta;
    correct;
    incorrect;
    constructor(pregunta,respuesta,correct,incorrect)
    {
      this.pregunta = pregunta;
      this.respuesta = respuesta;
      this.correct = correct;
      this.incorrect = incorrect;
    }

}