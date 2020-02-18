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
import { ProjectsService, CommonUtilsService } from '../../../../core/_services';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  projectId: any;
  projectCost: any;
  projectDetails: any = {};
  projectStatus:any =[];
  constructor(private zone: NgZone, private commonUtilsService: CommonUtilsService, private projectsService: ProjectsService, private toastr: ToastrManager, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('_id');
    this.getProjectDetails(); // get Project Details by ID
  }

  /**
   * GET the details of project
   */
  private getProjectDetails(): void {
    this.commonUtilsService.showPageLoader(environment.MESSAGES.WAIT_TEXT);
    this.projectsService.getProjectDetails({ projectId: this.projectId }).pipe(untilDestroyed(this)).subscribe(
      //case success
      (res) => {
        this.commonUtilsService.hidePageLoader();
        this.projectDetails = res.project_details;
        this.projectStatus = res.project_status;
        this.projectCost = res.project_details.project_cost;
      }, error => {
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
            this.commonUtilsService.onSuccess(res.response);

          }, error => {
            this.commonUtilsService.onError(error.response);
          });
      }

    })


  }



  // This method must be present, even if empty.
  ngOnDestroy() {
    // To protect you, we'll throw an error if it doesn't exist.
  }

}
