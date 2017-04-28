import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFire } from 'angularfire2';

import { LoginPage } from '../pages/login/login';
import { SignInPage } from '../pages/signin/signin';
import { About } from '../pages/about/about';
import { Ppt } from '../pages/ppt/ppt';
import { Result } from '../pages/result/result';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public af:AngularFire) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [     
      { title: 'Lets Play!', component: Ppt },
      { title: 'Resultados', component: Result }, 
      { title: 'Logout', component: LoginPage },
      { title: 'About', component: About }
    
      
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.title == "Logout")
    {
      this.af.auth.logout();
    }        
    this.nav.setRoot(page.component);
  }
}
