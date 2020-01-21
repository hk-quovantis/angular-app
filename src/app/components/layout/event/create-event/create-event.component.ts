import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { QHttpService } from '../../../../services/q-http.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EventService } from '../event.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  eventForm:FormGroup;
  submitted:boolean;

  usersList:any = [];
  dropdownSettings:IDropdownSettings;

  constructor(private _fb:FormBuilder, private _qHttp:QHttpService, private _http:HttpClient, private _router:Router, private _eventService:EventService) {
    this.submitted = false;
    this._eventService.updateStatus(false);
   }

  ngOnInit() {
    this.eventForm = this._fb.group({
      title: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      users: ['', [Validators.required]],
      descriptions: ['', [Validators.required,Validators.minLength(100)]]
    })

    this._http.get('https://jsonplaceholder.typicode.com/users')
      .subscribe(
        response => {
          console.log(response);
          this.usersList = response;
        }
      )

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  get f() { return this.eventForm.controls; }

  saveEvent() {
    this.submitted = true;

    console.log(this.eventForm.value.startDate);
  }

  redirectBack() {
    this._eventService.updateStatus(true);
    this._router.navigate(['/welcome/event']);
  }
}
