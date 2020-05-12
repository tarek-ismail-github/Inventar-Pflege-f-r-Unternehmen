import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse,HttpEventType ,HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from  'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
  baseUrl = environment.baseUrl;
  private _url: string = this.baseUrl +"/upload" ;


  constructor(private _http: HttpClient, private router: Router, private messageService: MessageService,
    private httpClient: HttpClient) { }

  getAllFiles(): Observable<any> {
    return this._http.get(this._url)
    .catch(this.errorHandler)
  }

  errorHandler(error :HttpErrorResponse){
    return Observable.throw(error.message || "Server Error");
  }

  addFile(file){
    return this._http.post<any>(this.baseUrl, {operation:"insert", table:"CSV", values:file ,filepath:"C:\Users\Tarek\Desktop\praktikum2\AngularFrontend\src\assets\data"})

  }

  downloadFile(file:String){
    var body = {filename:file};

    return this._http.post(this.baseUrl,body,{
    });
  }
  upload(data) {

    return this.httpClient.post<any>(this._url, data);
  }
  // uploadFile(fileToUpload): Observable<any> {
  //   const formData: FormData = new FormData();
  //   formData.append('csv', fileToUpload, fileToUpload.name);
  //   return this._http.post<any>(this.baseUrl + "/upload",formData);
  // }

  // downloadFile(fileName: string): Observable<Blob> {
  //   return this._http.get(this._url + fileName,
  //    { responseType: 'blob'
  //    });
  // }

  deleteFile(uuid: string): Observable<any> {
    return this._http.delete('api/exchange/deleteFile/' + uuid);
  }

  updateFile(uuid, desc): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('desc', desc);
    return this._http.put(this.baseUrl , formData);
  }
}
