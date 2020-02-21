import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidator } from '../../../core/_helpers/custom-validator';
import { UsersService, CommonUtilsService } from 'src/app/core/_services';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  isSubmitted: boolean = false;

  constructor(private router: Router, private commonUtilService: CommonUtilsService, private formBuilder: FormBuilder, private userService: UsersService) { }

  ngOnInit() {
    this.initChangePassowrdForm();
  }

  private initChangePassowrdForm() {
    this.changePasswordForm = this.formBuilder.group({
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

    }, {
      validator: CustomValidator.MustMatch('password', 'confirm_password')
    });
  }


  public validatechangePasswordForm(): void {
    this.isSubmitted = true;
    if (this.changePasswordForm.invalid) return;
    this.userService.changePassword(this.changePasswordForm.value).subscribe(response => {
      this.isSubmitted = false;
      this.commonUtilService.onSuccess(environment.MESSAGES.PASSWORD_CHANGE);
      this.router.navigate(['/user/dashboard'])

    }, error => {
      this.isSubmitted = false;
      this.commonUtilService.onError(error.response);
    })
  }

}
