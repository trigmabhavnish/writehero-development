import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SupportService, CommonUtilsService } from 'src/app/core/_services';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { DropzoneComponent, DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import Swal from 'sweetalert2'
import { untilDestroyed } from 'ngx-take-until-destroy';// unsubscribe from observables when the  component destroyed
// import environment
import { environment } from '../../../../../environments/environment';
@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.css']
})
export class ViewTicketComponent implements OnInit {
  supportId: any;
  supportData: any;
  ticketReplyForm: FormGroup;
  isSubmitted: boolean = false;
  loading:boolean = false;
  public supportFileConfiguration: DropzoneConfigInterface;
  base64StringFile: any;
  disabled: boolean = false;
  constructor(private fb: FormBuilder, private zone: NgZone, private commonUtilsService: CommonUtilsService, private route: ActivatedRoute, private supportService: SupportService) { }

  ngOnInit() {
    this.supportId = this.route.snapshot.paramMap.get('_id');
    this.getTicketDetails();
    this.initilizeCreateTicketForm();
    this.supportFileDropzoneInit();

  }

  /**
   * initilize create ticket form
   */
  private initilizeCreateTicketForm(): void {
    this.ticketReplyForm = this.fb.group({
      support_id: [this.supportId, Validators.required],
      message: [null, Validators.required],
      support_files: this.fb.array([])
    });
  }

  /**
   * GET the details of ticket with message
   */
  private getTicketDetails(): void {
    this.loading = true;
    this.supportService.getTicketDetails({ supportId: this.supportId }).pipe(untilDestroyed(this)).subscribe(response => {
      this.supportData = response;
      this.loading = false;
    }, error => {

    })
  }



  /**
 * get Product Image Form Array
 */
  get supportFilesArray(): FormArray {
    return this.ticketReplyForm.controls.support_files as FormArray;
  }

  /**
   * remove image from AWS Bucket
   * @param imagePath image url
   * @param bucket s3 bucket name
   */
  removeFileFromBucket(file_key) {
    this.commonUtilsService.showPageLoader(environment.MESSAGES.WAIT_TEXT);

    const params = { fileKey: file_key }

    this.commonUtilsService.removeImageFromBucket(params)
      .pipe(untilDestroyed(this))
      .subscribe(
        (res) => {
          this.commonUtilsService.onSuccess(res.response);
        },
        error => {
          this.commonUtilsService.onError(error.response);
        });
  }
  /**
  * Initialize Dropzone Library(Image Upload).
  */
  private supportFileDropzoneInit() {
    const self = this;
    this.supportFileConfiguration = {
      clickable: true,
      paramName: "file",
      uploadMultiple: false,
      url: environment.API_ENDPOINT + "/api/common/imageUploadtoBucket",
      maxFiles: 1,
      autoReset: null,
      errorReset: null,
      cancelReset: null,
      acceptedFiles: '.pdf, .doc, .docx, .txt, .zip, .rar, .xlsx, .csv',
      maxFilesize: 50, // MB,
      dictDefaultMessage: '<span class="button red">Attach File</span>',
      //previewsContainer: "#offerInHandsPreview",
      addRemoveLinks: true,
      //resizeWidth: 125,
      //resizeHeight: 125,
      //createImageThumbnails:false,
      dictInvalidFileType: 'Only valid pdf, doc, docx, txt, zip, rar, xlsx and csv file are accepted.',
      dictFileTooBig: 'Maximum upload file size limit is 2MB',
      dictCancelUpload: '<i class="fa fa-times" aria-hidden="true"></i>',
      dictRemoveFile: '<i class="fa fa-times" aria-hidden="true"></i>',
      headers: {
        'Cache-Control': null,
        'X-Requested-With': null,
      },

      accept: function (file, done) {


        if ((self.supportFilesArray.length + 1) > 1) {
          self.commonUtilsService.onError(environment.MESSAGES.CANNOT_UPLOAD_MORE);
          this.removeFile(file);
          return false;
        }

        const reader = new FileReader();
        const _this = this
        reader.onload = function (event) {

          let base64String = reader.result
          let fileExtension = (file.name).split('.').pop();

          self.base64StringFile = reader.result;
          if (fileExtension == "pdf") {
            self.base64StringFile = self.base64StringFile.replace('data:application/pdf;base64,', '');
          }


          /* const isValidFile = componentObj.commonUtilsService.isFileCorrupted(base64String, _.toLower(fileExtension))
          if (!isValidFile) {
            done('File is corrupted or invalid.');
            _this.removeFile(file);
            return false;
          } */

          self.loading = true; // show page loader
          self.commonUtilsService.showPageLoader(environment.MESSAGES.WAIT_TEXT);
          done();

        };
        reader.readAsDataURL(file);
      },
      init: function () {


        this.on('sending', function (file, xhr, formData) {

          formData.append('folder', 'support_file');
          formData.append('fileType', file.type);
          formData.append('base64StringFile', self.base64StringFile);
        });


        this.on("totaluploadprogress", function (progress) {
          self.loading = true; // Show Loader
          //self.commonUtilsService.showPageLoader('Uploading file ' + parseInt(progress) + '%');//setting loader text
          if (progress >= 100) {
            //self.commonUtilsService.hidePageLoader(); //hide page loader
            self.loading = false; // Hide Loader
          }
        })

        this.on("success", function (file, serverResponse) {


          self.zone.run(() => {
            self.supportFilesArray.push(new FormControl({ file_path: serverResponse.fileLocation, file_name: serverResponse.fileName, file_key: serverResponse.fileKey, file_mimetype: serverResponse.fileMimeType, file_category: 'support_file' }));
          });

          this.removeFile(file);
          self.loading = false; // Hide Loader
          //self.commonUtilsService.hidePageLoader(); //hide page loader
        });

        this.on("error", function (file, error) {

          this.removeFile(file);
          self.loading = false; // Hide Loader
          self.commonUtilsService.onError(error);
        });

      }
    };
  }

  /**
* set check object array length.
* @param object
*  @return number
*/
  public checkObjectLength(object): number {
    return Object.keys(object).length;
  }

  /**
  * remove file 
  * @param index index of the image array
  * @return  boolean
  */
  removeFile(index, file_category, file_key): void {

    this.supportFilesArray.removeAt(index);
    this.removeFileFromBucket(file_key);
  }

  /**
   * submit Reply 
   */
  public submitReply(): void {
    this.isSubmitted = true;
    if (this.ticketReplyForm.invalid) return
    this.loading = true;
    this.supportService.submitReply(this.ticketReplyForm.value).pipe(untilDestroyed(this)).subscribe(response => {
      this.commonUtilsService.onSuccess(environment.MESSAGES.MESSAGE_SEND);
      this.loading = false;
      this.ticketReplyForm.reset();
      this.ticketReplyForm.patchValue({
        support_id: this.supportId,
       
      });
      this.clearFormArray(this.supportFilesArray)
      this.isSubmitted = false;
      this.getTicketDetails()
    }, error => {
      this.loading = false;
      this.commonUtilsService.onError(error.response);
    })
  }


 private clearFormArray = (formArray: FormArray) => {
  while (formArray.length !== 0) {
    formArray.removeAt(0)
  }
}


  public solveTicket(): void {

    Swal.fire({
      title: 'Are you sure your issue has been solved?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No, Cancel'
    }).then((result) => {
      if (result.value) {
        this.supportService.updateSupportTicket({ support_id: this.supportId }).pipe(untilDestroyed(this)).subscribe(response => {
          this.commonUtilsService.onSuccess(environment.MESSAGES.TICKET_UPDATE);

          this.getTicketDetails();
        }, error => {
          this.commonUtilsService.onError(error.response);
        })
      }

    })


  }

  // This method must be present, even if empty.
  ngOnDestroy() {
    // To protect you, we'll throw an error if it doesn't exist.
  }

}
