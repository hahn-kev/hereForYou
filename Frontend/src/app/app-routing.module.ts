import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RideShareComponent } from './rideShare/ride-share.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { AdminComponent } from './user/admin/admin.component';
import { UserResolveService } from './user/user-resolve.service';
const routes: Routes = [
  {
    path: '',
    canActivate: [LoginService],
    children: [
      {
        path: 'ride-share',
        component: RideShareComponent
      },
      {
        path: 'user/admin',
        component: AdminComponent
      },
      {
        path: 'user/edit/:name',
        component: UserComponent,
        resolve: {
          user: UserResolveService
        }
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [UserResolveService]
})
export class AppRoutingModule { }
