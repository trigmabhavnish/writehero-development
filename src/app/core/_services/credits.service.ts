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
      .post('credit/checkCouponCodeExist', postedData)
      .map((response: Response) => {
        return response;
      });

  }
}
