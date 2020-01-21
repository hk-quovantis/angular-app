import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ErrorComponent } from './components/error/error.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/layout/home/home.component';
import { ProfileComponent } from './components/layout/profile/profile.component';
import { EventComponent } from './components/layout/event/event.component';
import { CreateEventComponent } from './components/layout/event/create-event/create-event.component';
import { MyEventComponent } from './components/layout/event/my-event/my-event.component';
import { InvitationComponent } from './components/layout/event/invitation/invitation.component';

import { AuthGuard } from '../app/guard/auth.guard';
import { RouteGuard } from '../app/guard/route.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [RouteGuard]
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [RouteGuard]
  },
  {
    path: 'forgotPassword',
    component: ForgotPasswordComponent,
    canActivate: [RouteGuard]
  },
  {
    path: 'welcome',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'event',
        component: EventComponent,
        children: [
          {
            path: 'my-event',
            component: MyEventComponent
          },
          {
            path: 'create-event',
            component: CreateEventComponent
          },
          {
            path: 'invitation',
            component: InvitationComponent
          }
        ]
      }
    ]
  },
  {
    path: '**',
    component: ErrorComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
