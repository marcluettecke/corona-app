import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from './core/services/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	isAuth: boolean;
	authSubscription: Subscription;

	isHandset$: Observable<boolean> = this.breakpointObserver
		.observe([Breakpoints.Small, Breakpoints.XSmall])
		.pipe(
			map(result => result.matches),
			shareReplay()
		);

	constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService) {}

	ngOnInit(): void {
		// this.authService.initAuthListener();
		this.authSubscription = this.authService.authChange.subscribe(authStatus => {
			this.isAuth = authStatus;
			console.log(this.isAuth);
		});
		//Called after the constructor, initializing input properties, and the first call to ngOnChanges.
		//Add 'implements OnInit' to the class.
	}

	onLogOut() {
		this.authService.logOut();
	}
}
