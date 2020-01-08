import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormValidationErrorsComponent } from '../../core/components/form-validation-errors/form-validation-errors.component'

@NgModule({
  declarations: [
    FormValidationErrorsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FormValidationErrorsComponent
  ]
})
export class SharedModule { }
