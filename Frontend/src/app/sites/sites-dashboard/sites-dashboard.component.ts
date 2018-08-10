import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Site } from '../site';
import { SitesService } from '../sites.service';

@Component({
  selector: 'app-sites-dashboard',
  templateUrl: './sites-dashboard.component.html',
  styleUrls: ['./sites-dashboard.component.scss']
})
export class SitesDashboardComponent implements OnInit {
  sites: Observable<Site[]>;

  constructor(private sitesService: SitesService) {
  }

  ngOnInit() {
    this.sites = this.sitesService.getSites();
  }


}
