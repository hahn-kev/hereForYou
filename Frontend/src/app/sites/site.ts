import { SiteVisit } from './site-visit';

export class Site {

  constructor(public name: string, public lastVisit: Date) {
  }
}

export class SiteExtended extends Site {
  public visits: SiteVisit[];
}
