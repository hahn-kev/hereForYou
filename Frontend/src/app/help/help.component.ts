import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {
  public name: string;
  public message: string;
  public phoneNumber: string;
  public messageType: string;

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private location: Location) {
  }

  ngOnInit() {
  }

  async submit() {
    let body = null;
    let params = new HttpParams().set('from', this.name).set('body', this.message).set('phoneNumber', this.phoneNumber).set('type', this.messageType);
    await this.http.post('/api/email/help', body, {params: params, responseType: 'text'}).toPromise();
    this.snackBar.open('Request recieved', null, {duration: 2000});
    this.location.back();
  }

}
