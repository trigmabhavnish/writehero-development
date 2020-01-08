import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';

import { CustomValidator } from '../../../core/_helpers/custom-validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  signUpSubmitted = false;

  constructor(private formBuilder: FormBuilder) { }

  private buildSignupForm() {
    this.signUpForm = this.formBuilder.group({        
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
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
      myRecaptcha: [false],
      accept_terms: [false, Validators.required]
    }, {
      validator: CustomValidator.MustMatch('password', 'confirm_password')
    });
  }

  validateSignUpForm():void{
    this.signUpSubmitted = true;
    if(this.signUpForm.invalid) {
      return;
    }
  }

  ngOnInit() {
    this.buildSignupForm();
  }


}
