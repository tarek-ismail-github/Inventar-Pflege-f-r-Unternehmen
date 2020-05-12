import { Deployment } from '../models/deployment.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import{environment} from '../../environments/environment'

import { Subject, throwError, Observable, observable, from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DeploymentService {

  // postsArray: Deployment[] = [];
  baseUrl = environment.baseUrl;
  private _url: string = this.baseUrl +"?table=Deployment";
  error = new Subject<string>();
  
  constructor(private http: HttpClient) { }

  getAllDeployment(): Observable<any>{
    return this.http.get(this._url)
    .catch(this.errorHandler)
  }

  errorHandler(error :HttpErrorResponse){
    return Observable.throw(error.message || "Server Error");
  }

  addDeployment(deploy: any) {
    return this.http.put<any>(this.baseUrl, {operation:"insert", table:"Deployment", values:deploy});
  }
  editDeployment(deployment :Deployment){
    return this.http.post<any>(this.baseUrl,{operation:"update", table:"Deployment",values:deployment,conditions:["DeployID="+deployment.DeployID]});

  }

  // createAndStoryPost(deploymentID: number, installierteVersion: string,
  //   datum: Date, durchfuehrenderMitarbeiter: string, projectID: number, serverID: number) {
  //   const postData: Deployment = {DeployID: deploymentID, InstallierteVersion: installierteVersion,
  //     Datum: datum, DurchfuehrenderMitarbeiter: durchfuehrenderMitarbeiter, ProjektID: projectID, ServerID: serverID};
  //   this.http.post<{name: string}>('http://pcai042.informatik.uni-leipzig.de:1800/',
  //   {operation:"insert", table: "Deployment", values: postData}
  //   )
  //   .subscribe(responseData => {
  //     this.postsArray.push(postData);
  //     console.log(responseData);
  //   }, error => {
  //     this.error.next(error.message);
  //   });
  // }




  // fetchsPosts() {
  //   return this.http
  //   .get<{[key: string]: Deployment}>('http://pcai042.informatik.uni-leipzig.de:1800/?table=Projekt')
  //   .pipe(
  //     map(responseData => {
  //       for (const key in responseData) {
  //         if (responseData.hasOwnProperty(key)) {
  //         this.postsArray.push({ ...responseData[key]});
  //         }
  //       }
  //       return this.postsArray;
  //     }),
  //     catchError(errorRes => {
  //       //send to analytics server
  //       return throwError(errorRes);
  //     })
  //   );
  // }

  // deletePosts() {

  //   return this.http.delete('_url');

  // }
  // {Datum:deployment.Datum,
  //   DeployID:deployment.DeployID,
  //   DurchfuehrenderMitarbeiter:deployment.DurchfuehrenderMitarbeiter,
  //   InstallierteVersion:deployment.InstallierteVersion,
  //   ProjektID:deployment.ProjektID,
  //   ServerID:deployment.ServerID
}
