import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withJsonpSupport, withXhr } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    // Add JSONP support
    provideHttpClient(withXhr(), withJsonpSupport()),
    // Zoneless application
    provideZonelessChangeDetection(),
  ],
};
