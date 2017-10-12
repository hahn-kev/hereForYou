import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class MyErrorHandlerService implements ErrorHandler {
  handleError(error: any): void {
    const snackBarService = this.injector.get(MatSnackBar);

    let message: string;
    if (error.rejection) {
      if (error.rejection instanceof HttpErrorResponse) {
        message = error.rejection.error.message || error.rejection.error.error.message;
      } else {
        message = error.rejection.message;
      }
    }
    else if (error.message) {
      message = error.message;
    } else {
      message = error.toString();
    }
    snackBarService.open(message, 'Dismiss');
    this.original.handleError(error);
  }

  private original = new ErrorHandler();

  constructor(private injector: Injector) {

  }

}
