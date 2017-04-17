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

  constructor(public navCtrl: NavController, public navParams: NavParams,af: AngularFire) {
    this.items = af.database.list('/Trivia');
    console.log(this.items);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Trivia');
  }

}
