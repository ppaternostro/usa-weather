export interface Period {
  number: number;
  name: string; // Day of week
  startTime: Date; // ISO 8601 UTC string
  endTime: Date; // ISO 8601 UTC string
  isDayTime: boolean;
  temperature: number;
  temperatureUnit: string; // F - Farenheight, C - Celcius
  windSpeed: string;
  windDirection: string;
  icon: string; // Condition icon URL
  shortForecast: string;
  detailedForecast: string;
}
