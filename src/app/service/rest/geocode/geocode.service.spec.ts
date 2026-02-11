import { TestBed } from '@angular/core/testing';

import {
  HttpTestingController,
  provideHttpClientTesting,
  TestRequest,
} from '@angular/common/http/testing';
import { Subscription } from 'rxjs';
import { invalidMockGeocode } from '../../../mock/model/geocode/invalid-mock-geocode';
import { mockGeocode } from '../../../mock/model/geocode/mock-geocode';
import { Address } from '../../../model/geocode/address.model';
import { Geocode } from '../../../model/geocode/geocode.model';
import { GeocodeService } from './geocode.service';

describe('GeocodeService', () => {
  let service: GeocodeService;
  let backEnd: HttpTestingController;
  let baseUrl: string;
  let tracker: Subscription;
  const address: Address = {
    street: '1535 Broadway',
    city: 'New York',
    state: 'NY',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    service = TestBed.inject(GeocodeService);
    backEnd = TestBed.inject(HttpTestingController);
    baseUrl = 'https://geocoding.geo.census.gov/geocoder/locations/address?';
    tracker = new Subscription();
  });

  afterEach(() => {
    backEnd.verify();

    tracker.unsubscribe();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve a valid geocode when retrieving by known address', () => {
    tracker.add(
      service.getGeocodeJsonp(address).subscribe((result: Geocode) => {
        expect(result).toEqual(mockGeocode);
      }),
    );

    const call: TestRequest = backEnd.expectOne({
      url: `${baseUrl}street=${address.street}&city=${address.city}&state=${address.state}&benchmark=4&format=jsonp&callback=JSONP_CALLBACK`,
      method: 'JSONP',
    });

    call.flush(mockGeocode);
  });

  it('should retrieve an invalid geocode when retrieving by unknown address', () => {
    tracker.add(
      service.getGeocodeJsonp(address).subscribe((result: Geocode) => {
        expect(result).toEqual(invalidMockGeocode);
      }),
    );

    const call: TestRequest = backEnd.expectOne({
      url: `${baseUrl}street=${address.street}&city=${address.city}&state=${address.state}&benchmark=4&format=jsonp&callback=JSONP_CALLBACK`,
      method: 'JSONP',
    });

    call.flush(invalidMockGeocode);
  });
});
