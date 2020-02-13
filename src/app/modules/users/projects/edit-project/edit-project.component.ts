import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, NgZone } from '@angular/core';
import { Location } from '@angular/common';
import { AbstractControl, FormBuilder, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from 'rxjs/Subscription';
import { of, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ToastrManager } from 'ng6-toastr-notifications';//toaster class
import { untilDestroyed } from 'ngx-take-until-destroy';// unsubscribe from observables when the  component destroyed
import { MovingDirection } from 'angular-archwizard'; // Wizard
import { DropzoneComponent, DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { CustomValidator } from '../../../../core/_helpers/custom-validator';

// import environment
import { environment } from '../../../../../environments/environment';

//import Lodash
import * as _ from 'lodash';

//import shared services
import { PageLoaderService } from '../../../../shared/_services'

//import core services
import { ProjectsService, CommonUtilsService } from '../../../../core/_services';
@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {


  constructor(private zone: NgZone, private formBuilder: FormBuilder, private commonUtilsService: CommonUtilsService, private projectsService: ProjectsService, private toastr: ToastrManager, private router: Router, private route: ActivatedRoute) { }

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
  calculateCost: any = 0;
  lastProjectCost:any;
  selectedProjectPackageId: number;
  packagePrice: any;
  userCredits: any;
  userCreditsCheck: boolean = true;

  projectId: any;
  projectDetailsArray: any = {};


  productCategoriesArray = ['Arts & Entertainment', 'Automotive & Transportation', 'Beauty & Fashion', 'Business & Finance', 'Computers & Internet', 'Crafts & Hobbies', 'Dating & Relationships', 'Education, & Reference', 'Entertainment & Music', 'Family & Parenting', 'Fiction & Literature', 'Food & Drinks', 'Gadgets & Technology', 'Games & Recreation', 'Health, Nutrition, & Fitness', 'History, Society & People', 'Home & Design', 'Hotels & Restaurants', 'Internet & Social Media', 'Internet Marketing & SEO', 'Legal, Politics & Government', 'Lifestyle', 'Nature & Environment', 'News & Events', 'Nonprofits & Campaigns', 'Others / Miscellaneous', 'Pets & Animals', 'Philosophy & Religion', 'Real Estate & Construction', 'Science & Space', 'Self Improvement', 'Sports & Outdoors', 'Travel & Places'];

  projectTypeArray = ['Article Writing', 'Biography Writing', 'Blog Writing (1st POV)', 'Blog Writing (3rd POV)', 'Blurb Writing (Social Media Posts/ Blog Comments / Forum Posts)', 'Business Writing (Product/Services)', 'Column Writing (Commentary)', 'Copywriting (For Advertising Campaigns)', 'Copywriting (Light Tone)', 'Copywriting (Persuasive Tone)', 'Creative Writing', 'E-Book Writing (Ghostwriting)', 'Editing & Proofreading', 'Educational Writing', 'Erotica Writing', 'FAQ Writing', 'Feature Writing (Magazine Style)', 'Fiction Writing (Stories)', 'Grant Writing', 'Guide/Description Writing', 'How To Writing', 'Humor Writing', 'Letter Writing', 'News Writing', 'Newsletter Writing', 'Poetry Writing', 'Press Release Writing', 'Research Writing (Business)', 'Research Writing (Non-Business)', 'Review Writing', 'Rewriting', 'Script Writing', 'SEO Writing (Web Content / Keyword Focused)', 'Slang-style/Informal-tone', 'Song Writing', 'Speech Writing', 'Summary Writing', 'Technical Writing'];

  choiceOfWriterArray = ['Native US Speaker', 'Other English-speaking country', 'English as second language', 'No Specific Reference'];

  writterLocationArray = [
    {
      "name": "Alabama",
      "abbreviation": "AL"
    },
    {
      "name": "Alaska",
      "abbreviation": "AK"
    },
    {
      "name": "American Samoa",
      "abbreviation": "AS"
    },
    {
      "name": "Arizona",
      "abbreviation": "AZ"
    },
    {
      "name": "Arkansas",
      "abbreviation": "AR"
    },
    {
      "name": "California",
      "abbreviation": "CA"
    },
    {
      "name": "Colorado",
      "abbreviation": "CO"
    },
    {
      "name": "Connecticut",
      "abbreviation": "CT"
    },
    {
      "name": "Delaware",
      "abbreviation": "DE"
    },
    {
      "name": "District Of Columbia",
      "abbreviation": "DC"
    },
    {
      "name": "Federated States Of Micronesia",
      "abbreviation": "FM"
    },
    {
      "name": "Florida",
      "abbreviation": "FL"
    },
    {
      "name": "Georgia",
      "abbreviation": "GA"
    },
    {
      "name": "Guam",
      "abbreviation": "GU"
    },
    {
      "name": "Hawaii",
      "abbreviation": "HI"
    },
    {
      "name": "Idaho",
      "abbreviation": "ID"
    },
    {
      "name": "Illinois",
      "abbreviation": "IL"
    },
    {
      "name": "Indiana",
      "abbreviation": "IN"
    },
    {
      "name": "Iowa",
      "abbreviation": "IA"
    },
    {
      "name": "Kansas",
      "abbreviation": "KS"
    },
    {
      "name": "Kentucky",
      "abbreviation": "KY"
    },
    {
      "name": "Louisiana",
      "abbreviation": "LA"
    },
    {
      "name": "Maine",
      "abbreviation": "ME"
    },
    {
      "name": "Marshall Islands",
      "abbreviation": "MH"
    },
    {
      "name": "Maryland",
      "abbreviation": "MD"
    },
    {
      "name": "Massachusetts",
      "abbreviation": "MA"
    },
    {
      "name": "Michigan",
      "abbreviation": "MI"
    },
    {
      "name": "Minnesota",
      "abbreviation": "MN"
    },
    {
      "name": "Mississippi",
      "abbreviation": "MS"
    },
    {
      "name": "Missouri",
      "abbreviation": "MO"
    },
    {
      "name": "Montana",
      "abbreviation": "MT"
    },
    {
      "name": "Nebraska",
      "abbreviation": "NE"
    },
    {
      "name": "Nevada",
      "abbreviation": "NV"
    },
    {
      "name": "New Hampshire",
      "abbreviation": "NH"
    },
    {
      "name": "New Jersey",
      "abbreviation": "NJ"
    },
    {
      "name": "New Mexico",
      "abbreviation": "NM"
    },
    {
      "name": "New York",
      "abbreviation": "NY"
    },
    {
      "name": "North Carolina",
      "abbreviation": "NC"
    },
    {
      "name": "North Dakota",
      "abbreviation": "ND"
    },
    {
      "name": "Northern Mariana Islands",
      "abbreviation": "MP"
    },
    {
      "name": "Ohio",
      "abbreviation": "OH"
    },
    {
      "name": "Oklahoma",
      "abbreviation": "OK"
    },
    {
      "name": "Oregon",
      "abbreviation": "OR"
    },
    {
      "name": "Palau",
      "abbreviation": "PW"
    },
    {
      "name": "Pennsylvania",
      "abbreviation": "PA"
    },
    {
      "name": "Puerto Rico",
      "abbreviation": "PR"
    },
    {
      "name": "Rhode Island",
      "abbreviation": "RI"
    },
    {
      "name": "South Carolina",
      "abbreviation": "SC"
    },
    {
      "name": "South Dakota",
      "abbreviation": "SD"
    },
    {
      "name": "Tennessee",
      "abbreviation": "TN"
    },
    {
      "name": "Texas",
      "abbreviation": "TX"
    },
    {
      "name": "Utah",
      "abbreviation": "UT"
    },
    {
      "name": "Vermont",
      "abbreviation": "VT"
    },
    {
      "name": "Virgin Islands",
      "abbreviation": "VI"
    },
    {
      "name": "Virginia",
      "abbreviation": "VA"
    },
    {
      "name": "Washington",
      "abbreviation": "WA"
    },
    {
      "name": "West Virginia",
      "abbreviation": "WV"
    },
    {
      "name": "Wisconsin",
      "abbreviation": "WI"
    },
    {
      "name": "Wyoming",
      "abbreviation": "WY"
    }
  ]

  writterGenderArray = ['Male', 'Female', 'LGBTQIA+', 'No Specific Preference'];
  writterCareerArray = ['Arts & Literature', 'Automotive', 'Business', 'Clerical', 'Design', 'Education', 'Finance', 'Food', 'Health and Wellness', 'Information Technology', 'Internet Marketing', 'Law Enforcement', 'Manufacturing', 'Marketing', 'Media', 'Medicine', 'No Specific Preference', 'Others', 'Sales', 'Student', 'Transportation'];
  writterAgeArray = ['18-25', '26-35', '36-45', '46-55', '55 and older', 'No Specific Preference'];

  /**
   * GET the details of project
   */
  private getSavedProjectDetails(): void {
    this.commonUtilsService.showPageLoader(environment.MESSAGES.WAIT_TEXT);
    this.projectsService.getProjectDetails({ projectId: this.projectId }).pipe(untilDestroyed(this)).subscribe(
      //case success
      (res) => {
        this.commonUtilsService.hidePageLoader();
        console.log(res.project_details);
        if(res.project_details){
          // Project Specs Form
          this.projectSpecsForm.controls.project_id.patchValue(res.project_details.id);
          this.projectSpecsForm.controls.project_code.patchValue(res.project_details.code);
          this.projectSpecsForm.controls.project_name.patchValue(res.project_details.project_name);
          this.projectSpecsForm.controls.project_topic.patchValue(res.project_details.project_topic);
          this.projectSpecsForm.controls.project_type.patchValue(res.project_details.project_type);

          // Project Details Form
          this.projectDetailsForm.controls.quantity.patchValue(res.project_details.quantity);
          this.projectDetailsForm.controls.word_count.patchValue(res.project_details.word_count);
          this.projectDetailsForm.controls.project_details.patchValue(res.project_details.project_dtl);
          this.projectDetailsForm.controls.additional_resources.patchValue(res.project_details.additional_resources);
          this.projectDetailsForm.controls.project_package.patchValue(res.project_details.project_type_id);
          // Update Project Cost
          this.projectDetailsForm.controls.project_cost.patchValue(res.project_details.project_cost);
          this.calculateCost = res.project_details.project_cost;
          this.lastProjectCost = res.project_details.project_cost;

          // Update Project Files Array
          if(res.project_details.file_path){
            this.projectFilesArray.push(new FormControl({file_path : res.project_details.file_path, file_key : res.project_details.file_key, file_name : res.project_details.file_name, file_category : res.project_details.file_category, file_mimetype : res.project_details.file_mimetype}));
          }

          //Update Writers Details Form
          this.writersDetailsForm.controls.choice_of_writers.patchValue(res.project_details.choice_of_writers);
          this.writersDetailsForm.controls.writers_career.patchValue(res.project_details.writers_career);
          this.writersDetailsForm.controls.writers_age.patchValue(res.project_details.writers_age);
          this.writersDetailsForm.controls.writers_location.patchValue(res.project_details.writers_location);          
        }else{
          this.commonUtilsService.onError(environment.MESSAGES.UNABLE_TO_FIND_DETAILS);
          this.router.navigate(['/user/add-new-project']);
        }
                
        
        
      }, error => {
        this.commonUtilsService.onError(error.response);
      });
  }

  /**
  * Initialize Project Specs Wizard Fields.
  */
  private projectSpecs() {
    this.projectSpecsForm = this.formBuilder.group({
      project_id: [''],
      project_code: [''],      
      project_name: ['', [Validators.required]],
      project_topic: ['', [Validators.required]],
      project_type: ['', [Validators.required]]
    });
  }

  /**
  * Initialize Project Details Wizard Fields.
  */
  private projectDetails() {
    this.projectDetailsForm = this.formBuilder.group({
      quantity: [0, Validators.compose([Validators.required, Validators.min(1)])],
      word_count: [0, Validators.compose([Validators.required, Validators.min(1)])],
      project_details: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(200)])],
      additional_resources: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(200)])],
      project_package: ['', [Validators.required]],
      project_cost: [''],
      project_files: this.formBuilder.array([]),
    });
  }

  /**
  * Initialize Project Details Wizard Fields.
  */
  private writersDetails() {
    this.writersDetailsForm = this.formBuilder.group({
      choice_of_writers: [''],
      writers_career: [''],
      writers_age: ['18-25'],
      writers_location: [''],
    });
  }

  /**
  * Validate Project Specs Wizard Fields.
  */
  validateProjectSpecsWizard() {
    this.projectSpecsSubmitted = true;
    if (this.projectSpecsForm.invalid) {
      this.projectSpecsSubmitted = false;
      return;
    }
  }

  /**
 * Validate Project Details Wizard Fields.
 */
  validateProjectDetailsWizard() {
    this.projectDetailsSubmitted = true;
    if (this.projectDetailsForm.invalid) {
      this.projectDetailsSubmitted = false;
      return;
    }
  }

  onSubmitEditProject() {

    let userAccountBalanceCheck = '';
    let projectCost = this.projectDetailsForm.controls.project_cost.value;
    let updatedProjectCost = this.lastProjectCost - projectCost;

    if(this.lastProjectCost > projectCost){
      userAccountBalanceCheck = "A";
    }else{
      userAccountBalanceCheck = "S";
    }
    //console.log('updatedProjectCost', updatedProjectCost);
    //console.log('this.userCredits', this.userCredits);
    var mergeProjectData = Object.assign(this.projectSpecsForm.value, this.projectDetailsForm.value, this.writersDetailsForm.value, {userAccountBalanceCheck: userAccountBalanceCheck, lastProjectCost:this.lastProjectCost});

    this.commonUtilsService.showPageLoader(environment.MESSAGES.WAIT_TEXT);
    //check if Project Cost is greater than available credits.
    if (Math.abs(updatedProjectCost) > Math.abs(this.userCredits)) {
      this.commonUtilsService.onError(environment.MESSAGES.NOT_ENOUGH_CREDITS);
      this.userCreditsCheck = true;
    } else {
      this.userCreditsCheck = false;
      this.projectsService.updateProject(mergeProjectData).pipe(untilDestroyed(this)).subscribe(
        //case success
        (res) => {
          this.commonUtilsService.onSuccess(res.response);
          this.router.navigate(['/user/projects-listing']);
          //case error 
        }, error => {
          this.commonUtilsService.onError(error.response);
        });
    }
  }

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
        this.selectedProjectPackageId = res.projectPackages[0].id;
        this.packagePrice = res.projectPackages[0].price;
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
      url: environment.API_ENDPOINT + "/api/common/imageUploadtoBucket",
      maxFiles: 1,
      autoReset: null,
      errorReset: null,
      cancelReset: null,
      acceptedFiles: '.pdf, .doc, .docx, .txt, .zip, .rar, .xlsx, .csv',
      maxFilesize: 5, // MB,
      dictDefaultMessage: '<span class="button red">Attach File</span>',
      //previewsContainer: "#offerInHandsPreview",
      addRemoveLinks: true,
      //resizeWidth: 125,
      //resizeHeight: 125,
      //createImageThumbnails:false,
      dictInvalidFileType: 'Only valid pdf, doc, docx, txt, zip, rar, xlsx and csv file are accepted.',
      dictFileTooBig: 'Maximum upload file size limit is 5MB',
      dictCancelUpload: '<i class="fa fa-times" aria-hidden="true"></i>',
      dictRemoveFile: '<i class="fa fa-times" aria-hidden="true"></i>',
      headers: {
        'Cache-Control': null,
        'X-Requested-With': null,
      },

      accept: function (file, done) {


        if ((componentObj.projectFilesArray.length + 1) > 1) {
          componentObj.commonUtilsService.onError(environment.MESSAGES.CANNOT_UPLOAD_MORE);
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


          /* const isValidFile = componentObj.commonUtilsService.isFileCorrupted(base64String, _.toLower(fileExtension))
          if (!isValidFile) {
            done('File is corrupted or invalid.');
            _this.removeFile(file);
            return false;
          } */


          componentObj.commonUtilsService.showPageLoader(environment.MESSAGES.WAIT_TEXT);
          done();

        };
        reader.readAsDataURL(file);
      },
      init: function () {


        this.on('sending', function (file, xhr, formData) {

          formData.append('folder', 'Project');
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
            componentObj.projectFilesArray.push(new FormControl({ file_path: serverResponse.fileLocation, file_name: serverResponse.fileName, file_key: serverResponse.fileKey, file_mimetype: serverResponse.fileMimeType, file_category: 'project' }));
          });

          this.removeFile(file);
          componentObj.commonUtilsService.hidePageLoader(); //hide page loader
        });

        this.on("error", function (file, error) {
          //console.log('error', error);

          this.removeFile(file);

          componentObj.commonUtilsService.onError(error);
        });

      }
    };
  }


  /**
   * remove Vehicle Image
   * @param index index of the image array
   * @return  boolean
   */
  removeImage(index, file_category, file_key): void {

    this.projectFilesArray.removeAt(index);
    this.removeImageFromBucket(file_key);
  }

  /**
   * remove image from AWS Bucket
   * @param imagePath image url
   * @param bucket s3 bucket name
   */
  removeImageFromBucket(file_key) {
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
* set check object array length.
* @param object
*  @return number
*/
  public checkObjectLength(object): number {
    return Object.keys(object).length;
  }

  /**
  * get Product Image Form Array
  */
  get projectFilesArray(): FormArray {
    return this.projectDetailsForm.controls.project_files as FormArray;
  }

  /**
  * Calculate Project Cost.
  *  @param quantity number
  *  @param word_count number
  *  @param package_price number
  * @return Price (number)
  */
  calculateProjectCost(quantity, word_count) {
    if (quantity && word_count) {
      this.calculateCost = (quantity * word_count * this.packagePrice).toFixed(2);
      this.projectDetailsForm.controls.project_cost.patchValue(this.calculateCost);
      //if cost is greater than user credits.
      if (this.calculateCost > this.userCredits) {
        this.userCreditsCheck = true;
      } else {
        this.userCreditsCheck = false;
      }
    }
  }

  /**
  * Project Price Package.
  *  @param event number
  *  @param word_count number
  *  @param package_price number
  * @return void
  */
  getProjectPackagePrice(event, quantity, word_count) {
    this.packagePrice = event.target.getAttribute('data-packagePrice');
    this.calculateProjectCost(quantity, word_count);
  }

  /**
   * validate wizard and move to either direction. 
   * @param validityStatus boolean(form validation status)
   * @param direction boolean(wizard direction)
   * @return  boolean
   */
  moveDirection = (validityStatus, direction) => {
    if (direction === MovingDirection.Backwards) {
      return true;
    }
    return validityStatus;
  };

  /**
   * Verify User Account Credits
   * return number 
   */
  checkAccountCredits() {
    this.commonUtilsService.userAccountCredits({}).pipe(untilDestroyed(this)).subscribe(
      //case success
      (res) => {
        //case error 
        //console.log('response', res)
        this.userCredits = res.available_credits;

        if (res.available_credits > 0) { this.userCreditsCheck = false; }

      }, error => {
        this.commonUtilsService.onError(error.response);
        //this.tokenVerified = false;
        //this.router.navigate(['/user/forgot-password']);
      });
  }

  /**
   * Generate Random String 
   */
  public makeRandomString() {
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    const lengthOfCode = 10;
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }  

  ngOnInit() {

    this.projectId = this.route.snapshot.paramMap.get('_id');
    this.getSavedProjectDetails(); // get Project Details by ID

    this.checkAccountCredits(); // Check User Balance
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