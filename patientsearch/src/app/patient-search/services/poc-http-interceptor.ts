import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
@Injectable()
export class PocHttpInteceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService, private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const credentials = this.authenticationService.getAuth();
    let modifiedReq = req;
    if (credentials) {
      const authHeader = { Authorization: 'Basic ' + credentials };
      modifiedReq = req.clone({ setHeaders: authHeader });
    } else {
      this.router.navigate(['/login']);
    }
    return next.handle(modifiedReq).pipe(tap(event => {
      if (event instanceof HttpResponse) {
        // do stuff with response here
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        return observableThrowError(err);
      }
    }));
  }
}
