import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Point } from '../../../../model/weather/point/point.model';
import { GenericService } from '../../generic.service';

@Injectable({
  providedIn: 'root',
})
export class PointService extends GenericService<Point, Point> {
  private baseUrl = 'https://api.weather.gov/points/';

  public getPoint(latitude: number, longitude: number): Observable<Point> {
    return this.read(`${this.baseUrl}${latitude},${longitude}`);
  }
}
