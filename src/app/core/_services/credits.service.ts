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
export class CreditsService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  /**
  * Check Coupon Code Exist
  * @param CouponCode Object
  * @return array
  */
  checkCouponCodeExist(postedData): Observable<any> {

    return this.httpClient
      .post('coupon/checkCouponCodeExist', postedData)
      .map((response: Response) => {
        return response;
      });

  }

  /**
  * On Successfully Added Amount to Credit
  * @param Transactiondata Object
  * @return array
  */
  onTransactionComplete(postedData): Observable<any> {

    return this.httpClient
      .post('credit/onTransactionComplete', postedData)
      .map((response: Response) => {
        return response;
      });

  }

/**
 * Get the transaction listing in billing
 */
  getTransactionsListing(body:any):Observable<any>{
    return this.httpClient
    .post('credit/transactionListing', body)
    .map((response: Response) => {
      return response;
    });
  }

  maketwoCheckoutPayoutRequest(body:any):Observable<any>{
   return this.httpClient
   .post('payment/make-payment', body)
    .map((response: Response) => {
     return response;
     });
  
  }


}
