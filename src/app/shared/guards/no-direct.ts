import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { UtilsService } from '../services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class NoDirectAccessGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, private utils: UtilsService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return directAccesGuard(route, this.utils, this.router);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return directAccesGuard(route, this.utils, this.router);
  }
}

export const directAccesGuard = (route: ActivatedRouteSnapshot, utils: UtilsService, router: Router) => {
  if (!utils.isFirstPage$.getValue()) return true;

  const redirect = route.data.redirect as string;
  router.navigate([redirect || '/login']);
  return false;
}
