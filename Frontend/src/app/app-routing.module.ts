import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RideShareComponent } from './rideShare/ride-share.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { AdminComponent } from './user/admin/admin.component';
import { UserResolveService } from './user/user-resolve.service';
import { HomeComponent } from './home/home.component';
import { LearnComponent } from './learn/learn.component';
import { IsNewResolverService } from './user/is-new-resolver.service';
import { RoleGuardService } from './login/role-guard.service';
import { RidesListComponent } from './rideShare/rides-list/rides-list.component';
import { RidesResolveService } from './rideShare/rides-list/rides-resolve.service';
import { HelpComponent } from './help/help.component';
import { CmsComponent } from './cms/cms.component';
import { ClassRequestComponent } from './learn/classRequest/class-request.component';
import { MessageComponent } from './message/message.component';
import { IsSelfResolverService } from './user/is-self-resolver.service';
import { SitesDashboardComponent } from './sites/sites-dashboard/sites-dashboard.component';
import { SitesEditComponent } from './sites/sites-edit/sites-edit.component';
import { SiteResolveByIdService } from './sites/sites-edit/site-resolve-by-id.service';
import { SignupComponent } from './signup/signup.component';

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
        path: 'ride-share/admin',
        children: [
          {
            path: ':type/:userName',
            component: RidesListComponent,
            resolve: {
              rides: RidesResolveService
            }
          },
          {
            path: ':type',
            component: RidesListComponent,
            resolve: {
              rides: RidesResolveService
            }
          },
          {
            path: '',
            component: RidesListComponent,
            resolve: {
              rides: RidesResolveService
            }
          }
        ],
        canActivate: [RoleGuardService],
        data: {
          requireRole: 'admin'
        }
      },
      {
        path: 'your-rights',
        redirectTo: 'cms/your-rights'
      },
      {
        path: 'life-lessons',
        redirectTo: 'cms/life-lessons'
      },
      {
        path: 'help',
        component: HelpComponent
      },
      {
        path: 'user/admin',
        component: AdminComponent,
        canActivate: [RoleGuardService],
        data: {
          requireRole: ['admin', 'manager']
        }
      },
      {
        path: 'user/edit/:name',
        component: UserComponent,
        resolve: {
          user: UserResolveService,
          isNew: IsNewResolverService,
          isSelf: IsSelfResolverService
        }
      },
      {
        path: 'cms/:pageName',
        component: CmsComponent
      },
      {
        path: 'learn',
        component: LearnComponent
      },
      {
        path: 'class-request',
        component: ClassRequestComponent
      },
      {
        path: 'site',
        children: [
          {
            path: 'edit/:id',
            component: SitesEditComponent,
            resolve: {
              site: SiteResolveByIdService
            }
          },
          {
            path: '',
            component: SitesDashboardComponent
          }
        ]
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
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'message',
    component: MessageComponent
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
  providers: [
    UserResolveService,
    IsNewResolverService,
    SiteResolveByIdService,
    IsSelfResolverService
  ]
})
export class AppRoutingModule {
}
