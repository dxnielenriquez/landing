import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from "../share/components/login/login.component";
import {SidebarComponent} from "../share/components/sidebar/sidebar.component";
import {UsersComponent} from "./users/users-list/users.component";
import {authGuard} from "../share/guards/auth.guard";
import {UsersEditComponent} from "./users/users-edit/users-edit.component";
import {ServicesComponent} from "./services/services.component";

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
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'services',
        component: ServicesComponent,
      }

    ]
  },
  {
    path: 'management',
    component: SidebarComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'users/add',
        component: UsersEditComponent,
      },
      {
        path: 'users/edit/:id',
        component: UsersEditComponent,
      },
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
