import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GmapService {

  constructor() { }

  loadGoogleMaps(): Promise<any> {
    const win = window as any;
    const gModule = win.google;
    if(gModule && gModule.maps) {
     return Promise.resolve(gModule.maps);
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src =
        'https://maps.googleapis.com/maps/api/js?key=' +
        environment.googleMapsApiKey;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const loadedGoogleModule = win.google;
        if(loadedGoogleModule && loadedGoogleModule.maps) {
          resolve(loadedGoogleModule.maps);
        } else {
          reject('Google Map SDK is not Available');
        }
      };
    });
  } 
  
  //funcion para obtener la posicion actual del usuario
  getGeocodingData(address: string) {
    return this.loadGoogleMaps().then((googleMaps) => {
      const geocoder = new googleMaps.Geocoder();
      return new Promise((resolve, reject) => {
        geocoder.geocode({ address }, (results, status) => {
          if(status === googleMaps.GeocoderStatus.OK) {
            const result = results[0];
            const position = {
              lat: result.geometry.location.lat(),
              lng: result.geometry.location.lng()
            };
            resolve(position);
          } else {
            reject('Error in geocoding: ' + status);
          }
        });
      });
    });
  }

  //funcion para validar que la direccion de origen y destino existan en google maps
  async validatorAdress(address: string) {
    return this.loadGoogleMaps().then((googleMaps) => {
      const geocoder = new googleMaps.Geocoder(); //geocoder es una funcion de google maps que permite validar direcciones
      return new Promise((resolve, reject) => {
        geocoder.geocode({ address }, (results, status) => {
          if(status === googleMaps.GeocoderStatus.OK) {
            resolve(results);
          } else {
            reject(false);
          }
        });
      });
    });
  }

  
  //funcion para autocompletar el input de la direccion de origen y destino
  async autoComplete(input: string) {
    return this.loadGoogleMaps().then((googleMaps) => {
      const autocompleteService = new googleMaps.places.AutocompleteService(); 
      return new Promise((resolve, reject) => {
        autocompleteService.getPlacePredictions({ input }, (results, status) => { //getPlacePredictions es una funcion de google maps que permite autocompletar direcciones
          if(status === googleMaps.places.PlacesServiceStatus.OK && results) {
            resolve(results);
          } else {
            reject(false);
          }
        });
      });
    });
  }

}
