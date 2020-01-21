import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { QHttpService } from '../../../services/q-http.service';
import { ToastrService, Toast } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm:FormGroup;
  submitted:boolean;
  name:string;
  email:string;
  address:string;
  city:string;
  state:string;
  pinCode:string;
  image:string;
  disabledBtn:boolean = false;

  constructor(private _qHttp: QHttpService, private _fb: FormBuilder, private _toastr: ToastrService) {
    this.submitted = false;
   }

  ngOnInit() {
    this._qHttp.doGet('profile')
      .subscribe(
        response => {
          this.name = response.data.name;
          this.address = response.data.address.split(',');
          this.email = response.data.email;
          this.image = response.data.image;

          if (this.address.length == 3) {
            this.city = this.address[0];
            this.state = this.address[1];
            this.pinCode = this.address[2]; 
          }
        }
      )
      this.profileForm = this._fb.group({
        name: ['', [Validators.required, Validators.maxLength(255)]],
        email: ['', [Validators.required, Validators.email]],
        city: ['', [Validators.required, Validators.maxLength(72)]],
        state: ['', [Validators.required, Validators.maxLength(72)]],
        pinCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
        image: ['']
      });
  }

  get f() { return this.profileForm.controls; }

  updateProfile() {
    this.submitted = true;
    if(this.profileForm.invalid) {
      return false;
    } else {
      this.disabledBtn = true;
      let formData = new FormData();
      formData.append('image', this.profileForm.value.image);
      formData.append('name', this.profileForm.value.name);
      formData.append('address', this.profileForm.value.city+','+this.profileForm.value.state+','+this.profileForm.value.pinCode);
      
      this._qHttp.doPost('profile', formData, 1)
        .subscribe(
          response => {
            if(response.status == 200) {
              this._toastr.success(response.message, 'Success!');
            } else {              
              this._toastr.error(response.error, 'Warning!');
            }
          }
        )
    }
  }

  onProfileChange(event) {
    if(event.target.value.length > 0) {
      this.profileForm.value.image = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.image = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
