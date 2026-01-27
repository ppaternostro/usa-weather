import { TestBed } from '@angular/core/testing';

import { HttpHandler, provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
  TestRequest,
} from '@angular/common/http/testing';
import { Subscription } from 'rxjs';
import { mockForecast } from '../../../../mock/model/weather/forecast/mock-forecast';
import { mockGrid } from '../../../../mock/model/weather/point/mock-grid';
import { Forecast } from '../../../../model/weather/forecast/forecast.model';
import { ForecastService } from './forecast.service';

describe('ForecastService', () => {
  let service: ForecastService;
  let backEnd: HttpTestingController;
  let baseUrl: string;
  let suffixUrl: string;
  let tracker: Subscription;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpHandler, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ForecastService);
    backEnd = TestBed.inject(HttpTestingController);
    baseUrl = 'https://api.weather.gov/gridpoints/';
    suffixUrl = '/forecast';
    tracker = new Subscription();
  });

  afterEach(() => {
    backEnd.verify();

    tracker.unsubscribe();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve a forcecast when passing a grid', () => {
    tracker.add(
      service.getForecast(mockGrid).subscribe((result: Forecast) => {
        expect(result).toEqual(mockForecast);
      }),
    );

    const call: TestRequest = backEnd.expectOne({
      url: `${baseUrl}${mockGrid.gridId}/${mockGrid.gridX},${mockGrid.gridY}${suffixUrl}`,
      method: 'GET',
    });

    call.flush(mockForecast);
  });
});
