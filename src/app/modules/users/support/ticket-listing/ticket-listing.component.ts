import { Component, OnInit } from '@angular/core';
import { SupportService } from 'src/app/core/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-listing',
  templateUrl: './ticket-listing.component.html',
  styleUrls: ['./ticket-listing.component.css']
})
export class TicketListingComponent implements OnInit {
  tickets: any = [];
  user: any;
  loading:boolean =false;
  //pagination initilize
  pageSize: number = 10;
  currentPage: number = 1;
  totalItems: number = 0
  constructor(private supportService: SupportService, private router: Router) { }

  ngOnInit() {
    this.getSuppotsData();//get supports tikcets data
  }




  /**
   * get supports tickets data of user
   */
  private getSuppotsData(): void {
    this.loading = true;
    this.supportService.getSupportTickets({ pageNumber: this.currentPage, pageSize: this.pageSize }).subscribe(response => {      
      this.tickets = response.tickets;
      this.totalItems = response.totalItems;
      this.user = response.user;
      this.loading = false;
    },error=>{
      this.loading = false;
    })
  }



  /**
   * navigate to View Details of the ticket
   * @param ticket containg the id of the ticket
   */
  public viewDetails(ticket: any): void {
    this.router.navigate(['/user/ticket-detail/' + ticket.id]);

  }



  /**
   * 
   * @param pageNumber is the page number on change pagination click
   */
  public pageChanged(pageNumber: any): void {
    this.currentPage = pageNumber;
    this.getSuppotsData();
  }


  public navigateToCreateNewTicket():void{
    this.router.navigate(['/user/create-ticket'])
  }
}
