import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { MdSnackBar } from '@angular/material';

@Injectable()
export class MyErrorHandlerService implements ErrorHandler {
  handleError(error: any): void {
    const snackBarService = this.injector.get(MdSnackBar);

    let message: string;
    if (error.rejection) message = error.rejection.message;
    else if (error.message) {
      message = error.message;
    } else {
      message = error.toString();
    }
    snackBarService.open(message, 'Dismiss');
    throw error;
  }

  constructor(private injector: Injector) {
  }

}
