import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx'
import {Network} from '@ionic-native/network/ngx'
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';

import { from, Subscription } from 'rxjs';
import { ToastController, ModalController, Platform } from '@ionic/angular';
import * as firebase from 'firebase';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { ModalPage } from '../components/modal/modal.page'

declare var google;


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('mapa') mapElement: ElementRef;
  ref=firebase.database().ref();
  map:any;
  rutaSeguir:any =[]
  tomandoRuta=false;
  mapaActual=null;
  rutasAntiguas:any=[]
  startPressed = false
  
  //key= AIzaSyDvnrn4179xHiXqCU_8c_ot4VeIJEcrNJ8
  postionSubscription: Subscription;
  constructor(
    private geolocalizacion:Geolocation,
    private network:Network,
    public toastController: ToastController,
    private backgroundMode: BackgroundMode,
    private plt: Platform,
    private modalController: ModalController
  ){
    

    this.ref.on('value',response=>{
      let datos=snapshotToArray(response)
        console.log("Datos ",datos);
        this.rutasAntiguas = datos
    });

    let connectSubscription = this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      // We just got a connection but we need to wait briefly
       // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          console.log('we got a wifi connection, woohoo!');
        }
        if(this.network.type==='none'){
          console.log('we got perdion todo connection, woohoo!');
        }
      }, 3000);
      this.presentToast();
      console.log("entre")
    });
    connectSubscription.unsubscribe(); 
  }
  ngOnInit(){
    this.backgroundMode.enable();
   
    this.plt.ready().then(() =>{
      this.cargarRutas();

      let mapOptions = {
        zoom: 14,
        mapTypeControl: false,
        streetViewControl: false,
        fullScreenControl: false
      };
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    
      this.geolocalizacion.getCurrentPosition().then(pos => {
        console.log("esto es pos"+pos)
        let latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        this.map.setCenter(latLng);
        this.map.setZoom(20);
      });
    
     
    });
  }
  visualizarPosiciones(){
    
  }
  iniciarRecorrido(){
    this.iniciarRecorridoPosicion()
    this.backgroundMode.on("activate").subscribe(() =>{
      console.log("Se inicia Tracking en segundo plano!")
      this.tomarSegundoPlano();
    })
  }
  cargarRutas(){

  }
  tomarSegundoPlano(){
    this.tomandoRuta = true;
    firebase.database().ref("ruta").remove();
    this.postionSubscription = this.geolocalizacion.watchPosition()
    .subscribe(data => {
      setTimeout(() =>{
        console.log(data)
        this.rutaSeguir.push(
          {
            lat: data.coords.latitude,
            lng: data.coords.longitude
          });
          firebase.database().ref("ruta").update(this.rutaSeguir)
          this.dibujarRuta(this.rutaSeguir);
      },30000);
    })
  }
  iniciarRecorridoPosicion(){
    this.tomandoRuta = true;
    this.startPressed = true;
    this.rutaSeguir =[];

    this.postionSubscription = this.geolocalizacion.watchPosition()
    .subscribe(data => {
      setTimeout(() =>{
        console.log(data.coords)
        this.rutaSeguir.push(
          {
            lat: data.coords.latitude,
            lng: data.coords.longitude
          });
          this.dibujarRuta(this.rutaSeguir);
        
      },5000);
    })
  }
  dibujarRuta(path){
    if (this.mapaActual) {
      this.mapaActual.setMap(null);
    }

    if (path.length > 1) {
      this.mapaActual = new google.maps.Polyline({
        path: path,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });

      this.mapaActual.setMap(this.map);
    }
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your settings have been saved.',
      duration: 2000
    });
    toast.present();
  }

  detenerRecorrido(){

    this.startPressed = false;

    let newRoute = {
      finished: new Date().getTime(),
      ruta: this.rutaSeguir

    };
    
    this.ref.push(newRoute);

    this.tomandoRuta = false;
    this.postionSubscription.unsubscribe();
    
  }

  async showHistoryRoute(router){
    console.log('Ruta: ')
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: { 'routers': router }
    });
    return await modal.present();
  }


}
export const snapshotToArray=snapshot=>{
  console.log("snapshot: ",snapshot);
  let returnArr =[]
  let counter = 0
  snapshot.forEach(childSnapshot => {
    let item=childSnapshot.val();
    item.key=childSnapshot.key;
    returnArr.push({ 'item': item, 'id': counter });
    counter += 1
  });
  return returnArr;

}

export const snapshotToObject= snapshot=>{
  let item=snapshot.key;
  item=snapshot.key;

  return item;
}