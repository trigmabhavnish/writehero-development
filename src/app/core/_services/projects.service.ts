import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Router, ActivatedRoute } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  /**
  * get Project Packages
  * @return array
  */
  getProjectPackages(postedData): Observable<any> {

    return this.httpClient
      .post('project/getProjectPackages', postedData)
      .map((response: Response) => {
        return response;
      });

  }

  /**
  * get Project Listings
  * @return array
  */
 getProjectListings(postedData): Observable<any> {

  return this.httpClient
    .post('project/getProjectListings', postedData)
    .map((response: Response) => {
      return response;
    });

}

  /**
  * create New Project
  * @return array
  */
  createNewProject(postedData): Observable<any> {

    return this.httpClient
      .post('project/addNewProject', postedData)
      .map((response: Response) => {
        return response;
      });

  }
}
