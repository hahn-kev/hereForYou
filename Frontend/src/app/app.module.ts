import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { LocalStorageModule } from "angular-2-local-storage";

import { AppComponent } from "./app.component";
import { RideShareComponent } from "./rideShare/ride-share.component";
import { RequestDialogComponent } from "./rideShare/request-dialog/request-dialog.component";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "@angular/material";
import "hammerjs";
import { RideShareService } from "./rideShare/ride-share.service";
import { AgmCoreModule } from "@agm/core";
import { PendingRidesPipe } from "./rideShare/pending-rides.pipe";
import { MapsAutocompleteDirective } from "./maps-autocomplete.directive";
import { UserComponent } from "./user/user.component";
import { AppRoutingModule } from "./app-routing.module";
import { UserService } from "./user/user.service";
import { LoginComponent } from "./login/login.component";
import { LoginService } from "./login/login.service";
import { AdminComponent } from "./user/admin/admin.component";
import { HomeComponent } from "./home/home.component";
import { AuthenciateInterceptorService } from "./login/authenciate-interceptor.service";
import { AuthenticateService } from "./login/authenticate.service";

@NgModule({
  declarations: [
    AppComponent,
    RideShareComponent,
    RequestDialogComponent,
    PendingRidesPipe,
    MapsAutocompleteDirective,
    UserComponent,
    LoginComponent,
    AdminComponent,
    HomeComponent
  ],
  entryComponents: [
    RequestDialogComponent
  ],
  imports: [
    LocalStorageModule.withConfig({
      prefix: 'app',
      storageType: "localStorage"
    }),
    BrowserModule,
    HttpClientModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDWCN-g9qVWAdVsMmgiefEB9fcFdb4JKeA',
      libraries: ['places']
    })
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
