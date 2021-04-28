import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-log-in-form',
	templateUrl: './log-in-form.component.html',
	styleUrls: ['./log-in-form.component.scss']
})
export class LogInFormComponent implements OnInit {
	loginForm: FormGroup;
	constructor() {}

	ngOnInit(): void {
		this.loginForm = new FormGroup({
			email: new FormControl('', { validators: [Validators.required, Validators.email] }),
			password: new FormControl('', { validators: [Validators.required] })
		});
	}

	onSubmit() {}
}
