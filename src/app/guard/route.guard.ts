import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {
  
  constructor(private _authService: AuthService, private _route: Router) {}

  canActivate(): boolean {
    if (this._authService.isLoggedIn()) {
      this._route.navigate(['welcome'])
      return false
    } else {
      return true
    }
  }
}
