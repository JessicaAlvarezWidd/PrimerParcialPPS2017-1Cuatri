import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SignInPage {

  persona = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,public af: AngularFire, public viewContr:ViewController, public alertCtrl: AlertController) {

  }

  registrar(per)
  {
    if(per.nombre != undefined)
    {
      try
      {
        this.af.auth.createUser({email:per.email,password:per.password}).then(
          (usuario) => {
          // all good, lets move on
          usuario.auth.updateProfile({displayName: per.nombre,photoURL: ''});
          console.log(usuario);
          this.af.auth.logout();         
          this.viewContr.dismiss(); 
          },
        (err) => {
          // something didn't work
          console.log(err);
          if(err.message == "Password should be at least 6 characters." || err.message == "Password should be at least 6 characters")
                    {this.presentAlert("La contraseña debe tener al menos 6 caracteres");}
        }

    );}
    catch(error)
    {
      var mensaje = "";
      if(error.message == 'createUserWithEmailAndPassword failed: First argument "email" must be a valid string.')    
          {mensaje = "El Email debe ser valido";}    
      if(error.message == 'createUserWithEmailAndPassword failed: Second argument "password" must be a valid string.')
          {mensaje = "Falta completar Password";}
      this.presentAlert(mensaje);

    }
  }
  else
    {
      this.presentAlert("No puede ser vacio el Nombre");
    }
      
  }

  cancelar()
  {
    this.viewContr.dismiss();
  }

   presentAlert(datoError) {
    let alert = this.alertCtrl.create({
      title: 'ERROR',
      subTitle: datoError,
      buttons: ['OK']
    });
    alert.present();
  }


}
