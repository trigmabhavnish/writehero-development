import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router, ActivatedRoute } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class FeedBackService {

  constructor(private httpClient: HttpClient, private router: Router) { }



  /**
  * get Project Packages
  * @return array
  */
  submitFeedBack(postedData): Observable<any> {

    return this.httpClient
      .post('feedback/saveFeedBack', postedData)
      .map((response: Response) => {
        return response;
      });

  }


  /**
  * get feedback listing
  * @return array
  */
  getFeedBackListing(postedData): Observable<any> {

    return this.httpClient
      .post('feedback/getFeedBacks', postedData)
      .map((response: Response) => {
        return response;
      });

  }

  /**
 * get FeedBack Details
 * @return array
 */
  getFeedBackDetails(postedData): Observable<any> {

    return this.httpClient
      .post('feedback/getFeedBackDetails', postedData)
      .map((response: Response) => {
        return response;
      });

  }


    /**
 * get FeedBacks Projects
 * @return array
 */
getCompletedProjects(): Observable<any> {

  return this.httpClient
    .post('feedback/getCompletedProjects',{})
    .map((response: Response) => {
      return response;
    });

}
}
