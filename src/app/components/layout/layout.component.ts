import { Component, OnInit } from '@angular/core';
import { QHttpService } from '../../services/q-http.service';
import { Router } from '@angular/router';
import { EventService } from '../layout/event/event.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(private _qHttp: QHttpService, private _router: Router, private _eventService: EventService) {  }

  ngOnInit() { }

  logout() {
    this._qHttp.doPost('logout', '')
      .subscribe(
        response => {
          localStorage.setItem('token', '');
          this._router.navigate(['login']);
        }
      )
  }

  updateEvent() {
    this._eventService.updateStatus(true);
  }
}
