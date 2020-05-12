import { Component, OnInit, ViewChild } from '@angular/core';
import { FileSelectDirective, FileUploader} from 'ng2-file-upload';
import { MessageService } from 'primeng/api';
import { ExchangeService } from 'src/app/services/exchange.service';
import { MatDialog } from '@angular/material';
import { ExchangeDialogComponent } from '../../dialogs/exchange-dialog/exchange-dialog.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { environment } from 'src/environments/environment';
import { saveAs  } from 'file-saver';
import { HttpClient ,HttpEventType } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { Subscription } from 'rxjs';
import { TableUtils } from 'src/app/utils/utils';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-exchange-portal',
  templateUrl: './exchange-portal.component.html',
  styleUrls: ['./exchange-portal.component.css']
})
export class ExchangePortalComponent implements OnInit {
  baseUrl = environment.baseUrl;
  private _url: string = this.baseUrl+"/upload" ;
  public localeText;
  public errorMg ;
  //error = null;
  csv:File =null;
  constructor(private formBuilder: FormBuilder,
    private messageService: MessageService,
    public dialog: MatDialog,
    private _router: Router,
    public authService: AuthenticationService,
    private exchangeService: ExchangeService,
    private titleService: Title,
    private http : HttpClient) {
      this.localeText = TableUtils.localeText;

  }

  ngOnInit() {
    this.titleService.setTitle('CSV Datei');

  }
  onFileChange(event) {
    console.log(event);
      this.csv =<File> event.target.files[0];
    }


  onSubmit() {
    const formData = new FormData();
    formData.append('csv', this.csv,this.csv.name );
    this.http.post(this._url,formData, {
      reportProgress:true,
      observe:'events'
    })
    .subscribe(event =>{
      if (event.type === HttpEventType.UploadProgress) {
      console.log('Upload progress :'+Math.round( event.loaded/event.total*100)+'%')
      }else if (event.type===HttpEventType.Response){
        console.log(event)
      }
    })

  }

  // openExchangeDialog(){
  //   const dialogRef = this.dialog.open(ExchangeDialogComponent, {
  //     width: '600px',
  //     data: {}
  //   });
  // }
  // onHandleError() {
  //   this.error = null;
  // }

  // onFileSelected(event){
  //   this.selectedFile= <File>event.target.files[0];
  //   console.log(event);
  // }

  // onUpload(event) {
  //   this.uploadedFiles = [];
  //   for (const file of event.files) {
  //     this.uploadedFiles.push(file);
  //   }
  //   this.fileUpload.clear();
  //   console.log(this.uploadedFiles)
  // }
  
  // onSubmit(){
  //   if ( this.uploadedFiles.length > 0) {
  //     this.exchangeService.upload(this.uploadedFiles[0]).subscribe(data => {
  //       this.messageService.clear();
  //       this.messageService.add({  key: 'mainToast', severity: 'success', summary: 'Datei hinzugefügt' });
  //     },
  //     error => {
  //       console.log('Error', error);
  //       if (error) {
  //        this.messageService.add({  key: 'mainToast', severity: 'error',
  //         summary: 'Datei existiert bereits! Bitte wählen Sie eine andere Datei aus oder ändern Sie den Dateinamen.', sticky: true });
  //      }
  //     });
  //   } else {
  //     this.messageService.add({  key: 'mainToast', severity: 'error', summary: 'Formular unvollständig' });
  //   }
 
  // getAllFiles() {
  //   this.exchangeService.getAllFiles().subscribe(data => {
  //     // if (data != null) {
  //     //   data.forEach(file => {
  //     //     file.fileSize = this.sizeFormatter(file.fileSize);
  //     //   });
  //     // }
  //     this.fileData = data;

  //     setTimeout(() => {
  //       this.messageService.clear('mainToast');
  //     }, 10000);
  //   }, error => console.log(error));
  // }

  // sizeFormatter(fileSize) {
  //   if (fileSize === 0) { return '0 Bytes'; }
  //   const decimals = 2;
  //   const k = 1024;
  //   const dm = decimals < 0 ? 0 : decimals;
  //   const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  //   const i = Math.floor(Math.log(fileSize) / Math.log(k));

  //   return parseFloat((fileSize / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  // }
  // addFile() {
  //   const dialogRef = this.dialog.open(ExchangeDialogComponent, {
  //     width: '1300px',
  //     height: '500px',
  //     data: {}
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     this.getAllFiles();
  //   });
  // }
  // downloadFile(fileName) {
  //   this.messageService.add({  key: 'mainToast', severity: 'info', summary: 'Der Dateidownload wird in Kürze gestartet.' });
  //   this.exchangeService.downloadFile(fileName).subscribe(
  //     data => {
  //     const newBlob = new Blob([data], { type: data.type });
  //     const downloadURL = window.URL.createObjectURL(newBlob);
  //     const link = document.createElement('a');
  //     link.href = downloadURL;
  //     link.download = fileName;
  //     link.click();
  //      //saveAs(newBlob, fileName);
  //     this.messageService.add({  key: 'mainToast', severity: 'success', summary: 'Datei-Download gestartet' });
  //   },
  //   error => {
  //     console.log('Error', error);
  //     if (error) {
  //      this.messageService.add({  key: 'mainToast', severity: 'error',
  //       summary: 'Fehler! Bitte kontaktieren Sie die Gesundheitsforen Leipzig', sticky: true });
  //    }
  //   });
  // }
  // editDesc(file) {
  //   const dialogRef = this.dialog.open(ExchangeDialogComponent, {
  //     width: '600px',
  //     height: '400px',
  //     data: file
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     this.getAllFiles();
  //   });
  // }

  // deleteFile(file) {
  //   this.exchangeService.deleteFile(file.uuid).subscribe(data => {
  //     this.messageService.add({  key: 'mainToast', severity: 'success', summary: 'Datei erfolgreich gelöscht' });
  //     this.getAllFiles();
  //   },
  //   error => {
  //     console.log('Error', error);
  //     if (error) {
  //      this.messageService.add({  key: 'mainToast', severity: 'error',
  //       summary: 'Fehler! Bitte kontaktieren Sie die Gesundheitsforen Leipzig', sticky: true });
  //    }
  //   });
  // }
  
}
