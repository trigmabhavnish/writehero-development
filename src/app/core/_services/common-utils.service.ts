import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';//toaster class

//import shared services
import { PageLoaderService } from '../../shared/_services'
import { environment } from '../../../environments/environment'
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class CommonUtilsService {

  constructor(private httpClient: HttpClient, private pageLoaderService: PageLoaderService, private toastrManager: ToastrManager, ) { }

  /**
  * 
  * @param email user email for signup
  * @return username
  */
  public generateUsername(email: string): string {     
    let username = email.substring(0, email.lastIndexOf("."))
    return String(username.replace("@", "_"));
  }
  /**
  * Show page loder on fetching data
  * @return void
  */
  public showPageLoader(message):void{
    this.pageLoaderService.setLoaderText(message);//setting loader text
    this.pageLoaderService.pageLoader(true);//show page loader
  }

  /**
  * Hide page loder on fetching data
  * @return void
  */
  public hidePageLoader(): void {
    this.pageLoaderService.pageLoader(false);//hide page loader
    this.pageLoaderService.setLoaderText('');//setting loader text
  }

  /**
  * Show alert on success response & hide page loader
  * @return void
  */
  public onSuccess(message): void {
    this.pageLoaderService.pageLoader(false);//hide page loader
    this.pageLoaderService.setLoaderText('');//setting loader text empty
    this.toastrManager.successToastr(message, 'Success!'); //showing success toaster 
  }

  /**
  * Show alert on error response & hide page loader
  * @return void
  */
  public onError(message): void {
    this.pageLoaderService.setLoaderText('');//setting loader text
    this.pageLoaderService.pageLoader(false);//hide page loader
    this.toastrManager.errorToastr(message, 'Oops!',{maxShown:1});//showing error toaster message  
  }

  

}
