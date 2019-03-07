import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as firebase from 'firebase';
import { getFirstTemplatePass } from '@angular/core/src/render3/state';

declare var google;

@Component({
  selector: 'app-visualizador',
  templateUrl: './visualizador.page.html',
  styleUrls: ['./visualizador.page.scss'],
})

export class VisualizadorPage implements OnInit {

  @ViewChild('mapa') mapElement: ElementRef;
  ref=firebase.database().ref('ruta');
  map:any;
  rutaSeguir:any =[]
  mapaActual=null;

  constructor() { }

  ngOnInit() {
    
    this.ref.on('value',response=>{
      let datos=snapshotToArray(response)
      this.rutaSeguir = datos
      this.getMapa()
      this.drawRoute(this.rutaSeguir)
    });
  }

  drawRoute(path){
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

  getMapa(){

    let mapOptions = {
      zoom: 14,
      mapTypeControl: false,
      streetViewControl: false,
      fullScreenControl: false
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions); 

    let latitud = 0, longitud = 0

    this.rutaSeguir.forEach(element => {
      console.log('Entre')
      console.log('Latitud: ' + element.lat + 'Longitud: '+  element.lng)
      latitud = element.lat, longitud = element.lng
    });

    console.log('Latitud: ' + latitud + 'Longitud: '+ longitud)

    let latLng = new google.maps.LatLng(latitud, longitud);
    this.map.setCenter(latLng);
    this.map.setZoom(20);

  }

}

export const snapshotToArray=snapshot=>{
  let returnArr =[]
  snapshot.forEach(childSnapshot => {
    let item=childSnapshot.val();
    item.key=childSnapshot.key;
    returnArr.push(item);
  });
  return returnArr;

}
