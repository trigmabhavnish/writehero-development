import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MovingDirection } from 'angular-archwizard'; // Wizard
import { FeedBackService, CommonUtilsService } from 'src/app/core/_services';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-feed-back',
  templateUrl: './create-feed-back.component.html',
  styleUrls: ['./create-feed-back.component.css']
})
export class CreateFeedBackComponent implements OnInit {
  feedbackForm: FormGroup;
  projects: any;
  isSubmitted:boolean = false;
  constructor(private router: Router, private fb: FormBuilder, private feedbackservice: FeedBackService, private commonUtilsService: CommonUtilsService) { }

  ngOnInit() {

    this.feedbackForm = this.fb.group({
      project_id: ["", Validators.required],
      O: [0],
      R: [0],
      G: [0],
      F: [0],
      S: [0],
      T: [0],
      feed_des: [null, Validators.required]

    });
    this.getCompletedProject();
  }




  public getCompletedProject(): void {
    this.feedbackservice.getCompletedProjects().subscribe(response => {
      this.projects = response.projects
    }, error => {

    })
  }

  /**
   * SUBMIT FEEDBACK ON THE COMPLETED PROJECT
   */
  public submitFeedBack(): void {
    if (this.feedbackForm.invalid) return;
    this.feedbackservice.submitFeedBack(this.feedbackForm.value).subscribe(response => {
      this.commonUtilsService.onSuccess(environment.MESSAGES.FEEDBACK_SUCCESS);
      this.feedbackForm.reset();
      this.router.navigate(['/user/feedback-listing'])
    },
      error => {
        this.commonUtilsService.onError(error);
      })

  }
}
