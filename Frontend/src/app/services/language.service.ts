import { Inject, Injectable, LOCALE_ID } from '@angular/core';

@Injectable()
export class LanguageService {

  constructor(@Inject(LOCALE_ID) localeId: string) {
    for (let language of this.languages) {
      if (localeId.indexOf(language.code) == 0) {
        this.currentLanguage = language;
        break;
      }
    }
    if (this.currentLanguage == null) this.currentLanguage = this.languages[0];//english
  }

  public readonly languages = [
    new Language('English', 'en'),
    new Language('Español', 'es')
  ];

  public currentLanguage: Language;
}

export class Language {
  constructor(public name: string,
              public code: string) {
  }

}
