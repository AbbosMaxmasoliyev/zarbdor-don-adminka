import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer your-token`
      }
    });

    return next.handle(clonedRequest);
  }
}
