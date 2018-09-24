import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { LoginService } from './login.service';
import { Subscription } from 'rxjs/Subscription';

@Directive({
  selector: '[requireRole]'
})
export class RequireRoleDirective implements OnDestroy {
  private hasView = false;
  private hasRoleSubscription: Subscription;

  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef,
              private loginService: LoginService) {
  }

  @Input() set requireRole(role: string | string[]) {
    if (this.hasRoleSubscription) this.hasRoleSubscription.unsubscribe();
    if (typeof role === 'string') role = [role];
    this.hasRoleSubscription = this.loginService.hasAnyRole(role).subscribe(hasRole => this.updateView(hasRole));
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
