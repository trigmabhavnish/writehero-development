import { Component, OnInit } from '@angular/core';
import { CreditsService } from 'src/app/core/_services';

@Component({
  selector: 'app-billing-listing',
  templateUrl: './billing-listing.component.html',
  styleUrls: ['./billing-listing.component.css']
})
export class BillingListingComponent implements OnInit {
  //pagination initilize
  pageSize: number = 10;
  currentPage: number = 1;
  totalItems: number = 0
  billingListing:any [];
  constructor(private creditService: CreditsService) { }

  ngOnInit() {
   this.getCreditListing();
  }

  public getCreditListing(): void {
    this.creditService.getTransactionsListing({pageNumber: this.currentPage, pageSize: this.pageSize }).subscribe(response => {
    this.billingListing = response.transactions;
    this.totalItems =response.totalItems
    }, error => {

    })
  }


  public pageChanged(pageNumber:any):void{
    this.currentPage = pageNumber;
    this.getCreditListing();
  }
}
