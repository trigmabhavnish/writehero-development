import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-wizard',
  templateUrl: './custom-wizard.component.html',
  styleUrls: ['./custom-wizard.component.css']
})
export class CustomWizardComponent implements OnInit {

  wizardSteps: Array<Object>; 
  constructor() { 

    this.wizardSteps = [
      {
        header: 'Passo 1',
        content: 'Content: Step 1'
      },
      {
        header: 'Passo 2',
        content: 'Content: Step 2'
      },
      {
        header: 'Passo 3',
        content: 'Content: Step 3'
      }
    ];

  }

  ngOnInit() {
  }

}
