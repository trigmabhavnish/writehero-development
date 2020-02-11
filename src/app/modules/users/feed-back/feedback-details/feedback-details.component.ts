import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeedBackService } from 'src/app/core/_services';
import { MovingDirection } from 'angular-archwizard'; // Wizard
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
    this.feedbckservice.getFeedBackDetails({userId:this.userId,projectId:this.projectId}).subscribe(response=>{
      this.feedBackData = response.feedback.feedback[0];
      this.allRateData = response.feedback.allrate;
    },error=>{
      console.log();
    })
  }



}
