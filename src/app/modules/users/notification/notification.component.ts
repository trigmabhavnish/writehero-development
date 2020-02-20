import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/_services';
import { untilDestroyed } from 'ngx-take-until-destroy';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notifications: any = [];
  loading:boolean= false;
  //pagination initilize
  pageSize: number = 10;
  currentPage: number = 1;
  totalItems: number = 0
  constructor(private userService: UsersService) {



  }

  ngOnInit() {

    this.getNotificationListing();
  }

  private getNotificationListing(): void {
    this.loading = true;
    this.userService.getUserNotifications({ pageNumber: this.currentPage, pageSize: this.pageSize }).pipe(untilDestroyed(this)).subscribe((response:any) => {
      this.notifications = response.notifications;
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
    this.getNotificationListing();
  }


   // This method must be present, even if empty.
   ngOnDestroy() {
    // To protect you, we'll throw an error if it doesn't exist.
  }
}
