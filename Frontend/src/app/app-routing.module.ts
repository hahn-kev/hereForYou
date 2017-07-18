import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RideShareComponent } from './rideShare/ride-share.component';
import { UserComponent } from './user/user.component';
const routes: Routes = [
  {
    path: 'ride-share',
    component: RideShareComponent
  },
  {
    path: 'user/:id',
    component: UserComponent
  }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
