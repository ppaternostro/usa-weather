import { Period } from '../../../../model/weather/forecast/period.model';

export const mockPeriod: Period = {
  number: 1,
  name: 'Monday', // Day of week
  startTime: new Date('2026-01-26T05:00:00Z'),
  endTime: new Date('2026-01-26T05:00:00Z'),
  isDayTime: true,
  temperature: 32,
  temperatureUnit: 'F', // F - Farenheight, C - Celcius
  windSpeed: '5',
  windDirection: 'North',
  icon: 'https://fake-condition-icon-url', // Condition icon URL
  shortForecast: 'Cold',
  detailedForecast: 'Really cold',
};
