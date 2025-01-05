import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideHttpClient} from "@angular/common/http";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import { MessageService } from 'primeng/api';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideHttpClient(),provideRouter(routes),provideAnimationsAsync(),MessageService]
};
