import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-event',
  templateUrl: './my-event.component.html',
  styleUrls: ['./my-event.component.css']
})
export class MyEventComponent implements OnInit {

  constructor(private _eventService:EventService, private _router:Router) {
    this._eventService.updateStatus(false);
   }

  ngOnInit() {
  }

  redirectBack() {
    this._eventService.updateStatus(true);
    this._router.navigate(['/welcome/event']);
  }
}
