import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
/**
 * Generated class for the About page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class About {

  constructor(public navCtrl: NavController, public navParams: NavParams,public af: AngularFire) {
    //af.auth.logout();
    af.auth.subscribe(auth => console.log(auth));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad About');
  }

}
