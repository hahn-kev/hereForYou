import { Component, OnInit } from '@angular/core';
import { SiteExtended } from '../site';
import { ActivatedRoute } from '@angular/router';
import { SiteVisit } from '../site-visit';
import { SitesService } from '../sites.service';

@Component({
  selector: 'app-sites-edit',
  templateUrl: './sites-edit.component.html',
  styleUrls: ['./sites-edit.component.scss']
})
export class SitesEditComponent implements OnInit {
  public site: SiteExtended;
  public newVisit = new SiteVisit();

  constructor(private route: ActivatedRoute, private siteService: SitesService) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { site: SiteExtended }) => {
      this.site = data.site;
    });
  }

  async saveSite() {
    await this.siteService.saveSite(this.site).toPromise();
  }

  async saveVisit(siteVisit: SiteVisit, isNew = false) {
    await this.siteService.saveVisit(siteVisit).toPromise();
    if (isNew) {
      this.site.visits = [this.newVisit, ...this.site.visits];
      this.newVisit = new SiteVisit();
    }
  }
}
