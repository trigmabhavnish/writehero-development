import { Injectable ,Output,EventEmitter} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Router, ActivatedRoute } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  userSignUp(postedData): Observable<any> {

    return this.httpClient
      .post('api/user/signup', postedData)
      .map((response: Response) => {
        return response;
      });

  }
}
