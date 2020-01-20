import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, NgZone } from '@angular/core';
import { Location } from '@angular/common';
import { AbstractControl, FormBuilder, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { Subscription } from 'rxjs/Subscription';
import { of, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ToastrManager } from 'ng6-toastr-notifications';//toaster class
import { untilDestroyed } from 'ngx-take-until-destroy';// unsubscribe from observables when the  component destroyed
import {MovingDirection} from 'angular-archwizard'; // Wizard
import { DropzoneComponent, DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { CustomValidator } from '../../../core/_helpers/custom-validator';

// import environment
import { environment } from '../../../../environments/environment';

//import Lodash
import * as _ from 'lodash';

//import shared services
import { PageLoaderService } from '../../../shared/_services'

//import core services
import { UsersService, CommonUtilsService } from '../../../core/_services';

@Component({
  selector: 'app-add-new-project',
  templateUrl: './add-new-project.component.html',
  styleUrls: ['./add-new-project.component.css']
})
export class AddNewProjectComponent implements OnInit {

  constructor(private zone:NgZone, private formBuilder: FormBuilder, private commonUtilsService: CommonUtilsService, private toastr: ToastrManager, private router: Router) { }

  projectSpecsForm: FormGroup;
  projectDetailsForm: FormGroup;
  projectSpecsSubmitted = false;
  projectDetailsSubmitted = false;

  productCategoriesArray = ['Arts & Entertainment', 'Automotive & Transportation', 'Beauty & Fashion', 'Business & Finance', 'Computers & Internet', 'Crafts & Hobbies', 'Dating & Relationships', 'Education, & Reference', 'Entertainment & Music', 'Family & Parenting', 'Fiction & Literature', 'Food & Drinks', 'Gadgets & Technology', 'Games & Recreation', 'Health, Nutrition, & Fitness', 'History, Society & People', 'Home & Design', 'Hotels & Restaurants', 'Internet & Social Media', 'Internet Marketing & SEO', 'Legal, Politics & Government', 'Lifestyle', 'Nature & Environment', 'News & Events', 'Nonprofits & Campaigns', 'Others / Miscellaneous', 'Pets & Animals', 'Philosophy & Religion', 'Real Estate & Construction', 'Science & Space', 'Self Improvement', 'Sports & Outdoors', 'Travel & Places'];

  projectTypeArray = ['Article Writing', 'Biography Writing', 'Blog Writing (1st POV)', 'Blog Writing (3rd POV)', 'Blurb Writing (Social Media Posts/ Blog Comments / Forum Posts)', 'Business Writing (Product/Services)', 'Column Writing (Commentary)', 'Copywriting (For Advertising Campaigns)', 'Copywriting (Light Tone)', 'Copywriting (Persuasive Tone)', 'Creative Writing', 'E-Book Writing (Ghostwriting)', 'Editing & Proofreading', 'Educational Writing', 'Erotica Writing', 'FAQ Writing', 'Feature Writing (Magazine Style)', 'Fiction Writing (Stories)', 'Grant Writing', 'Guide/Description Writing', 'How To Writing', 'Humor Writing', 'Letter Writing', 'News Writing', 'Newsletter Writing', 'Poetry Writing', 'Press Release Writing', 'Research Writing (Business)', 'Research Writing (Non-Business)', 'Review Writing', 'Rewriting', 'Script Writing', 'SEO Writing (Web Content / Keyword Focused)', 'Slang-style/Informal-tone', 'Song Writing', 'Speech Writing', 'Summary Writing', 'Technical Writing'];
  

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
    });
  }

  ngOnInit() {
    this.projectSpecs(); // Project Specs Wizard
    this.projectDetails(); // Project Details Wizard
  }

}
