import { Component, OnInit } from '@angular/core';
import { EventService } from '././event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  shown:boolean;
  constructor(private _eventService:EventService) { }

  ngOnInit() {
    this._eventService.currentStatus.subscribe(status => this.shown = status)
  }

  hideContent() {
    this._eventService.updateStatus(false);
  }

}
