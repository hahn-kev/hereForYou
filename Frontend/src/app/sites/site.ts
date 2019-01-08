import { SiteVisit } from './site-visit';

export class Site {

  public name?: string;
  public lastVisit?: Date;
  public id?: number;
  public address?: string;

  constructor() {
  }
}

export class SiteExtended extends Site {
  public visits: SiteVisit[] = [];
}

export class SiteAgg extends Site {
  public workerNames: string;
  public teamMembers: string;
}
