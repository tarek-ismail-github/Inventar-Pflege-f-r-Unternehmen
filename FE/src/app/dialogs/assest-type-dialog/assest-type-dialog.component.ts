import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators,FormArray } from '@angular/forms';

import { Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MessageService } from 'primeng/api';
import { AssestTypeService } from 'src/app/services/assest-type.service';
import { Table } from 'src/app/models/table';

@Component({
  selector: 'app-assest-type-dialog',
  templateUrl: './assest-type-dialog.component.html',
  styleUrls: ['./assest-type-dialog.component.css']
})
export class AssestTypeDialogComponent implements OnInit {

  addAssestForm :FormGroup;
  submitted = false;
  containers = [];
  addAssestSubscription : Subscription;
  result: any;
  table :Table;


  constructor( public dialogRef: MatDialogRef<AssestTypeDialogComponent>,
    private fb: FormBuilder,
    // private fb1: FormBuilder,

      private messageService : MessageService,
      private assestService :AssestTypeService,
      @Inject(MAT_DIALOG_DATA) public data :Table ,
    ) { }

  ngOnInit() {
    this.addAssestForm = this.fb.group({
      AssestName: ['test'],
      AttributName :this.fb.array([]),
      DatenType:this.fb.array([]),

    });

  }
  get AttributName() {
    return this.addAssestForm.get('AttributName') as FormArray;
  }
  get DatenType() {
    return this.addAssestForm.get('DatenType') as FormArray;
  }

  addAttribut(){
    this.AttributName.push(this.fb.control(''));
    this.DatenType.push(this.fb.control(''));

  }
  onSubmit(){
    this.messageService.clear('mainToast');
    this.submitted = true;
    if(this.addAssestForm.invalid ) {
      return;
    }
    this.addAssestSubscription = this.assestService.addTable(this.addAssestForm.value)
    .subscribe(
      response => {
        this.messageService.add({ key: 'mainToast', severity: 'success', summary: 'die Tabelle wurde erfolgreich hinzugefügt',
         sticky: true });
        this.submitted = false;
        this.dialogRef.close();
      },
      error => {
        console.log('Error', error);
        if (error) {
          this.messageService.add({key: 'mainToast', severity: 'error', summary: 'Ungültige Tabelle bereits vorhanden'});
          this.submitted = false;
        }
      }
    )
  }

   get addAssest() { return this.addAssestForm.controls; }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
