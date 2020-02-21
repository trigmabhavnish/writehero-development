import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, NgZone } from '@angular/core';
import { Location } from '@angular/common';
import { AbstractControl, FormBuilder, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { Subscription } from 'rxjs/Subscription';
import { of, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ToastrManager } from 'ng6-toastr-notifications';//toaster class
import { untilDestroyed } from 'ngx-take-until-destroy';// unsubscribe from observables when the  component destroyed

import { CustomValidator } from '../../../core/_helpers/custom-validator';

// import environment
import { environment } from '../../../../environments/environment';

//import Lodash
import * as _ from 'lodash';

//import shared services
import { PageLoaderService } from '../../../shared/_services'

//import core services
import { UsersService, CommonUtilsService } from '../../../core/_services';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  signUpSubmitted = false;

  constructor(private formBuilder: FormBuilder, private commonUtilsService: CommonUtilsService, private userAuthService: UsersService, private toastr: ToastrManager, private router: Router) { }

  private buildSignupForm() {
    this.signUpForm = this.formBuilder.group({        
      first_name: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(20)])],
      last_name: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(20)])],
      user_name: [''],
      director_id: [3],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(50),
          // check whether the entered password has a number
          CustomValidator.patternValidator(/\d/, {
            hasNumber: true
          }),
          // check whether the entered password has upper case letter
          CustomValidator.patternValidator(/[A-Z]/, {
            hasCapitalCase: true
          }),
          // check whether the entered password has a lower case letter
          CustomValidator.patternValidator(/[a-z]/, {
            hasSmallCase: true
          }),
          // check whether the entered password has a special character
          CustomValidator.patternValidator(
            /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
            {
              hasSpecialCharacters: true
            }
          )
        ])
      ],
      confirm_password: ['', Validators.required],
      status: ['Y'],
      myRecaptcha: [false],
      accept_terms: [false, Validators.requiredTrue]
    }, {
      validator: CustomValidator.MustMatch('password', 'confirm_password')
    });
  }

  validateSignUpForm():void{
    this.signUpSubmitted = true;
    if(this.signUpForm.invalid) {
      return;
    }
  
    this.commonUtilsService.showPageLoader(environment.MESSAGES.SIGNING_UP);

    //set username  before signup
    let user_name = this.commonUtilsService.generateUsername(this.signUpForm.controls.email.value);    
    this.signUpForm.controls.user_name.setValue(user_name);

    this.userAuthService.userSignUp(this.signUpForm.value).pipe(untilDestroyed(this)).subscribe(
      //case success
      (res) => {         
        this.commonUtilsService.onSuccess(res.response);
        this.router.navigate(['/user/login']);
        //case error 
      }, error => {
        this.commonUtilsService.onError(error.response);
    });
  }

  ngOnInit() {
    // if User Logged In then redirect to Dashboard Page
    this.userAuthService.checkLoginAndRedirect();
    
    this.buildSignupForm();
  }

  // This method must be present, even if empty.
  ngOnDestroy() {
    // To protect you, we'll throw an error if it doesn't exist.
  }


}
