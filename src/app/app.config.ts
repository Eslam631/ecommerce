import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { headerInterceptor } from './core/interceptor/header.interceptor';
import { erroesInterceptor } from './core/interceptor/erroes.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { loadingInterceptor } from './core/interceptor/loading.interceptor';
import { NgxPaginationModule } from 'ngx-pagination';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes,withHashLocation(), withViewTransitions()),
  provideClientHydration(),
  provideHttpClient(withFetch(),withInterceptors([headerInterceptor,erroesInterceptor,loadingInterceptor,])),
provideAnimations(),
provideToastr(),

importProvidersFrom(NgxSpinnerModule,BrowserModule, NgxPaginationModule , BrowserAnimationsModule),


]
};
