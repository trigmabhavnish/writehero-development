import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './signup/signup.component'; // User Signup
import { LoginComponent } from './login/login.component'; // User Login
import { DashboardComponent } from './dashboard/dashboard.component' // User Dashboard
import { AddNewProjectComponent } from './add-new-project/add-new-project.component';
import { BuyCreditsComponent } from './buy-credits/buy-credits.component';
import { CustomWizardComponent } from './custom-wizard/custom-wizard.component';
import { UserAuthGuardService } from '../../core/guards/user-auth-guard.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TicketListingComponent } from './support/ticket-listing/ticket-listing.component';
import { CreateTicketComponent } from './support/create-ticket/create-ticket.component';
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
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    data: { title: 'Forgot Password' }
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    data: { title: 'Reset Password' }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { title: 'Dashboard' },
    canActivate: [UserAuthGuardService]
  },
  {
    path: 'add-new-project',
    component: AddNewProjectComponent,
    data: { title: 'Add New Project' },
    canActivate: [UserAuthGuardService]
  },
  {
    path: 'ticket-listing',
    component: TicketListingComponent,
    data: { title: 'Ticket Listing' },
    canActivate: [UserAuthGuardService]
  },
  {
    path: 'create-ticket',
    component: CreateTicketComponent,
    data: { title: 'Create Ticket' },
    canActivate: [UserAuthGuardService]
  },
  {
    path: 'custom-wizard',
    component: CustomWizardComponent,
    data: { title: 'Add New Project' },
    canActivate: [UserAuthGuardService]
  },
  {
    path: 'buy-credits',
    component: BuyCreditsComponent,
    data: { title: 'Buy Credits' },
    canActivate: [UserAuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
