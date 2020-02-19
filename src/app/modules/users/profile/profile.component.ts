import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UsersService, CommonUtilsService } from 'src/app/core/_services';
import { MovingDirection } from 'angular-archwizard'; // Wizard
import { environment } from 'src/environments/environment';
import { DropzoneComponent, DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
declare var $: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isSubmitted:boolean =false;
  public profileFileConfiguration: DropzoneConfigInterface;
  base64StringFile: any;
  profileFilesArray: any = [];
  disabled: boolean = false;
  userProfileForm: FormGroup;
  loading:boolean = false;
  constructor(private zone: NgZone, private fb: FormBuilder, private userService: UsersService, private commonUtilsService: CommonUtilsService) { }



  ngOnInit() {

    this.initUserProfileForm();//initilize user profile form
    this.supportFileDropzoneInit();
    this.getUserProfileData();
  }

  private initUserProfileForm(): void {
    this.userProfileForm = this.fb.group({
      profile_pic: [],
      company_name: [],
      user_name: [],
      first_name: [],
      last_name: [],
      profession: [""],
      email: [],
      website: [],
      country: [],
      dob: [],
      settings: this.fb.group({
        gender_winter: [""],
        country_winter: [""],
        age_brack_writers: [""],
        specialization: [""],
        hide_profile: ["N"]
      }),
      notification: this.fb.group({
        new_project: [],
        complet_project: [],
        imp_update_project: [],
        new_payment: [],
        freebie: [],
        new_message: [],
        my_profile: [],
        other_update: []
      })
    })
  }


  private getUserProfileData(): void {
    this.loading = true;
    this.userService.getUserProfile().subscribe(response => {
      this.patchProfile(response);
      this.loading = false;
    }, error => {
      this.loading = false;
    })
  }


  private patchProfile(response: any): void {
    let profile = response.profile[0];
    let settings = response.settings[0];
    this.userProfileForm.patchValue({
      profile_pic: profile.profile_pic,
      company_name: profile.company_name,
      first_name: profile.first_name,
      last_name: profile.last_name,
      user_name: profile.user_name,
      profession: profile.profession,
      email: profile.email,
      website: profile.website,
      country: profile.country,
      dob: profile.dob,
      settings: {
        gender_winter: settings.gender_winter,
        country_winter: settings.country_winter,
        age_brack_writers: settings.age_brack_writers,
        specialization: settings.specialization,
        hide_profile: settings.hide_profile == "N" ? false : true
      },
      notification: {
        new_project: settings.new_project == "N" ? false : true,
        complet_project: settings.complet_project == "N" ? false : true,
        imp_update_project: settings.imp_update_project == "N" ? false : true,
        new_payment: settings.new_payment == "N" ? false : true,
        freebie: settings.freebie == "N" ? false : true,
        new_message: settings.freebie == "N" ? false : true,
        my_profile: settings.my_profile == "N" ? false : true,
        other_update: settings.other_update == "N" ? false : true
      }
    })
  }



  ngAfterViewInit() {
    // $( "#dob" ).datepicker();
    $('#dob').datepicker({
      uiLibrary: 'bootstrap4',
      format: 'mm/dd/yyyy'
    });
    // });
    // $( "#format" ).on( "change", function() {
    //   $( "#datepicker" ).datepicker( "option", "dateFormat", $( this ).val() );
    // });

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
    this.profileFileConfiguration = {
      clickable: true,
      paramName: "file",
      uploadMultiple: false,
      url: environment.API_ENDPOINT + "/api/common/imageUploadtoBucket",
      maxFiles: 1,
      autoReset: null,
      errorReset: null,
      cancelReset: null,
      acceptedFiles: 'image/*',
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


        if ((self.profileFilesArray.length + 1) > 1) {
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

          formData.append('folder', 'Profile');
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
            self.profileFilesArray.push({ file_path: serverResponse.fileLocation, file_name: serverResponse.fileName, file_key: serverResponse.fileKey, file_mimetype: serverResponse.fileMimeType, file_category: 'Profile' });
          });
          self.updateProfilePic(serverResponse);
          // this.removeFile(file);
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
   * Submit Profile Update
   */
  public submitProfile(): void {
    this.userProfileForm.patchValue({
      dob: $('#dob').val()
    })
    this.isSubmitted =true;
    if (this.userProfileForm.invalid) return
    let body = this.userProfileForm.value;
    body['hide_profile'] = this.userProfileForm.controls['settings'].value.hide_profile == false ? "N" : "Y";
    body['new_project'] = this.userProfileForm.controls['notification'].value.new_project == false ? "N" : "Y";
    body['complet_project'] = this.userProfileForm.controls['notification'].value.complet_project == false ? "N" : "Y";
    body['imp_update_project'] = this.userProfileForm.controls['notification'].value.imp_update_project == false ? "N" : "Y";
    body['new_payment'] = this.userProfileForm.controls['notification'].value.new_payment == false ? "N" : "Y";
    body['freebie'] = this.userProfileForm.controls['notification'].value.freebie == false ? "N" : "Y";
    body['new_message'] = this.userProfileForm.controls['notification'].value.new_message == false ? "N" : "Y";
    body['my_profile'] = this.userProfileForm.controls['notification'].value.my_profile == false ? "N" : "Y";
    body['other_update'] = this.userProfileForm.controls['notification'].value.other_update == false ? "N" : "Y";







    this.loading = true;
    
    this.userService.updateProfile(body).subscribe(response => {
      this.isSubmitted =false;
      this.loading = false;
      this.commonUtilsService.onSuccess(environment.MESSAGES.PROFILE_UPDATE);
    }, error => {
      this.isSubmitted =false;
      this.loading = false;
      this.commonUtilsService.onError(error.response)
    })
  }


  public updateProfilePic(body): void {
    this.userService.updateProfilePic(body.fileLocation).subscribe(response => {
      this.commonUtilsService.onSuccess(environment.MESSAGES.PROFILE_UPDATE);
    }, error => {
      this.commonUtilsService.onError(error.response)
    })
  }




}
