import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { QHttpService } from '../../services/q-http.service';
import { Router } from '@angular/router';
import { ToastrService, Toast } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  submitted: boolean = false;
  users: any;
  disabledBtn:boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private _qHttp: QHttpService, private _router: Router, private _toastr:ToastrService) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', [Validators.required, Validators.maxLength(255)]]
    });
  }

  get f() { return this.signupForm.controls; }

  userSignup() {
    this.submitted = true;
    this.disabledBtn = true;
    if (this.signupForm.invalid) {
      return false;
    } else {
      this._qHttp.doPost('signup', {'name': this.signupForm.value.name, 'email': this.signupForm.value.email, 'password': this.signupForm.value.password, 'address': this.signupForm.value.address})
        .subscribe(
          response => {
            if (response.status == 200) {
              this._toastr.success(response.message, 'Success!');
              this._router.navigate(['login']);
            } else {
              this.disabledBtn = false;
              this._toastr.error(response.error, 'Warning!');
            }
          }
        )
    }
  }

}
