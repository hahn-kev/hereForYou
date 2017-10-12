import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';

@Component({
  selector: 'app-class-request',
  templateUrl: './class-request.component.html',
  styleUrls: ['./class-request.component.scss']
})
export class ClassRequestComponent implements OnInit {
  public name: string;
  public contact: string;
  public userLocation: string;

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private location: Location) {
  }

  ngOnInit() {
  }

  async submit() {
    let body = null;
    let params = new HttpParams().set('from', this.name).set('contact', this.contact).set('location', this.userLocation);
    await this.http.post('/api/email/classRequest', body, {params: params, responseType: 'text'}).toPromise();
    this.snackBar.open('Request recieved', null, {duration: 2000});
    this.location.back();
  }

}
