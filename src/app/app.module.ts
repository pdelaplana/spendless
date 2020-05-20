import { SpendingEffects } from './store/spending/spending.effects';
import { AuthEffects } from './store/auth/auth.effects';
import { AccountEffects } from './store/account/account.effects';
import { TokenInterceptor } from './interceptors/token.interceptor';

import { CommonUIService } from './services/common-ui.service';
import { AuthenticationService } from './services/auth/authentication.service';
import { ComponentMessagingService } from './services/component-messaging.service';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { LoggerModule, NgxLoggerLevel, NGXLogger } from 'ngx-logger';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { StoreModule, META_REDUCERS } from '@ngrx/store';
import { reducers, metaReducers, loggerFactory } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';


@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    LoggerModule.forRoot({
      serverLoggingUrl: '/api/logs',
      level: NgxLoggerLevel.TRACE,
      serverLogLevel: NgxLoggerLevel.ERROR,
      disableConsoleLogging: false
    }),
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([
      AppEffects,
      AccountEffects,
      AuthEffects,
      SpendingEffects
    ])
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CommonUIService,
    ComponentMessagingService,
    AuthenticationService,
    /*
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptor,
      multi: true
    },
    */
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    {
      provide: META_REDUCERS,
      deps: [NGXLogger],
      useFactory: loggerFactory,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
