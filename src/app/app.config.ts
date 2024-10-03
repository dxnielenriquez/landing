import {ApplicationConfig, importProvidersFrom} from "@angular/core";
import {provideRouter} from "@angular/router";
import {routes} from "./app-routing.module";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {provideAnimations} from "@angular/platform-browser/animations";
import {DialogService} from "primeng/dynamicdialog";
import {NgxPermissionsModule} from "ngx-permissions";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(
      withInterceptors([ ]),
    ),
    importProvidersFrom(NgxPermissionsModule.forRoot()),
    DialogService
  ]
}
