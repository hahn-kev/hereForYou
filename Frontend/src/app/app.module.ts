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
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdCheckboxModule,
  MdDatepickerModule,
  MdDialogModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdNativeDateModule,
  MdOptionModule,
  MdProgressBarModule,
  MdSelectModule,
  MdSidenavModule,
  MdSnackBarModule,
  MdTableModule,
  MdToolbarModule,
  MdTooltipModule
} from '@angular/material';
import { FlipCardComponent } from './home/flip-card/flip-card.component';
import { ActivityIndicatorService } from './activity-indicator.service';
import { ActivityIndicatorInterceptorService } from './activity-indicator-interceptor.service';
import { RoleGuardService } from './login/role-guard.service';
import { RequireRoleDirective } from './login/require-role.directive';
import { MarkdownModule } from 'angular2-markdown';
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
    DiscourseLinkDirective
  ],
  entryComponents: [
  ],
  imports: [
    LocalStorageModule.withConfig({
      prefix: 'app',
      storageType: 'localStorage'
    }),
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdInputModule,
    MdOptionModule,
    MdSelectModule,
    MdSidenavModule,
    MdToolbarModule,
    MdTooltipModule,
    MdCardModule,
    MdListModule,
    MdDialogModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdTableModule,
    MdIconModule,
    MdCheckboxModule,
    MdSnackBarModule,
    MdProgressBarModule,
    MdTableModule,
    CdkTableModule,
    MdButtonToggleModule,
    FormsModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDWCN-g9qVWAdVsMmgiefEB9fcFdb4JKeA',
      libraries: ['places']
    }),
    MarkdownModule.forRoot()
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
    SettingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
