import { Observable } from 'rxjs';
import { AuthenticationService } from './auth/authentication.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private authenticationService: AuthenticationService) { }

  
}
