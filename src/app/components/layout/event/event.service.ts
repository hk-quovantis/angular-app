import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  private status = new BehaviorSubject(true);
  currentStatus = this.status.asObservable();

  constructor() { }

  updateStatus(status:boolean) {
    this.status.next(status);
  }
}
