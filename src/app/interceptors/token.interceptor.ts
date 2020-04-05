import { AuthenticationService } from './../services/authentication.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private navController: NavController,
    private authenticationService: AuthenticationService,
    private toastController: ToastController) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authenticationService.isAuthenticated) {
      request = request.clone({
        setHeaders: {
          Authorization:  `Bearer ${this.authenticationService.idToken}`
        }
      });
    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        setHeaders: {
          'content-type': 'application/json'
        }
      });
    }

    request = request.clone({
      headers: request.headers.set('Accept', 'application/json')
    });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          if (error.error.success === false) {
            console.log('Login failed');
            // this.presentToast('Login failed');
          } else {
            this.navController.navigateRoot('login');
          }
        }
        return throwError(error);
      }));
  }
}

