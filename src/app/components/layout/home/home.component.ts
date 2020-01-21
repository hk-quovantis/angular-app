import { Component, OnInit } from '@angular/core';
import { QHttpService } from '../../../services/q-http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  image:string;
  constructor(private _qHttp: QHttpService) { }

  ngOnInit() {
    this._qHttp.doGet('profile')
      .subscribe(
        response => {
          this.image = response.data.image;
        }
      )
  }

}
