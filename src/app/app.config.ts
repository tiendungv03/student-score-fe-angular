import { ApplicationConfig, NgZone } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, Auth, getAuth } from '@angular/fire/auth';
import {
  provideFirestore,
  Firestore,
  getFirestore,
} from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    {
      provide: Auth,
      useFactory: (zone: NgZone) => zone.run(() => getAuth()),
      deps: [NgZone],
    },
    {
      provide: Firestore,
      useFactory: (zone: NgZone) => zone.run(() => getFirestore()),
      deps: [NgZone],
    },
    // nếu dùng Storage, Analytics tương tự...
  ],
};
