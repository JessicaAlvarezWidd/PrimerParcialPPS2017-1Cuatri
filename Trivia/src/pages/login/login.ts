import { Component } from '@angular/core';
import { NavController,ViewController } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import { Trivia } from '../trivia/trivia'


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  
  user = {}; 

  constructor(public navCtrl: NavController,public af: AngularFire,public view:ViewController) {

  }   
  
  Login(datos) {
      this.af.auth.login({ email: datos.MailIngresado, password: datos.ClaveIngresa }).then(
      (result) => {
          // all good, lets move on
          console.log(result);
          //this.navCtrl.push(Trivia);
      },
      (err) => {
          // something didn't work
        console.log(err);
        alert(err);
      }
    );    
  } 


}
