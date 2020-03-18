import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CreditsService } from 'src/app/core/_services';
import { Router } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';
import * as jsPDF from 'jspdf';

import html2canvas from 'html2canvas';
declare var $: any;
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
  billingListing: any[];
  loading: boolean = false;
  invoiceDetails: any;
  calculateDiscount: any;
  @ViewChild('invoiceDiv', { static: false }) content: ElementRef;
  constructor(private creditService: CreditsService,private router: Router) { }

  ngOnInit() {
    this.getCreditListing();
  }

  public getCreditListing(): void {
    this.loading = true;
    this.creditService.getTransactionsListing({ pageNumber: this.currentPage, pageSize: this.pageSize }).pipe(untilDestroyed(this)).subscribe(response => {
      this.billingListing = response.transactions;
      this.totalItems = response.totalItems;
      //console.log(this.billingListing);
      this.loading = false;
    }, error => {
      this.loading = false;
    })
  }


  public openInvoiceDetails(invoice): void {
    
    this.invoiceDetails = invoice;
    //console.log(this.invoiceDetails);
    this.calculateDiscount = (invoice.discount / 100) * invoice.cost;
    $('#invoiceModal').modal('show')
  }







  public downloadInvoice() {
    // parentdiv is the html element which has to be converted to PDF
    const data = document.getElementById('invoiceDiv');
    const doc = new jsPDF();
    const content = this.content.nativeElement;
    html2canvas(content).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const doc = new jsPDF('p', 'mm');
      let heightLeft = imgHeight;
      let position = 0;
      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      doc.save('invoice' + '.pdf');
    });
  }

  public pageChanged(pageNumber: any): void {
    this.currentPage = pageNumber;
    this.getCreditListing();
  }

  public navigateToBuyCredits():void{
    this.router.navigate(['/user/buy-credits'])
  }


  // This method must be present, even if empty.
  ngOnDestroy() {
    // To protect you, we'll throw an error if it doesn't exist.
  }
}
