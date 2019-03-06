import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase';
var config = {
  apiKey: "AIzaSyDOsAWRaZf9s1MJtNJx7YXg-0Hv4AI38Dw",
  authDomain: "seguimiento-74dde.firebaseapp.com",
  databaseURL: "https://seguimiento-74dde.firebaseio.com",
  projectId: "seguimiento-74dde",
  storageBucket: "seguimiento-74dde.appspot.com",
  messagingSenderId: "828694755449"
};
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    firebase.initializeApp(config);
  }
}
