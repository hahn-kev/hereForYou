import { Component, OnInit } from '@angular/core';
import { EditablePage } from './editable-page';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MarkdownService } from 'angular2-markdown';
import { CmsService } from '../services/cms.service';

@Component({
  selector: 'app-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.scss']
})
export class CmsComponent implements OnInit {
  public page: EditablePage;
  public editing = false;
  private preEditedContent: string;

  constructor(private route: ActivatedRoute,
              private cmsService: CmsService,
              private markdown: MarkdownService,) {
  }

  async ngOnInit() {
    this.route.params.pipe(switchMap((data: { pageName: string }) => {
      return this.cmsService.getPage(data.pageName);
    })).subscribe(page => this.page = page);

    this.markdown.renderer.image = (href: string, title: string, text: string) => {
      let regex = /(.*):\s*([\d%]+)\s*x\s*([\d%]+)/;
      let result = regex.exec(title);
      let style = '';
      if (result) {
        title = result[1];
        style = `width:${result[2]}; height:${result[3]}`;
      }
      return `<img style="${style}" src="${href}" alt="${text}" title="${title || ''}" />`
    };
    this.markdown.renderer.link = (href: string, title: string, text: string) => {
      if (this.markdown.renderer.options.sanitize) {
        try {
          var prot = decodeURIComponent(this.markdown.renderer.unescape(href))
            .replace(/[^\w:]/g, '')
            .toLowerCase();
        } catch (e) {
          return '';
        }
        if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0 || prot.indexOf('data:') === 0) {
          return '';
        }
      }
      var out = '<a class="md-link" href="' + href + '"';
      if (title) {
        out += ' title="' + title + '"';
      }
      out += '>' + text + '</a>';
      return out;
    };
  }


  async saveChanges() {
    this.page = await this.cmsService.savePage(this.page.name, this.page.content);
    this.editing = false;
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
