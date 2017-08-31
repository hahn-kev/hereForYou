import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { LoginService } from './login.service';
import { Subscription } from 'rxjs/Subscription';

@Directive({
  selector: '[requireRole]'
})
export class RequireRoleDirective {
  private hasView = false;
  private hasRoleSubscription: Subscription;

  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef,
              private loginService: LoginService) {
  }

  @Input() set requireRole(role: string) {
    if (this.hasRoleSubscription) this.hasRoleSubscription.unsubscribe();
    this.hasRoleSubscription = this.loginService.hasRole(role).subscribe(hasRole => this.updateView(hasRole));
  }

  updateView(hasRole: boolean) {
    if (hasRole && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!hasRole && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

  ngOnDestroy() {
    this.hasRoleSubscription.unsubscribe();
  }
}
