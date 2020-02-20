import { Component, OnInit } from '@angular/core';
import { FeedBackService } from 'src/app/core/_services';
import { untilDestroyed } from 'ngx-take-until-destroy';
@Component({
  selector: 'app-feed-back-listing',
  templateUrl: './feed-back-listing.component.html',
  styleUrls: ['./feed-back-listing.component.css']
})
export class FeedBackListingComponent implements OnInit {
  rating: number = 1;
  feedbacks: any = [];
  user: any;
  loading:boolean= false;
  //pagination initilize
  pageSize: number = 10;
  currentPage: number = 1;
  totalItems: number = 0
  constructor(private feedbackservice: FeedBackService) {



  }

  ngOnInit() {

    this.getFeedBackLsiting();
  }

  private getFeedBackLsiting(): void {
    this.loading = true;
    this.feedbackservice.getFeedBackListing({ pageNumber: this.currentPage, pageSize: this.pageSize }).pipe(untilDestroyed(this)).subscribe(response => {
      this.feedbacks = response.feedback;
      this.totalItems = response.totalItems;
      this.loading = false;
    },error=>{
      
    })
  }

  /**
   * ON PAGE CHANGE
   * @param pageNumber 
   */
  public pageChanged(pageNumber: any): void {
    this.currentPage = pageNumber;
    this.getFeedBackLsiting();
  }


   // This method must be present, even if empty.
   ngOnDestroy() {
    // To protect you, we'll throw an error if it doesn't exist.
  }

}
