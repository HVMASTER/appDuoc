import { Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { GmapService } from 'src/app/services/gmaps/gmap.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true
})
export class MapComponent  implements OnInit, OnDestroy {

  @ViewChild('map', {static: true}) mapElementRef: ElementRef;
  googleMaps: any;
  // source: any = { lat: -33.033611507141515, lng: -71.53317344099422 };
  // dest: any = { lat: -33.024471184403545, lng: -71.55180894757042 };
  map: any;
  directionsService: any;
  directionsDisplay: any;
  source_marker: any;
  destination_marker: any;
  trackSub: Subscription;
  @Input()
  origen: any;
  @Input()
  destino: any;
  
  origenLat: number;
  origenLng: number;
  destLat: number;
  destLng: number;

  constructor(
    private maps: GmapService,
    private renderer: Renderer2,
  ) { }

  ngOnInit() {
    console.log('origen: ', this.origen);
    console.log('destino: ', this.destino);
    
    // Obtener las coordenadas de origen
    this.maps.getGeocodingData(this.origen).then((result: any) => {
      this.origenLat = result.lat;
      this.origenLng = result.lng;
      console.log('origen: ', this.origenLat, this.origenLng);
    });
    
    // Obtener las coordenadas de destino
    this.maps.getGeocodingData(this.destino).then((result: any) => {
      this.destLat = result.lat;
      this.destLng = result.lng;
      console.log('destino: ', this.destLat, this.destLng);
    });

  }

  ngAfterViewInit() {
    timer(500).subscribe(() => {
      this.loadMap();
    }, err => {
      console.log(err);
    });
  }

  // Función para cargar el mapa de Google Maps
  async loadMap() {
    try {
      console.log('map');
      let googleMaps: any = await this.maps.loadGoogleMaps();
      const mapEl = this.mapElementRef.nativeElement;
      // Crear un nuevo mapa con algunas opciones de configuración
      this.map = new googleMaps.Map(mapEl, {
        center: { lat: this.origenLat, lng: this.origenLng },
        disableDefaultUI: true,
        zoom: 10,
      });
      // Inicializar los servicios de direcciones de Google Maps
      this.directionsService = new googleMaps.DirectionsService;
      this.directionsDisplay = new googleMaps.DirectionsRenderer();
      this.directionsDisplay.setMap(this.map);
      
      const source_position = new googleMaps.LatLng(this.origenLat, this.origenLng);
      //const destination_position = new googleMaps.LatLng(this.destLat, this.destLng);

      const source_icon = {
        //url: sourceIconUrl,
        scaledSize: new googleMaps.Size(35, 35), // scaled size
        origin: new googleMaps.Point(0, 0), // origin
        anchor: new googleMaps.Point(17.5, 35) // anchor
      };

      // Crear marcador de origen y agregarlo al mapa
      this.source_marker = new googleMaps.Marker({
        map: this.map,
        position: source_position,
        animation: googleMaps.Animation.DROP,
        icon: source_icon,
      });

      // Crear marcador de destino y agregarlo al mapa
      this.destination_marker = new googleMaps.Marker({
        map: this.map,
      });

      this.source_marker.setMap(this.map);
      this.destination_marker.setMap(this.map);

      // Configurar el servicio de direcciones para mostrar las rutas en el mapa

      // Dibujar la ruta inicial
      await this.drawRoute();

      // Centrar el mapa en la posición del origen y hacerlo visible
      this.map.setCenter(source_position);
      this.renderer.addClass(mapEl, 'visible');
    } catch(e) {
      console.log(e);
    }
  }

  // Función para dibujar la ruta utilizando el servicio de direcciones de Google Maps
  drawRoute() {
    this.directionsService.route({
      origin: this.origen,
      destination: this.destino,
      travelMode: 'DRIVING',
      provideRouteAlternatives: true
    }, (response, status) => {
      if (status === 'OK') {
        // Mostrar la ruta en el mapa
        this.directionsDisplay.setDirections(response);
        console.log('response: ', response);
        const directionsData = response.routes[0].legs[0];
        console.log(directionsData);
        const duration = directionsData.duration.text;
        console.log(duration);
      } else {
        console.log(status);
      }
    });
  }

  // changeMarkerPosition(data) {
  //   const newPosition = { lat: data?.lat, lng: data?.lng }; // Set the new marker position coordinates
  //   this.source_marker.setPosition(newPosition);
  //   // this.map.panTo(newPosition); // Pan the map to the new marker position
  //   this.drawRoute();
  // }

  centrarMapaEnOrigen() {
    // Verifica si el mapa y las coordenadas de origen existen
    if (this.map && this.origenLat !== undefined && this.origenLng !== undefined) {
    // Centra el mapa en las coordenadas de origen
      this.map.setCenter({ lat: this.origenLat, lng: this.origenLng });
      
    }
  }

  // Método para desuscribirse de la suscripción para evitar pérdidas de memoria
  ngOnDestroy(): void {
      if(this.trackSub) this.trackSub.unsubscribe();
  }

}
