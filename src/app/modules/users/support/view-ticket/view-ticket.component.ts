import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SupportService } from 'src/app/core/_services';

@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.css']
})
export class ViewTicketComponent implements OnInit {
  supportId: any;
  supportData: any;
  constructor(private route: ActivatedRoute, private supportService: SupportService) { }

  ngOnInit() {
    this.supportId = this.route.snapshot.paramMap.get('_id');
    this.getTicketDetails();

  }



  /**
   * GET the details of ticket with message
   */
  private getTicketDetails(): void {
    this.supportService.getTicketDetails({ supportId: this.supportId }).subscribe(response => {
      this.supportData = response;
    }, error => {

    })
  }


}
