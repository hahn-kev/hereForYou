export class SiteVisit {

  constructor() {
    this.visitDate = new Date();
  }

  public id: number;
  public siteId: number;
  public visitDate: Date;
  public workerName: string;
  public bibleGiven: boolean;

  public teamMembers: string;
  public notes: string;
  public giftsGiven: boolean;
  public loginGiven: boolean;
  public prayer: boolean;

  public englishAbility: string;
  public age: string;
  public followUpRequired: string;

  //trafficking signs
  public dressedInappropriately: boolean;
  public inadequateLighting: boolean;
  public canNotLeave: boolean;
  public sleepingOnSite: boolean;
  public beingMovedAround: boolean;
  public doesntHaveDocuments: boolean;
  public depressed: boolean;
  public lowJobSatisfaction: boolean;
}
