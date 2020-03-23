import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-inner-header',
  templateUrl: './inner-header.component.html',
  styleUrls: ['./inner-header.component.css']
})
export class InnerHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public addClass(): void {
    $("body").toggleClass('overflow-hiding');
  }
}
