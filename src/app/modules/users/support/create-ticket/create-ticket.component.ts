import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { MovingDirection } from 'angular-archwizard'; // Wizard
import { DropzoneComponent, DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { untilDestroyed } from 'ngx-take-until-destroy';// unsubscribe from observables when the  component destroyed
// import environment
import { environment } from '../../../../../environments/environment';


//import core services
import { ProjectsService, CommonUtilsService, SupportService } from '../../../../core/_services';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css']
})
export class CreateTicketComponent implements OnInit {
  createTicketForm: FormGroup;
  isSubmitted: boolean = false; // true when submit the form
  loading:boolean = false;
  public supportFileConfiguration: DropzoneConfigInterface;
  base64StringFile: any;
  disabled: boolean = false;
  constructor(private router: Router, private supportService: SupportService, private zone: NgZone, private fb: FormBuilder, private commonUtilsService: CommonUtilsService) { }

  ngOnInit() {
    this.supportFileDropzoneInit(); // initilize DropZone
    this.initilizeCreateTicketForm() // initilize Create Ticket Form
  }

  /**
   * initilize create ticket form
   */
  private initilizeCreateTicketForm(): void {
    this.createTicketForm = this.fb.group({
      support_type: ["", Validators.required],
      subject: [null, Validators.required],
      message: [null, Validators.required],
      support_files: this.fb.array([])
    });
  }

  /**
  * get Product Image Form Array
  */
  get supportFilesArray(): FormArray {
    return this.createTicketForm.controls.support_files as FormArray;
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
 * validate wizard and move to either direction. 
 * @param validityStatus boolean(form validation status)
 * @param direction boolean(wizard direction)
 * @return  booleanimport { MovingDirection } from 'angular-archwizard'; // Wizard
 */
  moveDirection = (validityStatus, direction) => {
    if (direction === MovingDirection.Backwards) {
      return true;
    }
    return validityStatus;
  };



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
      maxFilesize: 2, // MB,
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


          self.commonUtilsService.showPageLoader(environment.MESSAGES.WAIT_TEXT);
          done();

        };
        reader.readAsDataURL(file);
      },
      init: function () {


        this.on('sending', function (file, xhr, formData) {

          formData.append('folder', 'Support');
          formData.append('fileType', file.type);
          formData.append('base64StringFile', self.base64StringFile);
        });


        this.on("totaluploadprogress", function (progress) {
          self.commonUtilsService.showPageLoader('Uploading file ' + parseInt(progress) + '%');//setting loader text
          if (progress >= 100) {
            self.commonUtilsService.hidePageLoader(); //hide page loader
          }
        })

        this.on("success", function (file, serverResponse) {


          self.zone.run(() => {
            self.supportFilesArray.push(new FormControl({ file_path: serverResponse.fileLocation, file_name: serverResponse.fileName, file_key: serverResponse.fileKey, file_mimetype: serverResponse.fileMimeType, file_category: 'Support' }));
          });

          this.removeFile(file);
          self.commonUtilsService.hidePageLoader(); //hide page loader
        });

        this.on("error", function (file, error) {

          this.removeFile(file);

          self.commonUtilsService.onError(error.response);
        });

      }
    };
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
   * Validate create ticket form and submit from value to Db
   */
  public submitTicket(): void {
    this.isSubmitted = true;
    if (this.createTicketForm.invalid) return;
    this.loading = true;
    this.supportService.createSupportTicket(this.createTicketForm.value).pipe(untilDestroyed(this)).subscribe(response => {
      this.commonUtilsService.onSuccess(environment.MESSAGES.TICKET_CREATED);
      this.isSubmitted = false;
      this.loading = false;
      this.router.navigate(['/user/ticket-listing'])
    }, error => {
      this.isSubmitted = false;
      this.loading = false;
      this.commonUtilsService.onError(error.response)
    })
  }





  /**
* set check object array length.
* @param object
*  @return number
*/

  public checkObjectLength(object): number {
    return Object.keys(object).length;
  }



  // This method must be present, even if empty.
  ngOnDestroy() {
    // To protect you, we'll throw an error if it doesn't exist.
  }
}
