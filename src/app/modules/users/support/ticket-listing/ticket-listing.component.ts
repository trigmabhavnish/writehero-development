import { Component, OnInit } from '@angular/core';
import { SupportService } from 'src/app/core/_services';

@Component({
  selector: 'app-ticket-listing',
  templateUrl: './ticket-listing.component.html',
  styleUrls: ['./ticket-listing.component.css']
})
export class TicketListingComponent implements OnInit {

  constructor(private supportService:SupportService) { }

  ngOnInit() {
    this.supportService.getSupportTickets({}).subscribe(response=>{
      console.log('the message is',response)
    })
  }

}
