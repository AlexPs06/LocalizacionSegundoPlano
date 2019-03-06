import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
var config = {
  apiKey: "AIzaSyDOsAWRaZf9s1MJtNJx7YXg-0Hv4AI38Dw",
  authDomain: "seguimiento-74dde.firebaseapp.com",
  databaseURL: "https://seguimiento-74dde.firebaseio.com",
  projectId: "seguimiento-74dde",
  storageBucket: "seguimiento-74dde.appspot.com",
  messagingSenderId: "828694755449"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    //AngularFireModule.initializeApp(config),
    //AngularFirestoreModule,
    BrowserModule, 
    IonicModule.forRoot(),
    AppRoutingModule,
  
    ],
  providers: [
    //Firebase,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
