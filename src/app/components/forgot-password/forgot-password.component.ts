import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  email: String;
  submitted: Boolean;

  constructor(private _http: HttpClient, private _fb: FormBuilder) { 
    this.submitted = false;
  }
  
  ngOnInit() {
    this.forgotPasswordForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get f() { return this.forgotPasswordForm.controls; }

  sendPasswordEmail() {
    this.submitted = true;
    console.log(this.forgotPasswordForm.value.email);
  }

}
