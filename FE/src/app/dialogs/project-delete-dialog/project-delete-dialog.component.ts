import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProjectService } from 'src/app/services/project.service';
import { MessageService } from 'primeng/api';
import { Project } from 'src/app/models/project.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-project-delete-dialog',
  templateUrl: './project-delete-dialog.component.html',
  styleUrls: ['./project-delete-dialog.component.css']
})
export class ProjectDeleteDialogComponent implements OnInit {
  deleteProjectForm: FormGroup;
  submitted = false;
  deleteProjectSubscription: Subscription;
  result: any;
  project : Project;
  @ViewChild('agGrid',{static:true}) agGrid: AgGridAngular;
  constructor(public dialogRef: MatDialogRef<ProjectDeleteDialogComponent>,
    public projectService: ProjectService,
    private messageService: MessageService,
    private fb: FormBuilder,

    @Inject(MAT_DIALOG_DATA) public data:Project ) { }

  ngOnInit() {
    // this.deleteProjectForm = this.fb.group({
    //   ProjektID : ['', Validators.required],
    //   Name: ['', Validators.required],
    //   Mitarbeiter: ['', Validators.required],
    //   Kunde : ['', Validators.required],
    //   Kosten: ['', Validators.required],
    //   Projektstart: ['', Validators.required],
    //   Projektende: ['', Validators.required],


    //  });
 
     if (this.data !== undefined&&this.data.ProjektID!==undefined) {
       
      this.project = this.data;
    }
    // if (this.project !== undefined ) {
    //   this.project = this.data;
    // }
  }
  deleteProjekt() {
    if (this.project !== undefined && this.project.ProjektID !== undefined ) {

    this.projectService.deleteProject(this.project.ProjektID).subscribe(response => {
      this.messageService.add({  key: 'mainToast', severity: 'success', summary: 'Project erfolgreich gelöscht' });
      this.dialogRef.close();
    },
    error => {
      console.log('Error', error);
      if (error) {
       this.messageService.add({  key: 'mainToast', severity: 'error', summary: error.error,  sticky: true });
     }
  } );}
  }
  onCancelClick(): void {
    this.dialogRef.close();
  }

}
