import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticateService } from '../login/authenticate.service';
import { LanguageService } from '../services/language.service';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { RecaptchaComponent } from 'ng-recaptcha';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  @ViewChild(RecaptchaComponent) reCaptcha: RecaptchaComponent;
  username: string;
  password: string;
  email: string;
  phone: string;
  errorMessage: string;
  captcha: string;

  constructor(private authenticateService: AuthenticateService,
              public languageService: LanguageService,
              private loginService: LoginService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  async signup() {
    this.errorMessage = '';
    try {
      await this.authenticateService.signup(this.username, this.password, this.email, this.phone, this.captcha);
    } catch (errorResponse) {
      this.errorMessage = errorResponse.error.message;
      this.reCaptcha.reset();
      return;
    }
    this.snackBar.open(`Your account has been created, ask a manger to approve user: ${this.username}`, 'Dismiss');
    this.router.navigate(['/login']);
  }
}
