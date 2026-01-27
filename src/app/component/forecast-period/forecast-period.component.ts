import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Period } from '../../model/weather/forecast/period.model';

@Component({
  selector: 'app-forecast-period',
  imports: [MatCardModule, CommonModule],
  templateUrl: './forecast-period.component.html',
  styleUrl: './forecast-period.component.css',
})
export class ForecastPeriodComponent {
  period = input<Period>();
}
