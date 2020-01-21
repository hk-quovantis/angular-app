import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.css']
})
export class InvitationComponent implements OnInit {

  name:string;
  constructor(private _eventService: EventService, private _router: Router) {
    this._eventService.updateStatus(false);
   }

  ngOnInit() { 
    this.name = 'Himanshu';
  }

  redirectBack() {
    this._eventService.updateStatus(true);
    this._router.navigate(['/welcome/event']);
  }
}
