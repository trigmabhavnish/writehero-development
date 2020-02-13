import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router, ActivatedRoute } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SupportService {

  constructor(private httpClient: HttpClient, private router: Router) { }




  /**
  * get Project Packages
  * @return array
  */
 createSupportTicket(postedData): Observable<any> {

  return this.httpClient
    .post('support/createSupportTicket', postedData)
    .map((response: Response) => {
      return response;
    });

}



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
 updateSupportTicket(postedData): Observable<any> {

  return this.httpClient
    .post('support/updateTicket', postedData)
    .map((response: Response) => {
      return response;
    });

}

  /**
  * get Project Packages
  * @return array
  */
 getSupportTickets(postedData): Observable<any> {

    return this.httpClient
      .post('support/getSupportTickets', postedData)
      .map((response: Response) => {
        return response;
      });

  }
    /**
  * get Project Packages
  * @return array
  */
 getTicketDetails(postedData): Observable<any> {
  return this.httpClient
    .post('support/getTicketDetails', postedData)
    .map((response: Response) => {
      return response;
    });

}
}
