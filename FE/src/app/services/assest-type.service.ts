import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Table } from '../models/table';
import { element } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class AssestTypeService {
  baseUrl = environment.baseUrl;
  private _url: string = this.baseUrl +"?table=Deployment";
  error = new Subject<string>();
  // {
  //   transformRequest: angular.identity,
  //   headers: {
  //     'Content-Type': undefined
  //   }
  constructor(private http: HttpClient) { }

  addTable(table:Table){
       console.log(table);
        return this.http.put<any>(this.baseUrl, {operation:"create", table:table.AssestName,
        columns:{[table.AttributName[0]]:table.DatenType[0],[table.AttributName[1]]:table.DatenType[1],
          [table.AttributName[2]]:table.DatenType[2],[table.AttributName[3]]:table.DatenType[3],[table.AttributName[4]]:table.DatenType[4],
          [table.AttributName[5]]:table.DatenType[5],[table.AttributName[6]]:table.DatenType[6],[table.AttributName[7]]:table.DatenType[7],
          [table.AttributName[8]]:table.DatenType[8],[table.AttributName[9]]:table.DatenType[9],[table.AttributName[10]]:table.DatenType[10]}});
  }
  deleteTable(table){
    return this.http.post<any>(this.baseUrl, {operation:"drop", table:table});
  }

  getTables(): Observable<any>{
    console.log();
      return this.http.get(this.baseUrl)
      .catch(this.errorHandler)
    }
  
    errorHandler(error :HttpErrorResponse){
      return Observable.throw(error.message || "Server Error");
    }
  
}
