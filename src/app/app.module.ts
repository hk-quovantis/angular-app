import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ErrorComponent } from './components/error/error.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/layout/home/home.component';
import { ProfileComponent } from './components/layout/profile/profile.component';
import { EventComponent } from './components/layout/event/event.component';
import { MyEventComponent } from './components/layout/event/my-event/my-event.component';
import { InvitationComponent } from './components/layout/event/invitation/invitation.component';

import { AuthGuard } from '../app/guard/auth.guard';
import { RouteGuard } from '../app/guard/route.guard';
import { AuthService } from '../app/services/auth.service';
import { QHttpService } from '../app/services/q-http.service';

import { RouteInterceptor } from '../app/route-interceptor';
import { CreateEventComponent } from './components/layout/event/create-event/create-event.component';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ForgotPasswordComponent,
    ErrorComponent,
    LayoutComponent,
    ProfileComponent,
    EventComponent,
    CreateEventComponent,
    MyEventComponent,
    InvitationComponent
  ],
  imports: [
    BrowserModule,  
    ReactiveFormsModule,  
    AppRoutingModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
    }),
    DataTablesModule,
    NgbModule,
    FormsModule
  ],
  providers: [QHttpService, AuthService, AuthGuard, RouteGuard, {provide: HTTP_INTERCEPTORS, useClass: RouteInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
