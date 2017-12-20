import { Component, OnInit } from '@angular/core';
import { SiteExtended } from '../site';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteVisit } from '../site-visit';
import { SitesService } from '../sites.service';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-sites-edit',
  templateUrl: './sites-edit.component.html',
  styleUrls: ['./sites-edit.component.scss']
})
export class SitesEditComponent implements OnInit {
  public site: SiteExtended;
  public newVisit = new SiteVisit();

  constructor(private route: ActivatedRoute,
              private siteService: SitesService,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { site: SiteExtended }) => {
      this.site = data.site;
      this.setupNewVisit();
    });
  }

  setupNewVisit() {
    this.newVisit = new SiteVisit();
    this.newVisit.siteId = this.site.id;
  }

  async saveSite() {
    let site = await this.siteService.saveSite(this.site).toPromise();
    this.router.navigate(['..', site.id], {relativeTo: this.route});
  }

  async saveVisit(siteVisit: SiteVisit, isNew = false) {
    await this.siteService.saveVisit(siteVisit).toPromise();
    if (isNew) {
      this.site.visits = [this.newVisit, ...this.site.visits];
      this.setupNewVisit();
    }
    this.updateLastVisit();
  }

  updateLastVisit() {
    this.site.lastVisit = this.site.visits.reduce((previousValue, currentValue) => this.maxDate(previousValue,
      currentValue.visitDate), new Date(0));
  }

  maxDate(a: Date | string, b: Date | string): Date {
    a = typeof a === 'string' ? new Date(a) : a;
    b = typeof b === 'string' ? new Date(b) : b;
    return a.getTime() > b.getTime() ? a : b;
  }

  async deleteSite() {
    let dialogRef = this.dialog.open(ConfirmDialogComponent,
      {data: ConfirmDialogComponent.Options(`Delete Site?`, 'Delete', 'Cancel')});
    let result = await dialogRef.afterClosed().toPromise();
    if (!result) return;
    await this.siteService.deleteSite(this.site.id).toPromise();
    this.router.navigate(['../..'], {relativeTo: this.route});
  }

  async deleteVisit(siteVisit: SiteVisit, index: number) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent,
      {data: ConfirmDialogComponent.Options(`Delete Visit?`, 'Delete', 'Cancel')});
    let result = await dialogRef.afterClosed().toPromise();
    if (result) {
      await this.siteService.deleteVisit(siteVisit.id).toPromise();
      this.site.visits = this.site.visits.splice(index, 1);
      this.updateLastVisit();
    }
  }
}
