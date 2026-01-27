import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Forecast } from '../../../../model/weather/forecast/forecast.model';
import { Grid } from '../../../../model/weather/point/grid.model';
import { GenericService } from '../../generic.service';

@Injectable({
  providedIn: 'root',
})
export class ForecastService extends GenericService<Forecast, Forecast> {
  private baseUrl = 'https://api.weather.gov/gridpoints/';
  private suffixUrl = '/forecast';

  public getForecast(grid: Grid): Observable<Forecast> {
    return this.read(`${this.baseUrl}${grid.gridId}/${grid.gridX},${grid.gridY}${this.suffixUrl}`);
  }
}
