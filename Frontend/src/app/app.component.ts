import { Component, OnInit, ViewChild } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { LoginService } from "./login/login.service";
import { User } from "./user/user";
import { MdSidenav } from "@angular/material";
import { Router } from "@angular/router";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentUser: Observable<User>;
  @ViewChild('sidenav')
  private sidenav: MdSidenav;
  constructor(loginService: LoginService, private router: Router) {
    this.currentUser = loginService.currentUser();
  }
  ngOnInit(): void {
    this.router.events.subscribe(() => this.sidenav.close());
  }
}
