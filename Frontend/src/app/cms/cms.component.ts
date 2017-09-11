import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EditablePage } from './editable-page';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.scss']
})
export class CmsComponent implements OnInit {
  public page: EditablePage;
  public editing = false;
  private preEditedContent: string;

  constructor(private http: HttpClient, private route: ActivatedRoute, private loginService: LoginService) {
  }

  async ngOnInit() {
    this.route.params.switchMap((data: { pageName: string }) => {
      return this.http.get<EditablePage>('/api/editablePage/' + data.pageName)
        .map(page => page || new EditablePage(data.pageName, this.loginService.currentUser().userName))
    })
      .subscribe(page => this.page = page);
  }

  saveChanges() {
    this.http.post('/api/editablePage/' + this.page.name, this.page.content).subscribe(() => this.editing = false);
  }

  edit() {
    this.preEditedContent = this.page.content;
    this.editing = true;
  }

  revert() {
    this.page.content = this.preEditedContent;
    this.editing = false;
  }
}
