import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
	selector: 'app-sign-up-form',
	templateUrl: './sign-up-form.component.html',
	styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent implements OnInit {
	signUpForm: FormGroup;
	maxDate: Date;

	constructor(private authService: AuthService) {}

	ngOnInit() {
		this.maxDate = new Date();
		this.maxDate.setFullYear(this.maxDate.getFullYear() - 12);

		this.signUpForm = new FormGroup({
			email: new FormControl('', { validators: [Validators.required, Validators.email] }),
			password: new FormControl('', {
				validators: [Validators.required, Validators.minLength(6)]
			}),
			birthdate: new FormControl('', { validators: [Validators.required] }),
			agree: new FormControl('', { validators: [Validators.requiredTrue] })
		});
	}

	getEmail() {
		return this.signUpForm.get('email');
	}
	getPassword() {
		return this.signUpForm.get('password');
	}
	getBirthday() {
		return this.signUpForm.get('birthday');
	}
	getAgree() {
		return this.signUpForm.get('agree');
	}

	onSubmit() {
		const userData = this.signUpForm.value;
		console.log(userData);

		this.authService
			.registerUser({
				email: userData.email,
				password: userData.password,
				birthdate: userData.birthdate,
				cities: []
			})
			.then(res => {
				console.log('login successful');
			});
	}
}
