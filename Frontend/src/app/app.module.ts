import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ErrorHandler, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LocalStorageModule } from 'angular-2-local-storage';

import { AppComponent } from './app.component';
import { RideShareComponent } from './rideShare/ride-share.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { RideShareService } from './rideShare/ride-share.service';
import { AgmCoreModule } from '@agm/core';
import { PendingRidesPipe } from './rideShare/pending-rides.pipe';
import { MapsAutocompleteDirective } from './maps-autocomplete.directive';
import { UserComponent } from './user/user.component';
import { AppRoutingModule } from './app-routing.module';
import { UserService } from './user/user.service';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { AdminComponent } from './user/admin/admin.component';
import { HomeComponent } from './home/home.component';
import { AuthenciateInterceptorService } from './login/authenciate-interceptor.service';
import { AuthenticateService } from './login/authenticate.service';
import { LearnComponent } from './learn/learn.component';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatOptionModule,
  MatProgressBarModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { FlipCardComponent } from './home/flip-card/flip-card.component';
import { ActivityIndicatorService } from './activity-indicator.service';
import { ActivityIndicatorInterceptorService } from './activity-indicator-interceptor.service';
import { RoleGuardService } from './login/role-guard.service';
import { RequireRoleDirective } from './login/require-role.directive';
import { MarkdownModule } from 'ngx-md';
import { RidesListComponent } from './rideShare/rides-list/rides-list.component';
import { CdkTableModule } from '@angular/cdk/table';
import { RidesResolveService } from './rideShare/rides-list/rides-resolve.service';
import { ToolbarTemplateDirective } from './toolbar/toolbar-template.directive';
import { ToolbarContentDirective } from './toolbar/toolbar-content.directive';
import { ToolbarService } from './toolbar/toolbar.service';
import { YourRightsComponent } from './home/static/your-rights.component';
import { LifeLessonsComponent } from './home/static/life-lessons.component';
import { HelpComponent } from './help/help.component';
import { MyErrorHandlerService } from './my-error-handler.service';
import { CmsComponent } from './cms/cms.component';
import { SettingsService } from './services/settings.service';
import { DiscourseLinkDirective } from './directives/discourse-link.directive';
import { LanguageService } from './services/language.service';
import { CmsService } from './services/cms.service';
import { ClipboardModule } from 'ngx-clipboard/dist';
import { ConfirmDialogComponent } from './dialog/confirm-dialog/confirm-dialog.component';
import { ImageManagerComponent } from './cms/image-manager/image-manager.component';
import { ClassRequestComponent } from './learn/classRequest/class-request.component';
import { MessageComponent } from './message/message.component';
import { CookieModule } from 'ngx-cookie';
import { SitesDashboardComponent } from './sites/sites-dashboard/sites-dashboard.component';
import { SitesService } from 'app/sites/sites.service';
import { SitesEditComponent } from './sites/sites-edit/sites-edit.component';
import { SignupComponent } from './signup/signup.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

@NgModule({
  declarations: [
    AppComponent,
    RideShareComponent,
    PendingRidesPipe,
    MapsAutocompleteDirective,
    UserComponent,
    LoginComponent,
    AdminComponent,
    HomeComponent,
    LearnComponent,
    FlipCardComponent,
    RequireRoleDirective,
    RidesListComponent,
    ToolbarTemplateDirective,
    ToolbarContentDirective,
    YourRightsComponent,
    LifeLessonsComponent,
    HelpComponent,
    CmsComponent,
    DiscourseLinkDirective,
    ConfirmDialogComponent,
    ImageManagerComponent,
    ClassRequestComponent,
    MessageComponent,
    SitesDashboardComponent,
    SitesEditComponent,
    SignupComponent
  ],
  entryComponents: [
    ConfirmDialogComponent
  ],
  imports: [
    LocalStorageModule.withConfig({
      prefix: 'app',
      storageType: 'localStorage'
    }),
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule,
    MatCardModule,
    MatListModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatIconModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatTableModule,
    CdkTableModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatMenuModule,
    MatExpansionModule,
    FormsModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDWCN-g9qVWAdVsMmgiefEB9fcFdb4JKeA',
      libraries: ['places']
    }),
    MarkdownModule.forRoot(),
    ClipboardModule,
    CookieModule.forRoot(),
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule,
  ],
  providers: [
    RideShareService,
    UserService,
    LoginService,
    AuthenticateService,
    AuthenciateInterceptorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenciateInterceptorService,
      multi: true
    },
    ActivityIndicatorService,
    ActivityIndicatorInterceptorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ActivityIndicatorInterceptorService,
      multi: true
    },
    RoleGuardService,
    RidesResolveService,
    ToolbarService,
    {
      provide: ErrorHandler,
      useClass: MyErrorHandlerService
    },
    SettingsService,
    LanguageService,
    CmsService,
    SitesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
