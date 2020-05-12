import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AssestTypeService } from 'src/app/services/assest-type.service';
import { Table } from 'src/app/models/table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-assest-delete-dialog',
  templateUrl: './assest-delete-dialog.component.html',
  styleUrls: ['./assest-delete-dialog.component.css']
})
export class AssestDeleteDialogComponent implements OnInit {
  deleteAssestForm : FormGroup;
  submitted = false;
  deleteAssestSubscription : Subscription;
  tableList=[];
  table : Table;


  constructor(public dialogRef: MatDialogRef<AssestDeleteDialogComponent>,
    private fb: FormBuilder,
      private messageService : MessageService,
      private assestService :AssestTypeService,
      @Inject(MAT_DIALOG_DATA) public data : Table ,) {
       }

  ngOnInit() {
    // this.deleteAssestForm = this.fb.group({
    //   AssestName: ['test', Validators.required],
    //   TableName:[''],
    // });
    if (this.data !== undefined) {
    this.table = this.data
    }
  }
  getAllTables() {
    this.assestService.getTables().subscribe(response => {
      this.tableList = response;
    }, error => {
      console.log(error);
      this.messageService.add({key: 'mainToast', severity: 'error', summary: 'Die Liste der Unternehmen kann nicht geladen werden.'});
    } );
  }
  deleteAssest() {
    if (this.table !== undefined && this.table.AssestName !== undefined ) {
    this.assestService.deleteTable(this.table.AssestName).subscribe(response => {
      this.messageService.add({  key: 'mainToast', severity: 'success', summary: 'Tabelle erfolgreich gelöscht' });
      this.dialogRef.close();
    },
    error => {
      console.log('Error', error);
      if (error) {
       this.messageService.add({  key: 'mainToast', severity: 'error', summary: error.error,  sticky: true });
     }
    } );
    }

  }
  onCancelClick(): void {
    this.dialogRef.close();
  }
  get addAssest() { return this.deleteAssestForm.controls; }

}
