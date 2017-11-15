import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from './authenticate.service';
import { LanguageService } from '../services/language.service';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { User } from '../user/user';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  newPassword: string;
  errorMessage: string;
  passwordReset = false;

  constructor(private authenticateService: AuthenticateService,
              public languageService: LanguageService,
              private loginService: LoginService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  async login() {
    this.errorMessage = '';
    let user: User;
    try {
      user = await this.authenticateService.login(this.username, this.password, this.passwordReset ? this.newPassword : null);
    } catch (errorResponse) {
      this.errorMessage = errorResponse.error.message;
      return;
    }
    if (user.resetPassword) {
      this.passwordReset = true;
      this.snackBar.open('Password reset required', 'Dissmiss', {duration: 2000});
      return;
    } else {
      this.router.navigate([this.loginService.redirectTo]);
    }
  }
}
