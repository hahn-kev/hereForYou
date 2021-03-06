import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { LoginService } from '../login/login.service';
import { EditablePage } from '../cms/editable-page';
import { ImageInfo } from '../cms/image-info';

@Injectable()
export class CmsService {

  constructor(private http: HttpClient,
              @Inject(LOCALE_ID) private localeId: string,
              private loginService: LoginService,) {
  }

  getPage(pageName: string) {
    return this.http.get<EditablePage>(`/api/editablePage/${this.pageNameWithLocale(pageName)}`)
      .map(page => page || new EditablePage(this.pageNameWithLocale(pageName), this.loginService.currentUser().userName));
  }

  pageNameWithLocale(pageName: string) {
    if (pageName.indexOf(this.localeId) == 0) return pageName;
    return `${this.localeId}-${pageName}`;
  }

  savePage(pageName: string, pageContent: string) {
    return this.http.post<EditablePage>('/api/editablePage/' + this.pageNameWithLocale(pageName), pageContent).toPromise();
  }

  uploadImage(category: string, name: string, file: File) {
    return this.http.request(new HttpRequest('POST', `/api/image/${category}/${name}`, file, {reportProgress: true}));
  }

  images() {
    return this.http.get<ImageInfo[]>('/api/image');
  }

  deleteImage(imageInfo: ImageInfo) {
    return this.http.delete(`/api/image/${imageInfo.id}?oid=${imageInfo.imageId}`, {responseType: 'text'}).toPromise();
  }
}
