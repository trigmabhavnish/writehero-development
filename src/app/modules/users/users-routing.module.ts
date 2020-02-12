import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './signup/signup.component'; // User Signup
import { LoginComponent } from './login/login.component'; // User Login
import { DashboardComponent } from './dashboard/dashboard.component' // User Dashboard
import { AddNewProjectComponent } from './projects/add-new-project/add-new-project.component';
import { ProjectsListingComponent } from './projects/projects-listing/projects-listing.component';
import { BuyCreditsComponent } from './buy-credits/buy-credits.component';
import { CustomWizardComponent } from './custom-wizard/custom-wizard.component';
import { UserAuthGuardService } from '../../core/guards/user-auth-guard.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TicketListingComponent } from './support/ticket-listing/ticket-listing.component';
import { CreateTicketComponent } from './support/create-ticket/create-ticket.component';
import { ViewTicketComponent } from './support/view-ticket/view-ticket.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { EditProjectComponent } from './projects/edit-project/edit-project.component';

import { FeedBackListingComponent } from './feed-back/feed-back-listing/feed-back-listing.component';
import { CreateFeedBackComponent } from './feed-back/create-feed-back/create-feed-back.component';
import { FeedbackDetailsComponent } from './feed-back/feedback-details/feedback-details.component';
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
    path: 'feed-back-listing',
    component: FeedBackListingComponent,
    data: { title: 'Feed Back Listing' },
    canActivate: [UserAuthGuardService]
  },
  {
    path: 'create-feed-back',
    component: CreateFeedBackComponent,
    data: { title: 'Create Feed Back' },
    canActivate: [UserAuthGuardService]
  },
  {
    path: 'feedback-details/:user_id/:project_id',
    component: FeedbackDetailsComponent,
    data: { title: 'Details Feed Back' },
    canActivate: [UserAuthGuardService]
  },
  {
    path: 'create-ticket',
    component: CreateTicketComponent,
    data: { title: 'Create Ticket' },
    canActivate: [UserAuthGuardService]
  },
  {
    path: 'ticket-detail/:_id',
    component: ViewTicketComponent,
    data: { title: 'Ticket Details' },
    canActivate: [UserAuthGuardService]
  },

  {
    path: 'projects-listing',
    component: ProjectsListingComponent,
    data: { title: 'Projects Listing' },
    canActivate: [UserAuthGuardService]
  },
  {
    path: 'project-detail/:_id',
    component: ProjectDetailsComponent,
    data: { title: 'Project Details' },
    canActivate: [UserAuthGuardService]
  },
  {
    path: 'edit-project/:_id',
    component: EditProjectComponent,
    data: { title: 'Edit Project' },
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
