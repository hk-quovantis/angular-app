import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QHttpService {

  private headers: any;

  constructor(private _http:HttpClient) { 
    
    this.headers = {
      'Content-Type': 'application/json'
    };
  }

  doGet(apiName, data = null): Observable<any> {
    return this._http.get(apiName, { headers: (this.headers)});
  }

  doPost(apiName, data = null, isFormData = 0): Observable<any> {
    if(isFormData) {
      this.headers = {
        'Authorization': 'Bearer '+localStorage.getItem('token')
      };
    }
    
    return this._http.post(apiName, data, { headers: (this.headers)});
  }
}
