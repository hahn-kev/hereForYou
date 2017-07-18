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

@NgModule({
  declarations: [
    AppComponent,
    RideShareComponent,
    RequestDialogComponent,
    PendingRidesPipe,
    MapsAutocompleteDirective
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
    RouterModule.forRoot([
      {
        path: 'ride-share',
        component: RideShareComponent
      }
    ]),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDWCN-g9qVWAdVsMmgiefEB9fcFdb4JKeA',
      libraries: ['places']
    })
  ],
  providers: [RideShareService],
  bootstrap: [AppComponent]
})
export class AppModule { }
