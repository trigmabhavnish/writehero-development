import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UsersService ,CommonUtilsService} from 'src/app/core/_services';
import { MovingDirection } from 'angular-archwizard'; // Wizard
import { environment } from 'src/environments/environment';
import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';
declare  var $:any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  myOptions: INgxMyDpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
};
  userProfileForm: FormGroup;
  constructor(private fb: FormBuilder, private userService: UsersService,private commonUtilService:CommonUtilsService) { }



  ngOnInit() {

    this.initUserProfileForm();//initilize user profile form
    this.getUserProfileData();
  }

  private initUserProfileForm(): void {
    this.userProfileForm = this.fb.group({
      profile_pic: [],
      company_name: [],
      user_name: [],
      first_name:[],
      last_name:[],
      profession: [""],
      email: [],
      website: [],
      country: [],
      dob: [],
      settings: this.fb.group({
        gender_winter: [""],
        country_winter: [""],
        age_brack_writers: [""],
        specialization: [""],
        hide_profile: ["N"]
      }),
      notification: this.fb.group({
        new_project: [],
        complet_project: [],
        imp_update_project: [],
        new_payment: [],
        freebie: [],
        new_message: [],
        my_profile: [],
        other_update: []
      })
    })
  }


  private getUserProfileData(): void {
    this.userService.getUserProfile().subscribe(response => {
      console.log(response)
      this.patchProfile(response)
    }, error => {

    })
  }


  private patchProfile(response: any): void {
    let profile = response.profile[0];
    let settings = response.settings[0];
    this.userProfileForm.patchValue({
      profile_pic:profile.profile_pic,
      company_name:profile.company_name,
      first_name:profile.first_name,
      last_name:profile.last_name,
      user_name:profile.user_name,
      profession:profile.profession,
      email:profile.email,
      website:profile.website,
      country:profile.country,
      dob:profile.dob,
      settings:{
        gender_winter:settings.gender_winter,
        country_winter:settings.country_winter,
        age_brack_writers:settings.age_brack_writers,
        specialization:settings.specialization,
        hide_profile:settings.hide_profile == "N" ? false : true
      },
      notification:{
        new_project:settings.new_project == "N" ? false : true,
        complet_project:settings.complet_project  == "N" ? false : true,
        imp_update_project:settings.imp_update_project  == "N" ? false : true,
        new_payment:settings.new_payment == "N" ? false : true,
        freebie:settings.freebie == "N" ? false : true,
        new_message:settings.freebie == "N" ? false : true,
        my_profile:settings.my_profile == "N" ? false : true,
        other_update:settings.other_update == "N" ? false : true
      }
    })
  }



  ngAfterViewInit(){
    $( "#dob" ).datepicker();
    // $( "#format" ).on( "change", function() {
    //   $( "#datepicker" ).datepicker( "option", "dateFormat", $( this ).val() );
    // });
  
  }

    /**
 * validate wizard and move to either direction. 
 * @param validityStatus boolean(form validation status)
 * @param direction boolean(wizard direction)
 * @return  booleanimport { MovingDirection } from 'angular-archwizard'; // Wizard
 */
moveDirection = (validityStatus, direction) => {
  if (direction === MovingDirection.Backwards) {
    return true;
  }
  return validityStatus;
};



public submitProfile():void{

  if(this.userProfileForm.invalid) return
   let body = this.userProfileForm.value;
   body['hide_profile'] = this.userProfileForm.controls['settings'].value.hide_profile == false ? "N":"Y";
   body['new_project'] = this.userProfileForm.controls['notification'].value.new_project == false ? "N":"Y";
   body['complet_project'] = this.userProfileForm.controls['notification'].value.complet_project == false ? "N":"Y";
   body['imp_update_project'] = this.userProfileForm.controls['notification'].value.imp_update_project == false ? "N":"Y";
   body['new_payment'] = this.userProfileForm.controls['notification'].value.new_payment == false ? "N":"Y";
   body['freebie'] = this.userProfileForm.controls['notification'].value.freebie == false ? "N":"Y";
   body['new_message'] = this.userProfileForm.controls['notification'].value.new_message == false ? "N":"Y";
   body['my_profile'] = this.userProfileForm.controls['notification'].value.my_profile == false ? "N":"Y";
   body['other_update'] = this.userProfileForm.controls['notification'].value.other_update == false ? "N":"Y";
  
   







  this.userService.updateProfile(body).subscribe(response=>{
      this.commonUtilService.onSuccess(environment.MESSAGES.PROFILE_UPDATE);
  },error=>{
    this.commonUtilService.onError(error.response)
  })
}
}
