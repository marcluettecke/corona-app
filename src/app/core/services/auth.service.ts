import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../interfaces/user.model';
import { AuthData } from '../interfaces/authData';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	authChange = new Subject<boolean>();
	private isAuthenticated: boolean;

	constructor(
		private db: AngularFirestore,
		private router: Router,
		private afAuth: AngularFireAuth
	) {}

	initAuthListener() {
		this.afAuth.authState.subscribe(user => {
			if (user) {
				this.isAuthenticated = true;
				this.authChange.next(true);
				this.router.navigate(['/summary']);
			} else {
				this.authChange.next(false);
				this.router.navigate(['/log-in']);
				this.isAuthenticated = false;
			}
		});
	}

	registerUser(user: User) {
		return this.db.collection('users').add(user);
	}

	logIn(authData: AuthData) {
		// this.afAuth.signInWithEmailAndPassword(authData.email, authData.password).then(res => {
		// 	// this.authChange.next(true);
		// 	console.log(res);
		// });
		this.db
			.collection('users', ref => ref.where('email', '==', authData.email))
			.get()
			.subscribe(res => {
				if (res.docs.length === 0) {
					this.authChange.next(false);
				} else {
					this.authChange.next(true);
				}
			});
	}

	logOut() {
		this.authChange.next(false);
	}
}
