import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, NgZone } from '@angular/core';
import { Location } from '@angular/common';
import { AbstractControl, FormBuilder, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { Subscription } from 'rxjs/Subscription';
import { of, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ToastrManager } from 'ng6-toastr-notifications';//toaster class
import { untilDestroyed } from 'ngx-take-until-destroy';// unsubscribe from observables when the  component destroyed
import { MovingDirection } from 'angular-archwizard'; // Wizard
import { DropzoneComponent, DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { CustomValidator } from '../../../core/_helpers/custom-validator';

// import environment
import { environment } from '../../../../environments/environment';

//import Lodash
import * as _ from 'lodash';

//import shared services
import { PageLoaderService } from '../../../shared/_services'

//import core services
import { ProjectsService, CommonUtilsService } from '../../../core/_services';

@Component({
  selector: 'app-add-new-project',
  templateUrl: './add-new-project.component.html',
  styleUrls: ['./add-new-project.component.css']
})
export class AddNewProjectComponent implements OnInit {

  constructor(private zone: NgZone, private formBuilder: FormBuilder, private commonUtilsService: CommonUtilsService, private projectsService: ProjectsService, private toastr: ToastrManager, private router: Router) { }

  projectSpecsForm: FormGroup;
  projectDetailsForm: FormGroup;
  writersDetailsForm: FormGroup;
  projectSpecsSubmitted = false;
  projectDetailsSubmitted = false;
  writersDetailsSubmitted = false;

  getProjectPackageArray: any;
  public projectImageConfiguration: DropzoneConfigInterface;
  base64StringFile: any;
  disabled: boolean = false;

  productCategoriesArray = ['Arts & Entertainment', 'Automotive & Transportation', 'Beauty & Fashion', 'Business & Finance', 'Computers & Internet', 'Crafts & Hobbies', 'Dating & Relationships', 'Education, & Reference', 'Entertainment & Music', 'Family & Parenting', 'Fiction & Literature', 'Food & Drinks', 'Gadgets & Technology', 'Games & Recreation', 'Health, Nutrition, & Fitness', 'History, Society & People', 'Home & Design', 'Hotels & Restaurants', 'Internet & Social Media', 'Internet Marketing & SEO', 'Legal, Politics & Government', 'Lifestyle', 'Nature & Environment', 'News & Events', 'Nonprofits & Campaigns', 'Others / Miscellaneous', 'Pets & Animals', 'Philosophy & Religion', 'Real Estate & Construction', 'Science & Space', 'Self Improvement', 'Sports & Outdoors', 'Travel & Places'];

  projectTypeArray = ['Article Writing', 'Biography Writing', 'Blog Writing (1st POV)', 'Blog Writing (3rd POV)', 'Blurb Writing (Social Media Posts/ Blog Comments / Forum Posts)', 'Business Writing (Product/Services)', 'Column Writing (Commentary)', 'Copywriting (For Advertising Campaigns)', 'Copywriting (Light Tone)', 'Copywriting (Persuasive Tone)', 'Creative Writing', 'E-Book Writing (Ghostwriting)', 'Editing & Proofreading', 'Educational Writing', 'Erotica Writing', 'FAQ Writing', 'Feature Writing (Magazine Style)', 'Fiction Writing (Stories)', 'Grant Writing', 'Guide/Description Writing', 'How To Writing', 'Humor Writing', 'Letter Writing', 'News Writing', 'Newsletter Writing', 'Poetry Writing', 'Press Release Writing', 'Research Writing (Business)', 'Research Writing (Non-Business)', 'Review Writing', 'Rewriting', 'Script Writing', 'SEO Writing (Web Content / Keyword Focused)', 'Slang-style/Informal-tone', 'Song Writing', 'Speech Writing', 'Summary Writing', 'Technical Writing'];

  choiceOfWriterArray = ['Native US Speaker', 'Other English-speaking country', 'English as second language', 'No Specific Reference'];

  /* writterLocationArray = [
    {'AL':'Alabama'},
    {'AK':'Alaska'},
    {'AZ':'Arizona'},
    {'AR':'Arkansas'},
    {'CA':'California'},
    {'CO':'Colorado'},
    {'CT':'Connecticut'},
    {'DE':'Delaware'},
    {'DC':'District Of Columbia'},
    {'FL':'Florida'},
    {'GA':'Georgia'},
    {'HI':'Hawaii'},
    {'ID':'Idaho'},
    {'IL':'Illinois'},
    {'IN':'Indiana'},
    {'IA':'Iowa'},
    {'KS':'Kansas'},
    {'KY':'Kentucky'},
    {'LA':'Louisiana'},
    {'ME':'Maine'},
    {'MD':'Maryland'},
    {'MA':'Massachusetts'},
    {'MI':'Michigan'},
    {'MN':'Minnesota'},
    {'MS':'Mississippi'},
    {'MO':'Missouri'},
    {'MT':'Montana'},
    {'NE':'Nebraska'},
    {'NV':'Nevada'},
    {'NH':'New Hampshire'},
    {'NJ':'New Jersey'},
    {'NM':'New Mexico'},
    {'NY':'New York'},
    {'NC':'North Carolina'},
    {'ND':'North Dakota'},
    {'OH':'Ohio'},
    {'OK':'Oklahoma'},
    {'OR':'Oregon'},
    {'Other/No Specific Preference' => 'Other/No Specific Preference'},
    {'PA' => 'Pennsylvania'},
    {'RI' => 'Rhode Island'},
    {'SC' => 'South Carolina'},
    {'SD' => 'South Dakota'},
    {'TN' => 'Tennessee'},
    {'TX' => 'Texas'},
    {'UT' => 'Utah'},
    {'VT' => 'Vermont'},
    {'VA' => 'Virginia'},
    {'WA' => 'Washington'},
    {'WV' => 'West Virginia'},
    {'WI' => 'Wisconsin'},
    {'WY' => 'Wyoming'},
  ];
  $writter_gender_array = array('Male', 'Female', 'LGBTQIA+', 'No Specific Preference');
  $writter_career_array = array('Arts & Literature', 'Automotive', 'Business', 'Clerical', 'Design', 'Education', 'Finance', 'Food', 'Health and Wellness', 'Information Technology', 'Internet Marketing', 'Law Enforcement', 'Manufacturing', 'Marketing', 'Media', 'Medicine', 'No Specific Preference', 'Others', 'Sales', 'Student', 'Transportation');
  $writter_age_array = array('18-25', '26-35', '36-45', '46-55', '55 and older', 'No Specific Preference'); */


  /**
  * Initialize Project Specs Wizard Fields.
  */
  private projectSpecs() {
    this.projectSpecsForm = this.formBuilder.group({
      project_name: ['', [Validators.required]],
      project_topic: ['', [Validators.required]],
      project_type_id: ['', [Validators.required]]
    });
  }

  /**
  * Initialize Project Details Wizard Fields.
  */
  private projectDetails() {
    this.projectDetailsForm = this.formBuilder.group({
      quantity: [0, [Validators.required]],
      project_details: ['', [Validators.required]],
      word_count: [0, [Validators.required]],
      additional_resources: ['', [Validators.required]],
      project_images: this.formBuilder.array([]),
    });
  }

  /**
  * Initialize Project Details Wizard Fields.
  */
  private writersDetails() {
    this.writersDetailsForm = this.formBuilder.group({
      choice_of_writers: ['', [Validators.required]],
    });
  }

  validateProjectSpecsWizard() {

  }

  validateProjectDetailsWizard() { }

  /**
  * Initialize Project Details Wizard Fields.
  * @status(string)
  * @return Package Array
  */
  private getProjectPackages() {
    this.projectsService.getProjectPackages({ status: 'Y' }).pipe(untilDestroyed(this)).subscribe(
      //case success
      (res) => {
        //console.log(res.projectPackages);
        this.getProjectPackageArray = res.projectPackages;
        //case error 
      }, error => {
        this.commonUtilsService.onError(error.response);
      });
  }

  /**
  * Initialize Dropzone Library(Image Upload).
  */
  private projectImagesDropzoneInit() {
    const componentObj = this;
    this.projectImageConfiguration = {
      clickable: true,
      paramName: "file",
      uploadMultiple: false,
      url: environment.API_ENDPOINT + "/api/project/imageUploadtoBucket",
      maxFiles: 1,
      autoReset: null,
      errorReset: null,
      cancelReset: null,
      acceptedFiles: '.jpg, .png, .jpeg, .pdf',
      maxFilesize: 2, // MB,
      dictDefaultMessage: '<span class="button red">Attach File</span>',
      //previewsContainer: "#offerInHandsPreview",
      addRemoveLinks: true,
      //resizeWidth: 125,
      //resizeHeight: 125,
      //createImageThumbnails:false,
      dictInvalidFileType: 'Only valid jpeg, jpg, png and pdf file is accepted.',
      dictFileTooBig: 'Maximum upload file size limit is 2MB',
      dictCancelUpload: '<i class="fa fa-times" aria-hidden="true"></i>',
      dictRemoveFile: '<i class="fa fa-times" aria-hidden="true"></i>',
      headers: {
        'Cache-Control': null,
        'X-Requested-With': null,
      },

      accept: function (file, done) {


        if ((componentObj.projectImagesArray.length + 1) > 1) {
          componentObj.commonUtilsService.onError('You cannot upload any more files.');
          this.removeFile(file);
          return false;
        }

        const reader = new FileReader();
        const _this = this
        reader.onload = function (event) {

          let base64String = reader.result
          let fileExtension = (file.name).split('.').pop();

          componentObj.base64StringFile = reader.result;
          if (fileExtension == "pdf") {
            componentObj.base64StringFile = componentObj.base64StringFile.replace('data:application/pdf;base64,', '');
          }


          const isValidFile = componentObj.commonUtilsService.isFileCorrupted(base64String, _.toLower(fileExtension))
          if (!isValidFile) {
            done('File is corrupted or invalid.');
            _this.removeFile(file);
            return false;
          }


          componentObj.commonUtilsService.showPageLoader(environment.MESSAGES.WAIT_TEXT);
          done();

        };
        reader.readAsDataURL(file);
      },
      init: function () {


        this.on('sending', function (file, xhr, formData) {

          formData.append('folder', 'OfferInHands');
          formData.append('fileType', file.type);
          formData.append('base64StringFile', componentObj.base64StringFile);
        });


        this.on("totaluploadprogress", function (progress) {
          componentObj.commonUtilsService.showPageLoader('Uploading file ' + parseInt(progress) + '%');//setting loader text
          if (progress >= 100) {
            componentObj.commonUtilsService.hidePageLoader(); //hide page loader
          }
        })

        this.on("success", function (file, serverResponse) {


          componentObj.zone.run(() => {
            componentObj.projectImagesArray.push(new FormControl({ file_path: serverResponse.fileLocation, file_name: serverResponse.fileName, file_key: serverResponse.fileKey, file_mimetype: serverResponse.fileMimeType, file_category: 'offer_in_hands' }));
          });

          this.removeFile(file);
          componentObj.commonUtilsService.hidePageLoader(); //hide page loader
        });

        this.on("error", function (file, error) {
          this.removeFile(file);

          componentObj.commonUtilsService.onError(error.response);
        });

      }
    };
  }

  /**
  * get Product Image Form Array
  */
  get projectImagesArray(): FormArray {
    return this.projectDetailsForm.controls.project_images as FormArray;
  }

  ngOnInit() {
    this.projectSpecs(); // Project Specs Wizard
    this.projectDetails(); // Project Details Wizard
    this.writersDetails(); // Writer Details Wizard
    this.getProjectPackages();   // get Avaiable Packages from DB
    this.projectImagesDropzoneInit(); //Initialize Dropzone
  }

  // This method must be present, even if empty.
  ngOnDestroy() {
    // To protect you, we'll throw an error if it doesn't exist.
  }

}
