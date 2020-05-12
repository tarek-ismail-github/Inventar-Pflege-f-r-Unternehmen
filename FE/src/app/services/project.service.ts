import { Project } from './../models/project.model';
import { Injectable } from '@angular/core';
import { Subject, throwError, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import{environment} from '../../environments/environment'
import { Table } from '../models/table';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  baseUrl = environment.baseUrl;
  private _url :string = this.baseUrl+"?table=Projekt";
  error = new Subject<string>();
  project : Project;
  condition  =false;

  constructor(private http: HttpClient) { }
  
  getAllProjekt(): Observable<any>{
    return this.http.get(this._url)
    .catch(this.errorHandler)
  }
  errorHandler(error :HttpErrorResponse){
    return Observable.throw(error.message || "Server Error");
  }
  addProject(server: any) {
    return this.http.put<any>(this.baseUrl, {operation:"insert", table:"Projekt", values:server});
  }
  deleteProject(project) {
    return this.http.post<any>(this.baseUrl, {operation:"delete", table:"Projekt",conditions:[project]});
  }
  editProject(project:Project){
    return this.http.post<any>(this.baseUrl,{operation:"update", table:"Projekt",values:project,conditions:["ProjektID="+project.ProjektID]});

  }
}
