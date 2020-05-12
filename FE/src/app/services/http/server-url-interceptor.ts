import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class ServerUrlInterceptor implements HttpInterceptor {
  constructor(private inj: Injector) { }
  private updateUrl(req: string) {
    const url = (environment.baseUrl);
    return url;
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      url: this.updateUrl(request.url)
    });

    return next.handle(request);
  }
}