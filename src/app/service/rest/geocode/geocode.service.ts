import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../../../model/geocode/address.model';
import { Geocode } from '../../../model/geocode/geocode.model';
import { GenericService } from '../generic.service';

@Injectable({
  providedIn: 'root',
})
export class GeocodeService extends GenericService<Geocode, Geocode> {
  private baseUrl = 'https://geocoding.geo.census.gov/geocoder/locations/address?';

  public getGeocode(address: Address): Observable<Geocode> {
    return this.read(
      `${this.baseUrl}street=${address.street}&city=${address.city}&state=${address.state}&benchmark=4&format=json`,
    );
  }

  public getGeocodeJsonp(address: Address): Observable<Geocode> {
    return this.readJsonp(
      `${this.baseUrl}street=${address.street}&city=${address.city}&state=${address.state}&benchmark=4&format=jsonp`,
      'callback',
    );
  }
}
