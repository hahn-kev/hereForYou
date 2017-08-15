import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ActivityIndicatorService } from './activity-indicator.service';

@Injectable()
export class ActivityIndicatorInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.activityIndicatorService.showIndicator();
    return next.handle(req).do(event => {
    }, error => {
    }, () => {
      this.activityIndicatorService.hideIndicator();
    });
  }

  constructor(private activityIndicatorService: ActivityIndicatorService) {
  }

}
