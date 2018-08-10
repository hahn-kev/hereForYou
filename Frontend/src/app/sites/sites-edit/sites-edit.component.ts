import { Component, OnInit } from '@angular/core';
import { SiteExtended } from '../site';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteVisit } from '../site-visit';
import { SitesService } from '../sites.service';
import { MatDialog, MatExpansionPanel } from '@angular/material';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog/confirm-dialog.component';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sites-edit',
  templateUrl: './sites-edit.component.html',
  styleUrls: ['./sites-edit.component.scss'],
  providers: [DatePipe]
})
export class SitesEditComponent implements OnInit {
  public site: SiteExtended;
  public newVisit: SiteVisit;

  constructor(private route: ActivatedRoute,
              private siteService: SitesService,
              private router: Router,
              private dialog: MatDialog,
              private datePipe: DatePipe) {
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

  async saveVisit(siteVisit: SiteVisit, isNew = false, panel: MatExpansionPanel, form: NgForm) {
    siteVisit = await this.siteService.saveVisit(siteVisit).toPromise();
    if (isNew) {
      this.site.visits = [siteVisit, ...this.site.visits];
      this.setupNewVisit();
      form.resetForm();
    }
    this.updateLastVisit();
    panel.close();
  }

  updateLastVisit() {
    if (this.site.visits.length == 0) {
      this.site.lastVisit = null;
      return;
    }
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
      {data: ConfirmDialogComponent.Options(`Delete ${this.site.name} Site?`, 'Delete', 'Cancel')});
    let result = await dialogRef.afterClosed().toPromise();
    if (!result) return;
    await this.siteService.deleteSite(this.site.id).toPromise();
    this.router.navigate(['../..'], {relativeTo: this.route});
  }

  async deleteVisit(siteVisit: SiteVisit) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent,
      {
        data: ConfirmDialogComponent.Options(`Delete ${this.datePipe.transform(siteVisit.visitDate,
          'mediumDate')} Visit?`, 'Delete', 'Cancel')
      });
    let result = await dialogRef.afterClosed().toPromise();
    if (result) {
      await this.siteService.deleteVisit(siteVisit.id).toPromise();
      this.site.visits = this.site.visits.filter(value => value.id !== siteVisit.id);
      this.updateLastVisit();
    }
  }

  mapsUrl(address: string) {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address.trim())}`
  }
}
