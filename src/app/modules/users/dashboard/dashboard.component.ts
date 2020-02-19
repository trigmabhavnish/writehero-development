import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, NgZone } from '@angular/core';
import { Location } from '@angular/common';
import { AbstractControl, FormBuilder, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { Subscription } from 'rxjs/Subscription';
import { of, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ToastrManager } from 'ng6-toastr-notifications';//toaster class
import { untilDestroyed } from 'ngx-take-until-destroy';// unsubscribe from observables when the  component destroyed
import { MovingDirection } from 'angular-archwizard'; // Wizard
import { DropzoneComponent, DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { CustomValidator } from '../../../core/_helpers/custom-validator';

// import environment
import { environment } from '../../../../environments/environment';

//import Lodash
import * as _ from 'lodash';

//import shared services
import { PageLoaderService } from '../../../shared/_services'

//import core services
import { ProjectsService, CommonUtilsService } from '../../../core/_services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  latestProject: any = {};
  latestSupport: any = {};
  projectCount: any;
  userName: any;
  loading:boolean =false; //Page Loader

  constructor(private zone: NgZone, private formBuilder: FormBuilder, private commonUtilsService: CommonUtilsService, private projectsService: ProjectsService, private toastr: ToastrManager, private router: Router) { }

  ngOnInit() {
    this.getDashboardContent();   // get Project Listings
  }

  /**
  * get Dahboard Content
  * @return Listing Array
  */
  public getDashboardContent() {
    this.loading = true; // Show Loader
    this.commonUtilsService.getDashboardContent({}).pipe(untilDestroyed(this)).subscribe(
      //case success
      (res) => {
        //console.log(res);
        this.loading = false; // Hide Loader
        this.latestProject = res.latestProject;
        this.latestSupport = res.latestSupport;
        this.projectCount = res.projectCount; 
        this.userName = res.user_name; 
        //console.log(this.projectCount);       
        //case error 
      }, error => {
        this.loading = false; // Hide Loader
        this.commonUtilsService.onError(error.response);
      });
  }

  /**
* set check object array length.
* @param object
*  @return number
*/
  public checkObjectLength(object): number {    
    return Object.keys(object).length;
  }

  // This method must be present, even if empty.
  ngOnDestroy() {
    // To protect you, we'll throw an error if it doesn't exist.
  }

}
