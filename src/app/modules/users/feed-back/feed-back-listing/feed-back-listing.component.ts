import { Component, OnInit } from '@angular/core';
import { FeedBackService } from 'src/app/core/_services';

@Component({
  selector: 'app-feed-back-listing',
  templateUrl: './feed-back-listing.component.html',
  styleUrls: ['./feed-back-listing.component.css']
})
export class FeedBackListingComponent implements OnInit {
  rating: number = 1;
  feedbacks: any = [];
  user: any;
  //pagination initilize
  pageSize: number = 10;
  currentPage: number = 1;
  totalItems: number = 0
  constructor(private feedbckservice: FeedBackService) {



  }

  ngOnInit() {

    this.getFeedBackLsiting();
  }

  private getFeedBackLsiting(): void {
    this.feedbckservice.getFeedBackListing({ pageNumber: this.currentPage, pageSize: this.pageSize }).subscribe(response => {
      this.feedbacks = response.feedback;
      this.totalItems = response.totalItems;
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
}
