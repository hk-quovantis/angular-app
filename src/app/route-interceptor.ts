import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpResponse, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from "rxjs/operators";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()

export class RouteInterceptor implements HttpInterceptor {

    _host:string;

    constructor (private _router:Router, private _toastr:ToastrService) {
        
        this._host = 'http://localhost/quovantis/api';
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {       
        
        if (!(req.url == 'login' || req.url == 'signup' || req.url == 'forgotPassword')) {
            req = req.clone({
                setHeaders: {'Authorization': 'Bearer '+localStorage.getItem('token')}
            });    
        }
        
        req = req.clone({
            url: this._host+'/'+req.url
        });
        
        return next.handle(req).pipe(
            tap(evt => {
                if (evt instanceof HttpResponse && evt.body.status == 403) {
                    this._toastr.error(evt.body.error, 'Warning!');
                    this._router.navigate(['login']);
                    localStorage.setItem('token', '');
                }                
            }),
        );
    }
}
