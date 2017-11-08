import { Component, OnInit } from '@angular/core';
import { Site } from '../site';
import { ActivatedRoute } from '@angular/router';
import { SiteVisit } from '../site-visit';

@Component({
  selector: 'app-sites-edit',
  templateUrl: './sites-edit.component.html',
  styleUrls: ['./sites-edit.component.scss']
})
export class SitesEditComponent implements OnInit {
  public site: Site;
  public siteVisits: SiteVisit[];
  public newVisit = new SiteVisit();

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { site: Site, siteVisits: SiteVisit[] }) => {
      this.site = data.site;
      this.siteVisits = data.siteVisits;
    });
  }

}
