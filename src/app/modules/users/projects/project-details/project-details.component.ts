import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, NgZone } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from 'rxjs/Subscription';
import { of, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ToastrManager } from 'ng6-toastr-notifications';//toaster class
import { untilDestroyed } from 'ngx-take-until-destroy';// unsubscribe from observables when the  component destroyed
import Swal from 'sweetalert2'
import { CustomValidator } from '../../../../core/_helpers/custom-validator';
// import environment
import { environment } from '../../../../../environments/environment';

//import Lodash
import * as _ from 'lodash';

//import shared services
import { PageLoaderService } from '../../../../shared/_services'

//import core services
import { ProjectsService, CommonUtilsService, UsersService } from '../../../../core/_services';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  projectId: any;
  projectCost: any;
  userAccountBalance: any;
  completedFilePath = environment.S3_BUCKET_URL;
  completedFilePathLocal = 'assets/';
  projectDetails: any = {};
  projectStatus: any = [];
  loading: boolean = false;

  constructor(private zone: NgZone, private commonUtilsService: CommonUtilsService, private projectsService: ProjectsService, private userAuthService: UsersService,  private toastr: ToastrManager, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('_id');
    this.getProjectDetails(); // get Project Details by ID
  }

  /**
   * GET the details of project
   */
  private getProjectDetails(): void {
    this.loading = true;
    this.projectsService.getProjectDetails({ projectId: this.projectId }).pipe(untilDestroyed(this)).subscribe(
      //case success
      (res) => {
        console.log(res);
        this.loading = false;
        this.projectDetails = res.project_details;
        this.projectStatus = res.project_status;
        this.projectCost = res.project_details.project_cost;
        this.userAccountBalance = res.user_account_balance;
      }, error => {
        this.loading = false;
        this.commonUtilsService.onError(error.response);
      });
  }

  /**
   * Cancel the Project
   */
  onCancelProject(): void {

    Swal.fire({
      title: environment.MESSAGES.CANCEL_PROJECT,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.commonUtilsService.showPageLoader(environment.MESSAGES.WAIT_TEXT);
        this.projectsService.cancelProject({ project_id: this.projectId, project_cost: this.projectCost }).pipe(untilDestroyed(this)).subscribe(
          //case success
          (res) => {
            this.getProjectDetails();
            this.userAuthService.isProfileUpdated(true);  // Update Profile Data
            this.commonUtilsService.onSuccess(res.response);

          }, error => {
            this.commonUtilsService.onError(error.response);
          });
      }

    })


  }

  /**
   * Launch the Project
   */
  onLaunchProject(event): void {
    this.loading = true;
    //console.log(this.projectCost);
    //console.log(this.userAccountBalance);
    if (this.projectCost > this.userAccountBalance) {
      this.loading = false;
      this.commonUtilsService.onError(environment.MESSAGES.ADD_CREDITS_TO_LAUNCH);
    } else {

      let projectStatus = event.target.getAttribute('data-projectStatus');
      this.projectsService.updateProjectStatus({ project_id: this.projectId, project_status: projectStatus, project_cost: this.projectCost }).pipe(untilDestroyed(this)).subscribe(
        //case success
        (res) => {
          this.loading = false;
          this.getProjectDetails();
          this.userAuthService.isProfileUpdated(true);  // Update Profile Data
          this.commonUtilsService.onSuccess(res.response);
        }, error => {
          this.loading = false;
          this.commonUtilsService.onError(error.response);
        });
    }

  }

  /**
   * Update the Status of Project
   */
  onUpdateStatus(event): void {

    let projectStatus = event.target.getAttribute('data-projectStatus');
    //console.log(projectStatus); return;
    this.loading = true;
    this.projectsService.updateProjectStatus({ project_id: this.projectId, project_status: projectStatus }).pipe(untilDestroyed(this)).subscribe(
      //case success
      (res) => {
        this.loading = false;
        this.getProjectDetails();
        this.userAuthService.isProfileUpdated(true);  // Update Profile Data
        this.commonUtilsService.onSuccess(res.response);

      }, error => {
        this.loading = false;
        this.commonUtilsService.onError(error.response);
      });
  }

  public validFileUrl(str) {


    let thisURL = this.completedFilePath + str;

    console.log(thisURL);

    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

    return !!pattern.test(thisURL);
  }



  // This method must be present, even if empty.
  ngOnDestroy() {
    // To protect you, we'll throw an error if it doesn't exist.
  }

}
