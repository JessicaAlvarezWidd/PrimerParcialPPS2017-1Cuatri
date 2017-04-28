import { Component } from '@angular/core';
import { NavController,ViewController, ModalController } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import { Ppt } from '../ppt/ppt';
import { SignInPage } from '../signin/signin';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  
  user = {}; 

  constructor(public navCtrl: NavController, public af: AngularFire, public view:ViewController, public modalContr:ModalController) {

  }   
  
  Login(datos) {
      this.af.auth.login({ email: datos.MailIngresado, password: datos.ClaveIngresa }).then(
      (result) => {
          // all good, lets move on
          this.navCtrl.setRoot(Ppt);
          console.log(result);

      },
      (err) => {
          // something didn't work
        console.log(err);
        alert(err);
      }
    );    
  } 

  singIn()
  {
    let reForm = this.modalContr.create(SignInPage)
    reForm.present();
  }


}
