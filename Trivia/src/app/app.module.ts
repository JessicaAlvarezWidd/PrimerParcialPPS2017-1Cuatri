import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { LogoutPage } from '../pages/logout/logout';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { About } from '../pages/about/about';
import { Trivia } from '../pages/trivia/trivia';

const myFirebaseConfig = {
    apiKey: "AIzaSyCyGVM1-cKIC_mpxB6qMgQt_qvfBoYbIKc",
    authDomain: "trivia-4fa7a.firebaseapp.com",
    databaseURL: "https://trivia-4fa7a.firebaseio.com",
    projectId: "trivia-4fa7a",
    storageBucket: "trivia-4fa7a.appspot.com",
    messagingSenderId: "503762448550"
};

const myFirebaseAuthConfig = { 
  provider: AuthProviders.Password,
  method: AuthMethods.Password,
};



@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    LogoutPage,
    About,
    Trivia
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(myFirebaseConfig,myFirebaseAuthConfig) 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    LogoutPage,
    About,
    Trivia
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
