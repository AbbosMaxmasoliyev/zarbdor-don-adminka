// app.config.ts
import { ApplicationConfig, APP_INITIALIZER } from '@angular/core';
import { provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/lara';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { IconService } from './service/icon.service';
import { HttpInterceptorService } from './service/http-interceptor.service';

// APP_INITIALIZER factory funksiyasi
export function initializeIcons(iconService: IconService): () => void {
  return () => { }; // Agar iconService.registerIcons() chaqirishni xohlasangiz, shu yerda bajaring.
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(), // HttpClient uchun provayder
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideAnimationsAsync(),
    providePrimeNG({

      theme: {
        preset: Aura,
        options: {
          darkModeSelector: "'.my-app-dark'"
        }

      }
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeIcons,
      deps: [IconService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ]
};
