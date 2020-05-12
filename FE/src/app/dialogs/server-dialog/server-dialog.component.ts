import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ServerService } from 'src/app/services/server.service';
import { MessageService } from 'primeng/api';
import { Server } from '../../models/server.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-server-dialog',
  templateUrl: './server-dialog.component.html',
  styleUrls: ['./server-dialog.component.css']
})
export class ServerDialogComponent implements OnInit {
  addServerForm: FormGroup;
  submitted = false;
  addServerSubscription: Subscription;
  result: any;
  server :Server;

  constructor(    public dialogRef: MatDialogRef<ServerDialogComponent>,
    private fb: FormBuilder,
    private serverService : ServerService,
    private messageService: MessageService,
    @Inject(MAT_DIALOG_DATA) public data: Server
    ) { }

  ngOnInit() {
    this.addServerForm = this.fb.group({
      OS : ['', Validators.required],
      Ort: ['', Validators.required],
      Typ: ['', Validators.required],
      ServerID: ['', Validators.required],

     });
 
     if (this.data !== undefined) {
       this.addServerForm.patchValue(this.data);
     }
  }

  addServerSubmit(){
  
    this.messageService.clear('mainToast');
    this.submitted = true;
    if(this.addServerForm.invalid) {
      return;
    }

    this.addServerSubscription = this.serverService.addServer(this.addServerForm.value)
    .subscribe(
      response => {
        this.messageService.add({ key: 'mainToast', severity: 'success', summary: 'das Server wurde erfolgreich hinzugefügt',
         sticky: true });
        this.submitted = false;
        this.dialogRef.close();
      },
      error => {
        console.log('Error', error);
        if (error) {
          this.messageService.add({key: 'mainToast', severity: 'error', summary: 'Ungültige Server bereits vorhanden'});
          this.submitted = false;
        }
      }
    );
  }

  get addServer() { return this.addServerForm.controls; }
  onCancelClick(): void {
    this.dialogRef.close();
  }

}
