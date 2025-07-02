import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { initializeApp } from 'firebase/app';
import { environment } from './environments/environment';

// Thêm dòng này
initializeApp(environment.firebase);
console.log('Firebase config =', environment.firebase);

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
