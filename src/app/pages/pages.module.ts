import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from "../share/components/login/login.component";
import {SidebarComponent} from "../share/components/sidebar/sidebar.component";
import {ServicesComponent} from "./services/services.component";
import {PortafolioComponent} from "./portafolio/portafolio.component";
import {AboutComponent} from "./about/about.component";
import {TeamComponent} from "./team/team.component";
import {ContactComponent} from "./contact/contact.component";
import {HomeComponent} from "./home/home.component";

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
        path: 'nosotros',
        component: ServicesComponent,
      },
      {
        path: 'soluciones',
        component: PortafolioComponent,
      },
      {
        path: 'beneficios',
        component: AboutComponent,
      },
      {
        path: 'casos-exito',
        component: TeamComponent,
      },
      {
        path: 'contacto',
        component: ContactComponent,
      },
      {
        path: 'inicio',
        component: HomeComponent,
      }

    ]
  },
  {path: '**', redirectTo: 'home/inicio', pathMatch: 'full'}
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
