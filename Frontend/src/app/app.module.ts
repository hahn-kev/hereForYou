import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { RideShareComponent } from './rideShare/ride-share.component';
import { RequestDialogComponent } from './rideShare/request-dialog/request-dialog.component';

import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import 'hammerjs';
import { RideShareService } from './rideShare/ride-share.service';
import { AgmCoreModule } from '@agm/core';
import { PendingRidesPipe } from './rideShare/pending-rides.pipe';
import { MapsAutocompleteDirective } from './maps-autocomplete.directive';
import { UserComponent } from './user/user.component';
import { AppRoutingModule } from './app-routing.module';
import { UserService } from './user/user.service';

@NgModule({
  declarations: [
    AppComponent,
    RideShareComponent,
    RequestDialogComponent,
    PendingRidesPipe,
    MapsAutocompleteDirective,
    UserComponent
  ],
  entryComponents: [
    RequestDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDWCN-g9qVWAdVsMmgiefEB9fcFdb4JKeA',
      libraries: ['places']
    })
  ],
  providers: [RideShareService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
