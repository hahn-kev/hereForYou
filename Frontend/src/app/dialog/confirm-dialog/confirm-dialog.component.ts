import { Component, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

  constructor(@Inject(MD_DIALOG_DATA) public data: any, public dialogRef: MdDialogRef<ConfirmDialogComponent>) {
  }

  static Options(title: string, acceptText: string, rejectText: string) {
    return {title: title, acceptText: acceptText, rejectText: rejectText};
  }

  reject() {
    this.dialogRef.close();
  }
}
