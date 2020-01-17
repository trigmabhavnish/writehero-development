import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormValidationErrorsComponent } from '../../core/components/form-validation-errors/form-validation-errors.component'
import { ToastrModule } from 'ng6-toastr-notifications';

@NgModule({
  declarations: [
    FormValidationErrorsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  exports: [
    FormValidationErrorsComponent
  ]
})
export class SharedModule { }
