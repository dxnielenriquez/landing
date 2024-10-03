import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { of } from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  return of(false);
};
