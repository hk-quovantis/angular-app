import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { QHttpService } from '../../services/q-http.service';
import { Router } from '@angular/router';
import { ToastrService, Toast } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  email: string;
  password: string;
  submitted: boolean = false;
  disabledBtn:boolean = false;

  constructor(private fb: FormBuilder, private _qHttp: QHttpService, private _route: Router, private _toastr:ToastrService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',[ Validators.required, Validators.minLength(6)]],
    });
  }

  get f() { return this.loginForm.controls; }

  validateUserSignup() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return false;
    } else {
      this.disabledBtn = true;
      this._qHttp.doPost('login', {'email': this.loginForm.value.email, 'password': this.loginForm.value.password})
        .subscribe(
          response => {
            if (response.status == 200) {
              localStorage.setItem('token', response.token);
              this._route.navigate(['welcome/home']);
            } else {
              this.disabledBtn = false;
              this._toastr.error(response.error, 'Warning!');
            }            
          }
        )
    }
  }
}
