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
 submitReply(postedData): Observable<any> {

  return this.httpClient
    .post('support/saveMessage', postedData)
    .map((response: Response) => {
      return response;
    });

}


  /**
  * get Project Packages
  * @return array
  */
 getFeedBackListing(postedData): Observable<any> {

    return this.httpClient
      .post('feedback/getFeedBacks', postedData)
      .map((response: Response) => {
        return response;
      });

  }

}
