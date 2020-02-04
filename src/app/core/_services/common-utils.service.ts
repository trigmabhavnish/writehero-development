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
  public showPageLoader(message): void {
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
    this.toastrManager.errorToastr(message, 'Oops!', { maxShown: 1 });//showing error toaster message  
  }

  /**
  * To check the image validity for type jpeg, png, jpg
  * @return boolean
  * @param base64string image base64 string 
  * @param type image type (jpeg, png, jpg)
  */
  public isFileCorrupted(base64string, type): boolean {

    if (type == 'png') {
      const imageData = Array.from(atob(base64string.replace('data:image/png;base64,', '')), c => c.charCodeAt(0))
      const sequence = [0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130]; // in hex: 

      //check last 12 elements of array so they contains needed values
      for (let i = 12; i > 0; i--) {
        if (imageData[imageData.length - i] !== sequence[12 - i]) {
          return false;
        }
      }

      return true;
    }
    else if (type == 'pdf') {
      return true;
    }
    else if (type == 'jpeg' || type == 'jpg') {
      const imageDataJpeg = Array.from(atob(base64string.replace('data:image/jpeg;base64,', '')), c => c.charCodeAt(0))
      const imageCorrupted = ((imageDataJpeg[imageDataJpeg.length - 1] === 217) && (imageDataJpeg[imageDataJpeg.length - 2] === 255))
      return imageCorrupted;
    }
  }

  /**
  * Remove Image from AWS Bucket
  * @return boolean
  */
  public removeImageFromBucket(params): Observable<any> {
    return this.httpClient
      .post('common/deleteObject', params)
      .map((response: Response) => {
        return response;
      })
  }

  /**
  * Remove Image from AWS Bucket
  * @return boolean
  */
 public userAccountCredits(params): Observable<any> {
  return this.httpClient
    .post('common/getUserCredits', params)
    .map((response: Response) => {
      return response;
    })
}



}
