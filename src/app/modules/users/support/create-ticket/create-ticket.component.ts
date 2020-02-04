import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MovingDirection } from 'angular-archwizard'; // Wizard
@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css']
})
export class CreateTicketComponent implements OnInit {
  createTicketForm:FormGroup;
  isSubmitted:boolean = false; // true when submit the form



  constructor(private fb:FormBuilder) { }

  ngOnInit() {

    this.createTicketForm = this.fb.group({
             support_type:["",Validators.required],
             subject:[null,Validators.required],
             message:[null,Validators.required],
             support_file:[null]
    });
  }




    /**
   * validate wizard and move to either direction. 
   * @param validityStatus boolean(form validation status)
   * @param direction boolean(wizard direction)
   * @return  booleanimport { MovingDirection } from 'angular-archwizard'; // Wizard
   */
  moveDirection = (validityStatus, direction) => {
    if (direction === MovingDirection.Backwards) {
      return true;
    }
    return validityStatus;
  };


/**
 * Validate create ticket form and submit from value to Db
 */
  public submitTicket():void{
     if(this.createTicketForm.invalid) return 
     console.log('the form value is',this.createTicketForm.value)
  }
}
