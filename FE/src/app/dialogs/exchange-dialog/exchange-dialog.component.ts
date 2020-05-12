import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ExchangeService } from 'src/app/services/exchange.service';
import { AgGridAngular } from 'ag-grid-angular';
import { Subscription, from } from 'rxjs';
import {File} from '../../models/file'

@Component({
  selector: 'app-exchange-dialog',
  templateUrl: './exchange-dialog.component.html',
  styleUrls: ['./exchange-dialog.component.css']
})
export class ExchangeDialogComponent implements OnInit {
  addFileForm: FormGroup;
  submitted = false;
  addFileSubscription: Subscription;
  result: any;
  file :File;

  // @ViewChild('agGrid', {static: true}) agGrid: AgGridAngular;
  // uploadedFiles: any[] = [];
  // @ViewChild('fileUpload', {static: true}) fileUpload: any;
  // currentUser;

  constructor(
    private messageService: MessageService,
    public dialog: MatDialog,
    private exchangeService: ExchangeService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ExchangeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:File
  ) { }

  ngOnInit() {
    this.addFileForm = this.fb.group({
      ID: ['', [Validators.required]],
      File : ['']
    });
    if (this.data !== undefined) {
      this.addFileForm.patchValue({
      });
    }
  }
  onFileSelected(event){
    if (event.target.files.length>0) {
      const file=event.target.files[0];
      this.addFileForm.get('File').setValue(file.name);
      
    }
  }
  addFileSubmit(){
    this.messageService.clear('mainToast');
    this.submitted = true;
    if(this.addFileForm.invalid) {
      return;
    }

    this.addFileSubscription = this.exchangeService.addFile(this.addFileForm.value)
    .subscribe(
      response => {
        this.messageService.add({ key: 'mainToast', severity: 'success', summary: 'die Datei wurde erfolgreich hinzugefügt',
         sticky: true });
        this.submitted = false;
        this.dialogRef.close();
      },
      error => {
        console.log('Error', error);
        if (error) {
          this.messageService.add({key: 'mainToast', severity: 'error', summary: 'Ungültige DAtei bereits vorhanden'});
          this.submitted = false;
        }
      }
    );
    }
    onCancelClick(): void {
      this.dialogRef.close();
    }
}

  // onUpload(event) {
  //   this.uploadedFiles = [];
  //   for (const file of event.files) {
  //     this.uploadedFiles.push(file);
  //   }
  //   this.fileUpload.clear();
  // }

  

  // onSubmit() {
  //   if (this.addFileForm.invalid) {
  //     return;
  //   }
  //   if (this.data !== undefined && this.data.uuid !== undefined) {
  //     this.exchangeService.updateFile(this.data.uuid, descFromForm).subscribe(data => {
  //       this.messageService.clear();
  //       this.dialogRef.close();
  //       this.messageService.add({  key: 'mainToast', severity: 'success', summary: 'Dateibeschreibung aktualisiert' });
  //     },
  //     error => {
  //       console.log('Error', error);
  //       if (error) {
  //        this.messageService.add({  key: 'mainToast', severity: 'error',
  //         summary: '.', sticky: true });
  //      }
  //     });
  //   } else {
  //     if ( this.uploadedFiles.length > 0) {
  //       this.exchangeService.uploadFile(this.uploadedFiles[0]).subscribe(data => {
  //         this.messageService.clear();
  //         this.dialogRef.close();
  //         this.messageService.add({  key: 'mainToast', severity: 'success', summary: 'Datei hinzugefügt' });
  //       },
  //       error => {
  //         console.log('Error', error);
  //         if (error) {
  //          this.messageService.add({  key: 'mainToast', severity: 'error',
  //           summary: 'Datei existiert bereits! Bitte wählen Sie eine andere Datei aus oder ändern Sie den Dateinamen.', sticky: true });
  //        }
  //       });
  //     } else {
  //       this.messageService.add({  key: 'mainToast', severity: 'error', summary: 'Formular unvollständig' });
  //     }
  //   }

  // }

