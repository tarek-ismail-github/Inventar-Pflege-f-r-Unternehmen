import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MessageService } from 'primeng/api';
import { DeploymentService } from 'src/app/services/deployment.service';
import { Deployment } from 'src/app/models/deployment.model';

@Component({
  selector: 'app-deployment-dialog',
  templateUrl: './deployment-dialog.component.html',
  styleUrls: ['./deployment-dialog.component.css']
})
export class DeploymentDialogComponent implements OnInit {
  
  addDeploymentForm: FormGroup;
  submitted = false;
  addDeploymentSubscription: Subscription;
  result: any;
  deployment : Deployment;

  constructor(  public dialogRef: MatDialogRef<DeploymentDialogComponent>,
    private fb: FormBuilder,
    private deploymentService : DeploymentService,
    private messageService: MessageService,
    @Inject(MAT_DIALOG_DATA) public data: Deployment) { }

  ngOnInit() {
    this.addDeploymentForm = this.fb.group({
      Datum : ['', Validators.required],
      DeployID: ['', Validators.required],
      DurchfuehrenderMitarbeiter: ['', Validators.required],
      InstallierteVersion : ['', Validators.required],
      ProjektID : ['', Validators.required],
      ServerID: ['', Validators.required],

     });
 
     if (this.data !== undefined) {
       this.addDeploymentForm.patchValue(this.data);
     }
  }
  addDeploymentSubmit(){
    if (this.data !== undefined) {

      this.submitted = true;

      if (this.addDeploymentForm.invalid) {
        return;
      }
      this.deployment = this.data;
      this.deployment.Datum = this.addDeploymentForm.get('Datum').value;
      this.deployment.DeployID = this.addDeploymentForm.get('DeployID').value;
      this.deployment.DurchfuehrenderMitarbeiter = this.addDeploymentForm.get('DurchfuehrenderMitarbeiter').value;
      this.deployment.InstallierteVersion = this.addDeploymentForm.get('InstallierteVersion').value;
      this.deployment.ProjektID = this.addDeploymentForm.get('ProjektID').value;
      this.deployment.ServerID = this.addDeploymentForm.get('ServerID').value;

     this.deploymentService.editDeployment( this.deployment)
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
    this.messageService.clear('mainToast');
    this.submitted = true;
    if(this.addDeploymentForm.invalid) {
      return;
    }
    this.addDeploymentSubscription = this.deploymentService.addDeployment(this.addDeploymentForm.value)
    .subscribe(
      response => {
        this.messageService.add({ key: 'mainToast', severity: 'success', summary: 'das Deployment wurde erfolgreich hinzugefügt',
         sticky: true });
        this.submitted = false;
        this.dialogRef.close();
      },
      error => {
        console.log('Error', error);
        if (error) {
          this.messageService.add({key: 'mainToast', severity: 'error', summary: 'Ungültige Deployment bereits vorhanden'});
          this.submitted = false;
        }
      }
    )
  }
  }

  get addDeployment() { return this.addDeploymentForm.controls; }
  onCancelClick(): void {
    this.dialogRef.close();
  }
}
