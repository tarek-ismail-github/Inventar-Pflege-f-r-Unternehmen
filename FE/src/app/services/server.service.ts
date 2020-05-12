import { Server } from './../models/server.model';
import { Injectable } from '@angular/core';
import { Subject, throwError, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import{environment} from '../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class ServerService {
  postsArray: Server[] = [];
  baseUrl = environment.baseUrl;
  private _url :string = this.baseUrl+"?table=Server";

  error = new Subject<string>();
  constructor(private http: HttpClient) { }
  getAllServer(): Observable<any>{
    return this.http.get(this._url)
    .catch(this.errorHandler)
  }
  errorHandler(error :HttpErrorResponse){
    return Observable.throw(error.message || "Server Error");
  }
  addServer(server: any) {
    return this.http.put<any>(this.baseUrl, {operation:"insert", table:"Server", values:server});
  }
  deleteServer(server:any) {
    return this.http.post<any>(this.baseUrl,{operation:"delete", table:"Server",conditions:["ServerID="+server.ServerID]});
  }
  editServer(server:Server){
    return this.http.post<any>(this.baseUrl,{operation:"update", table:"Server",values:server,conditions:["ServerID="+server.ServerID]});

  }

  // createAndStoryPost(server :Server) {
  //   postData= {Server, , Ort:Ort, OS:OS};
  //   this.http.post<{name: string}>(
  //     this.baseUrl,
  //   {operation:"insert", table:"Server", values:postData}
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
  //   .get<{[key: string]: Server}>(this._url)
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

  deletePosts() {
    return this.http.delete(this._url);
  }

}
