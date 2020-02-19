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
import { CustomValidator } from '../../../../core/_helpers/custom-validator';

// import environment
import { environment } from '../../../../../environments/environment';

//import Lodash
import * as _ from 'lodash';

//import shared services
import { PageLoaderService } from '../../../../shared/_services'

//import core services
import { ProjectsService, CommonUtilsService } from '../../../../core/_services';

@Component({
  selector: 'app-projects-listing',
  templateUrl: './projects-listing.component.html',
  styleUrls: ['./projects-listing.component.css']
})
export class ProjectsListingComponent implements OnInit {

  //pagination initialize
  pageSize: number = 1;
  currentPage: number = 1;
  totalProjects: number = 0
  projects: any = [];

  loading:boolean = false; // Page Loader

  constructor(private zone: NgZone, private formBuilder: FormBuilder, private commonUtilsService: CommonUtilsService, private projectsService: ProjectsService, private toastr: ToastrManager, private router: Router) { }

  /**
  * get User Project Listings
  * @return Listing Array
  */
  private getProjectListings() {
    //this.commonUtilsService.showPageLoader(environment.MESSAGES.WAIT_TEXT);

    this.loading = true; // Show Loader
    this.projectsService.getProjectListings({ pageNumber: this.currentPage, pageSize: this.pageSize }).pipe(untilDestroyed(this)).subscribe(
      //case success
      (res) => {
        if (res.totalProjects > 0) {
          this.commonUtilsService.hidePageLoader();
          this.projects = res.projectListings;
          this.totalProjects = res.totalProjects;
        } else {
          //this.commonUtilsService.onError(environment.MESSAGES.NO_PROJECTS_FOUND);
        }
        this.loading = false; // Hide Loader
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
  
  /**
 * 
 * @param pageNumber is the page number on change pagination click
 */
  public pageChanged(pageNumber: any): void {
    this.currentPage = pageNumber;
    this.getProjectListings();
  }

  /**
   * Redirect to project detail page
   */
  public viewDetails(proejctId: any): void {
    this.router.navigate(['/user/project-detail/' + proejctId])

  }

  public navigateToCreateNewProject():void{
    this.router.navigate(['/user/add-new-project'])
  }

  ngOnInit() {
    this.getProjectListings();   // get Project Listings
  }

  // This method must be present, even if empty.
  ngOnDestroy() {
    // To protect you, we'll throw an error if it doesn't exist.
  }

}
