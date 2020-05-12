import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Server } from '../../models/server.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ServerDialogComponent } from '../server-dialog/server-dialog.component';
import { ServerService } from 'src/app/services/server.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-server-edit-dialog',
  templateUrl: './server-edit-dialog.component.html',
  styleUrls: ['./server-edit-dialog.component.css']
})
export class ServerEditDialogComponent implements OnInit {
  editeServerForm: FormGroup;
  submitted = false;
  addServerSubscription: Subscription;
  result: any;
  server :Server;

  constructor( public dialogRef: MatDialogRef<ServerDialogComponent>,
    private fb: FormBuilder,
    private serverService : ServerService,
    private messageService: MessageService,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.editeServerForm = this.fb.group({
      OS : ['',],
      Ort: ['',],
      Typ: ['',],
      ServerID: ['',],

     });
 
     if (this.data !== undefined) {
       this.editeServerForm.patchValue(this.data);
     }
  }
  editServerSubmit(){
    if (this.data !== undefined)
      this.submitted = true;

      if (this.editeServerForm.invalid) {
        return;
      }

      this.server = this.data;
      this.server.OS = this.editeServerForm.get('OS').value;
      this.server.Ort = this.editeServerForm.get('Ort').value;
      this.server.Typ = this.editeServerForm.get('Typ').value;
      this.server.ServerID = this.editeServerForm.get('ServerID').value;
      this.serverService.editServer( this.server)
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
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
