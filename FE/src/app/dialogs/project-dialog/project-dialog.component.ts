import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/models/project.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProjectService } from 'src/app/services/project.service';
import { MessageService } from 'primeng/api';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.css']
})
export class ProjectDialogComponent implements OnInit {
  addProjectForm: FormGroup;
  submitted = false;
  addProjectSubscription: Subscription;
  result: any;
  project : Project;
  @ViewChild('agGrid',{static:true}) agGrid: AgGridAngular;


  constructor(public dialogRef: MatDialogRef<ProjectDialogComponent>,
    private fb: FormBuilder,
    private projectService : ProjectService,
    private messageService: MessageService,
    @Inject(MAT_DIALOG_DATA) public data: Project) { }

  ngOnInit() {
    this.addProjectForm = this.fb.group({
      ProjektID : ['', Validators.required],
      Name: ['', Validators.required],
      Mitarbeiter: ['', Validators.required],
      Kunde : ['', Validators.required],
      Kosten: ['', Validators.required],
      Projektstart: ['', Validators.required],
      Projektende: ['', Validators.required],


     });
 
     if (this.data !== undefined) {
       
       this.addProjectForm.patchValue(this.data);
       if (this.data) {
      }
     }
  }
  addProjectSubmit(){
    if (this.data !== undefined) {

      this.submitted = true;

      if (this.addProjectForm.invalid) {
        return;
      }
      // const project  :FormData = new FormData();
      // project.append('ProjektID',this.addProjectForm.get('ProjektID').value) ;
      // project.append('Name',this.addProjectForm.get('Name').value) ;
      // project.append('Kunde',this.addProjectForm.get('Kunde').value) ;
      // project.append('Mitarbeiter',this.addProjectForm.get('Mitarbeiter').value) ;
      // project.append('Kosten',this.addProjectForm.get('Kosten').value) ;
      // project.append('Projektstart',this.addProjectForm.get('Projektstart').value) ;
      // project.append('Projektende',this.addProjectForm.get('Projektende').value) ;


      this.project = this.data;
      this.project.ProjektID = this.addProjectForm.get('ProjektID').value;
      this.project.Name = this.addProjectForm.get('Name').value;
      this.project.Kunde = this.addProjectForm.get('Kunde').value;
      this.project.Mitarbeiter = this.addProjectForm.get('Mitarbeiter').value;
      this.project.Kosten = this.addProjectForm.get('Kosten').value;
      this.project.Projektstart = this.addProjectForm.get('Projektstart').value;
      this.project.Projektende = this.addProjectForm.get('Projektende').value;

     this.projectService.editProject( this.project)
      .subscribe(
        response => {
          this.dialogRef.close();
          this.messageService.add({  key: 'mainToast', severity: 'success', summary: 'Projekt erfolgreich bearbeitet' });
          this.submitted = false;
        },
        error => {
          console.log('Error', error);
          if (error) {
           this.messageService.add({  key: 'mainToast', severity: 'error', summary: error.statusText });
           this.submitted = false;
         }
        }
      );

    } else {
    this.submitted = true;
      // stop here if form is invalid
    // if(this.addProjectForm.invalid) {
    //   return;
    // }
    this.addProjectSubscription = this.projectService.addProject(this.addProjectForm.value)
    .subscribe(
      response => {
        this.messageService.add({ key: 'mainToast', severity: 'success', summary: 'das Projekt wurde erfolgreich hinzugefügt',
         sticky: true });
        this.submitted = false;
        this.dialogRef.close();
      },
      error => {
        console.log('Error', error);
        if (error) {
          this.messageService.add({key: 'mainToast', severity: 'error', summary: 'Ungültige Projekt bereits vorhanden'});
          this.submitted = false;
        }
      }
    )
  }}

  get addProject() { return this.addProjectForm.controls; }
  onCancelClick(): void {
    this.dialogRef.close();
  }

}
