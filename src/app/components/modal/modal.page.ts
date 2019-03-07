import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavParams } from '@ionic/angular';

declare var google;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  @ViewChild('mapa') mapElement: ElementRef;

  currentMapTrack = null
  routers = null
  map:any;

  constructor(navParams: NavParams) {
    this.routers = navParams.get('routers')
  }

  ngOnInit() {
    let mapOptions = {
      zoom: 14,
      mapTypeControl: false,
      streetViewControl: false,
      fullScreenControl: false
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    let latLng = null
    this.routers.forEach(element => {
      latLng = new google.maps.LatLng(element.lat, element.lng);
    });
    this.map.setCenter(latLng);
    this.map.setZoom(20);
    this.drawRoute(this.routers)
  }

  drawRoute(path){
    console.log('Imprimo')
    console.log(path)
    if (path.length > 1) {
      this.currentMapTrack = new google.maps.Polyline({
        path: path,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });

      this.currentMapTrack.setMap(this.map);
    }
  }

}
