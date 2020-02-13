import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../core/shared/shared.module'; // Shared Module
import { RecaptchaModule } from 'angular-google-recaptcha'; // Google Recaptcha Module
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { ArchwizardModule } from 'angular-archwizard';
import {RatingModule} from "ngx-rating";

import { UsersRoutingModule } from './users-routing.module';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { environment } from '../../../environments/environment';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddNewProjectComponent } from './projects/add-new-project/add-new-project.component';
import { CustomWizardComponent } from './custom-wizard/custom-wizard.component';
import { BuyCreditsComponent } from './buy-credits/buy-credits.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

import { DropzoneModule, DropzoneConfigInterface, DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { NgxPayPalModule } from 'ngx-paypal';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TicketListingComponent } from './support/ticket-listing/ticket-listing.component';
import { CreateTicketComponent } from './support/create-ticket/create-ticket.component';
import { ViewTicketComponent } from './support/view-ticket/view-ticket.component';
import { ProjectsListingComponent } from './projects/projects-listing/projects-listing.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { EditProjectComponent } from './projects/edit-project/edit-project.component';

import { FeedBackListingComponent } from './feed-back/feed-back-listing/feed-back-listing.component';
import { CreateFeedBackComponent } from './feed-back/create-feed-back/create-feed-back.component';
import { FeedbackDetailsComponent } from './feed-back/feedback-details/feedback-details.component';
import { BillingListingComponent } from './billing/billing-listing/billing-listing.component';


const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  acceptedFiles: '.jpg, .png, .jpeg, .pdf',
  createImageThumbnails: true
};

@NgModule({
  declarations: [ProjectsListingComponent,SignupComponent, LoginComponent, DashboardComponent, AddNewProjectComponent, CustomWizardComponent, BuyCreditsComponent, ForgotPasswordComponent, ResetPasswordComponent, TicketListingComponent, CreateTicketComponent, ViewTicketComponent, ProjectDetailsComponent, EditProjectComponent, FeedBackListingComponent, CreateFeedBackComponent, FeedbackDetailsComponent,BillingListingComponent],  
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ArchwizardModule,
    DropzoneModule,
    RatingModule,
    NgxPayPalModule,
    NgxPaginationModule,
    RecaptchaModule.forRoot({
        siteKey: environment.GOOGLE_RECAPTCHA_SITE_KEY,
    })
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ]
})
export class UsersModule { }
