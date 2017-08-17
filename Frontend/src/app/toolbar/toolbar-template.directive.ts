import { Directive, ViewContainerRef } from '@angular/core';
import { ToolbarService } from './toolbar.service';
import { Subscription } from 'rxjs/Subscription';

@Directive({
  selector: '[appToolbarTemplate]'
})
export class ToolbarTemplateDirective {
  subscription: Subscription;
  hasView = false;

  constructor(private viewContainer: ViewContainerRef,
              private toolbarService: ToolbarService) {
    this.toolbarService.ObserveTemplateRef().subscribe(templateRef => {
      if (this.hasView) {
        this.viewContainer.clear();
        this.hasView = false;
      }
      if (!templateRef) return;
      this.viewContainer.createEmbeddedView(templateRef);
      this.hasView = true;
    });
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }


}
