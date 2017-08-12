import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RideShareComponent } from "./rideShare/ride-share.component";
import { UserComponent } from "./user/user.component";
import { LoginComponent } from "./login/login.component";
import { LoginService } from "./login/login.service";
import { AdminComponent } from "./user/admin/admin.component";
import { UserResolveService } from "./user/user-resolve.service";
import { HomeComponent } from "./home/home.component";
import { LearnComponent } from "./learn/learn.component";

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
      },
      {
        path: 'learn',
        component: LearnComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [UserResolveService]
})
export class AppRoutingModule {
}
