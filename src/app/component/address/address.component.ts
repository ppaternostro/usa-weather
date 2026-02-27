import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, finalize, Observable, of, switchMap, throwError } from 'rxjs';
import { Address } from '../../model/geocode/address.model';
import { Geocode } from '../../model/geocode/geocode.model';
import { usaStates } from '../../model/state/state.model';
import { Forecast } from '../../model/weather/forecast/forecast.model';
import { Point } from '../../model/weather/point/point.model';
import { GeocodeService } from '../../service/rest/geocode/geocode.service';
import { ForecastService } from '../../service/rest/weather/forecast/forecast.service';
import { PointService } from '../../service/rest/weather/point/point.service';
import { ForecastPeriodComponent } from '../forecast-period/forecast-period.component';

@Component({
  selector: 'app-address',
  imports: [
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ForecastPeriodComponent,
    MatProgressBarModule,
  ],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss',
})
export class AddressComponent {
  private geocodeService = inject(GeocodeService);
  private pointService = inject(PointService);
  private forecastService = inject(ForecastService);
  private snackBar = inject(MatSnackBar);

  address = signal<Address>({} as Address);
  submitting = signal<boolean>(false);
  forecast$?: Observable<Forecast>;
  states = usaStates;

  onSubmit(): void {
    this.submitting.set(true);
    this.forecast$ = this.geocodeService.getGeocodeJsonp(this.address()).pipe(
      switchMap((geocode: Geocode) =>
        geocode.result.addressMatches.length != 0 &&
        geocode.result.addressMatches[0].matchedAddress.includes(`, ${this.address().state},`)
          ? this.pointService.getPoint(
              geocode.result.addressMatches[0].coordinates.y,
              geocode.result.addressMatches[0].coordinates.x,
            )
          : throwError(() => new Error('No geocode found for specified address!')),
      ),
      // Handle the error thrown from the switchMap
      catchError((error) => {
        this.snackBar.open(`Error - ${error.message}`, 'Close');

        // Return a fallback empty observable
        return of();
      }),
      finalize(() => this.submitting.set(false)),
      switchMap((point: Point) => this.forecastService.getForecast(point.properties)),
    );
  }

  onClear(form: NgForm): void {
    form.resetForm();
    this.forecast$ = of();
  }
}
