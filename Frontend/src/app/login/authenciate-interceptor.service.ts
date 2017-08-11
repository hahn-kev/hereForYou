import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { LoginService } from "./login.service";
import "rxjs/add/operator/do";

@Injectable()
export class AuthenciateInterceptorService implements HttpInterceptor {

  constructor(private loginService: LoginService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.loginService.accessToken)
      req = req.clone({setHeaders: {Authorization: 'Bearer ' + this.loginService.accessToken}});
    return next.handle(req).do(event => {
    }, err => {
      if (err instanceof HttpErrorResponse && err.status == 401) {
        this.loginService.promptLogin();
      }
    });
  }
}
