import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from './authenticate.service';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  errorMessage: string;

  constructor(private authenticateService: AuthenticateService, public languageService: LanguageService) {
  }

  ngOnInit() {
  }

  async login() {
    this.errorMessage = '';
    try {
      await this.authenticateService.login(this.username, this.password);
    } catch (errorResponse) {
      this.errorMessage = errorResponse.error.status;
    }
  }
}
