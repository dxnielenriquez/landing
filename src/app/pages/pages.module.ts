import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from "../share/components/login/login.component";
import {SidebarComponent} from "../share/components/sidebar/sidebar.component";
import {authGuard} from "../share/guards/auth.guard";
import {ServicesComponent} from "./services/services.component";
import {PortafolioComponent} from "./portafolio/portafolio.component";
import {AboutComponent} from "./about/about.component";
import {TeamComponent} from "./team/team.component";
import {ContactComponent} from "./contact/contact.component";

const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },

    ]
  },
  {
    path: 'home',
    component: SidebarComponent,
    // canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'services',
        component: ServicesComponent,
      },
      {
        path: 'portafolio',
        component: PortafolioComponent,
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'team',
        component: TeamComponent,
      },
      {
        path: 'contact',
        component: ContactComponent,
      }

    ]
  },
  {
    path: 'management',
    component: SidebarComponent,
    canActivate: [authGuard],
    children: [

    ]
  },
  {path: '**', redirectTo: 'auth/login', pathMatch: 'full'}
];

@NgModule({

  declarations: [


  ],
  imports: [
    RouterModule.forChild(routes),
  ],
  bootstrap: [],
  exports: [
  ]
})
export class PagesModule {
}
