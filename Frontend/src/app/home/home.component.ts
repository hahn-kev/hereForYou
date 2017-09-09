import { Component, OnDestroy, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public discourseBaseUrl: string;
  private baseUrlSubscription: Subscription;

  constructor(private settingsService: SettingsService) {
  }

  ngOnInit() {
    this.baseUrlSubscription = this.settingsService.getAsync<string>('discourseBaseUrl').subscribe(url => this.discourseBaseUrl = url);
  }

  ngOnDestroy(): void {
    this.baseUrlSubscription.unsubscribe();
  }

}
