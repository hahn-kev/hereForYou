import { Directive, TemplateRef } from '@angular/core';
import { ToolbarService } from './toolbar.service';
@Directive({
  selector: '[appToolbarContent]'
})
export class ToolbarContentDirective {
  constructor(private templateRef: TemplateRef<any>, private toolbarService: ToolbarService) {

    this.toolbarService.setTemplate(this.templateRef);
  }

  ngOnDestroy() {
    this.toolbarService.setTemplate(null);
  }
}
