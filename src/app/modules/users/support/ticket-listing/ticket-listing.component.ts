import { Component, OnInit } from '@angular/core';
import { SupportService } from 'src/app/core/_services';
import { Router } from '@angular/router';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-ticket-listing',
  templateUrl: './ticket-listing.component.html',
  styleUrls: ['./ticket-listing.component.css']
})
export class TicketListingComponent implements OnInit {
  tickets:any = [];
  user:any;
  //pagination initilize
  pageSize :number = 1;
  currentPage:number = 1;
  totalItems: number = 0
  constructor(private supportService:SupportService,private router:Router) { }

  ngOnInit() {
    this.supportService.getSupportTickets({pageNumber:this.currentPage,pageSize:this.pageSize}).subscribe(response=>{
      console.log('the message is',response)
      this.tickets = response.tickets;
      this.totalItems = response.totalItems;
      this.user = response.user;
    })
  }


public viewDetails(ticket:any):void{
  this.router.navigate(['/user/ticket-detail/'+ticket.id])

}

/**
 * 
 * @param pageNumber is the page number on change pagination click
 */
  public pageChanged(pageNumber:any):void{

  }
}
