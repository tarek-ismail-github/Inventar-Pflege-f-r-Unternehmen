import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-teilnehmer-dialog',
  templateUrl: './teilnehmer-dialog.component.html',
  styleUrls: ['./teilnehmer-dialog.component.css']
})
export class TeilnehmerDialogComponent implements OnInit {
  addUserForm: FormGroup;
  submitted = false;
  projectIdList = [];




  constructor(
    public dialogRef: MatDialogRef<TeilnehmerDialogComponent>,

  ) { }

  ngOnInit() {
  }
  onSubmit(){}
  get addUF() { return this.addUserForm.controls; }
  onCancelClick(): void {
    this.dialogRef.close();
  }

}
