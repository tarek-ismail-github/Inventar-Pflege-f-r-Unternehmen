import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PraktikumsteilnehmerService {

  constructor(private _http: HttpClient) { }
  getTeilnehmer(): Observable<any> {
    return this._http.get<any>(environment.baseUrl + '?table=Praktikumsteilnehmer');

  }
}
