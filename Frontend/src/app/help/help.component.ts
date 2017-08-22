import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MdSnackBar } from '@angular/material';
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

  constructor(private http: HttpClient, private snackBar: MdSnackBar, private location: Location) {
  }

  ngOnInit() {
  }

  async submit() {
    let body = null;
    await this.http.post('api/email/help', body, {params: new HttpParams().set('from', this.name).set('body', this.message).set('phoneNumber', this.phoneNumber)}).toPromise();
    this.snackBar.open('Request recieved', null, {duration: 2000});
    this.location.back();
  }

}
