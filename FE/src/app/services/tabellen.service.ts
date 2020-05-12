import { Injectable } from '@angular/core';
import{environment} from '../../environments/environment'
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TabellenService {

  //postsArray: Deployment[];
  baseUrl = environment.baseUrl;
  private _url =this.baseUrl;
  
  constructor(private http: HttpClient) { }
  
  getTabellen() {
    this.http.get(this._url).subscribe(responseData =>
        console.log(responseData)
    );}
}
