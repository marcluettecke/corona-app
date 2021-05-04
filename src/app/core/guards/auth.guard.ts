import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	CanLoad,
	Router,
	RouterStateSnapshot
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
	constructor(private authService: AuthService, private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		if (this.authService.isAuth()) {
			return true;
		} else {
			this.router.navigate(['/log-in']);
		}
		return false;
	}

	canLoad(route: Route): boolean {
		console.log('test');

		if (this.authService.isAuth()) {
			return true;
		} else {
			this.router.navigate(['/log-in']);
		}
		return false;
	}
}
