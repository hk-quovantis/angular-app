import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    
  constructor(private _router:Router, private __authService:AuthService) {}

  canActivate(): boolean {
    if (this.__authService.isLoggedIn()) {
      return true
    } else {
      this._router.navigate(['login'])
      return false
    }
  }
}
