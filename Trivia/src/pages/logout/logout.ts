import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html'
})
export class LogoutPage {


  constructor(public navCtrl: NavController, public navParams: NavParams,public af: AngularFire) {
    af.auth.subscribe(auth => console.log(auth));
    af.auth.logout();
    navCtrl.push(LoginPage);
  }


}
