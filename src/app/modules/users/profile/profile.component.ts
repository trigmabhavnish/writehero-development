import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
   userProfileForm:FormGroup;
  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.userProfileForm = this.fb.group({
      profile_pic:[],
      company_name:[],
      user_name:[],
      profession:[],
      email:[],
      website:[],
      country:[],
      dob:[],
     
    })
  }

}
