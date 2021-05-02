import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
	selector: 'app-log-in-form',
	templateUrl: './log-in-form.component.html',
	styleUrls: ['./log-in-form.component.scss']
})
export class LogInFormComponent implements OnInit {
	loginForm: FormGroup;

	constructor(private authService: AuthService) {}

	ngOnInit(): void {
		this.loginForm = new FormGroup({
			email: new FormControl('', { validators: [Validators.required, Validators.email] }),
			password: new FormControl('', { validators: [Validators.required] })
		});
	}

	onSubmit() {
		this.authService.logIn({
			email: this.loginForm.value.email,
			password: this.loginForm.value.password
		});
	}
}
