export class EditablePage {
  public content = '';
  public lastUpdated: Date;

  constructor(public name: string,
              public updatedBy: string) {
  }
}
