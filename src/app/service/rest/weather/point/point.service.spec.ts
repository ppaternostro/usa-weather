import { TestBed } from '@angular/core/testing';

import {
  HttpTestingController,
  provideHttpClientTesting,
  TestRequest,
} from '@angular/common/http/testing';
import { Subscription } from 'rxjs';
import { mockGeocode } from '../../../../mock/model/geocode/mock-geocode';
import { mockPoint } from '../../../../mock/model/weather/point/mock-point';
import { Point } from '../../../../model/weather/point/point.model';
import { PointService } from './point.service';

describe('PointService', () => {
  let service: PointService;
  let backEnd: HttpTestingController;
  let baseUrl: string;
  let tracker: Subscription;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    service = TestBed.inject(PointService);
    backEnd = TestBed.inject(HttpTestingController);
    baseUrl = 'https://api.weather.gov/points/';
    tracker = new Subscription();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve a point when passing latitude and longitude', () => {
    tracker.add(
      service
        .getPoint(
          mockGeocode.result.addressMatches[0].coordinates.y,
          mockGeocode.result.addressMatches[0].coordinates.x,
        )
        .subscribe((result: Point) => {
          expect(result).toEqual(mockPoint);
        }),
    );

    const call: TestRequest = backEnd.expectOne({
      url: `${baseUrl}${mockGeocode.result.addressMatches[0].coordinates.y},${mockGeocode.result.addressMatches[0].coordinates.x}`,
      method: 'GET',
    });

    call.flush(mockPoint);
  });
});
