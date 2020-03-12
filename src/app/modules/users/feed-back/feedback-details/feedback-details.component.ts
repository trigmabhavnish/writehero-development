import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeedBackService } from 'src/app/core/_services';
import { untilDestroyed } from 'ngx-take-until-destroy';
// import environment
import { environment } from '../../../../../environments/environment';
@Component({
  selector: 'app-feedback-details',
  templateUrl: './feedback-details.component.html',
  styleUrls: ['./feedback-details.component.css']
})
export class FeedbackDetailsComponent implements OnInit {
  userId:any;
  projectId:any;
  feedBackData:any;
  allRateData:any;
  loading:boolean =false;
  defaultPath = environment.DEFAULT_PROFILE_PIC;
  constructor(private route:ActivatedRoute,private feedbckservice: FeedBackService) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('user_id');
    this.projectId = this.route.snapshot.paramMap.get('project_id');
    this.getFeedbackDetails();
  }
 
  /**
     * GET FEEDBACK DETAILS
   */
  public getFeedbackDetails():void{
    this.loading = true;
    this.feedbckservice.getFeedBackDetails({userId:this.userId,projectId:this.projectId}).pipe(untilDestroyed(this)).subscribe(response=>{
      this.feedBackData = response.feedback.feedback[0];
      this.allRateData = response.feedback.allrate;
      this.loading = false;
    },error=>{
    })
  }

 // This method must be present, even if empty.
 ngOnDestroy() {
  // To protect you, we'll throw an error if it doesn't exist.
}

}
