import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './signup/signup.component'; // User Signup
import { LoginComponent } from './login/login.component'; // User Login
import { DashboardComponent } from './dashboard/dashboard.component' // User Dashboard
import { UserAuthGuardService } from '../../core/guards/user-auth-guard.service'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'User Login' }
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: { title: 'User Signup' }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { title: 'Dashboard' },
    canActivate: [UserAuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
