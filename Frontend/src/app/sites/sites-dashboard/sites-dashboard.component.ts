import { Component, OnInit } from '@angular/core';
import { SiteAgg } from '../site';
import { SitesService } from '../sites.service';

@Component({
  selector: 'app-sites-dashboard',
  templateUrl: './sites-dashboard.component.html',
  styleUrls: ['./sites-dashboard.component.scss']
})
export class SitesDashboardComponent implements OnInit {
  sites: SiteAgg[];
  filteredSites: SiteAgg[];

  constructor(private sitesService: SitesService) {
  }

  async ngOnInit() {
    this.sites = await this.sitesService.getSites().toPromise();
    this.filteredSites = this.sites;
  }

  filterSites(search: string) {
    search = search.trim().toUpperCase();
    this.filteredSites = this.sites.filter(site => !search
      || (site.name && site.name.toUpperCase().includes(search))
      || (site.address && site.address.toUpperCase().includes(search))
      || (site.teamMembers && site.teamMembers.toUpperCase().includes(search))
      || (site.workerNames && site.workerNames.toUpperCase().includes(search))
    );
  }

}
