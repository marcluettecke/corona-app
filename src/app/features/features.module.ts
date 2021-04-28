import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WeatherWidgetComponent } from './weather-widget/weather-widget.component';
import { DataTableComponent } from './data-table/data-table.component';
import { LogInFormComponent } from './log-in-form/log-in-form.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { MaterialModule } from '@shared/material.module';
@NgModule({
	declarations: [
		WeatherWidgetComponent,
		DataTableComponent,
		LogInFormComponent,
		SignUpFormComponent
	],
	imports: [CommonModule, FormsModule, ReactiveFormsModule, FontAwesomeModule, MaterialModule],
	exports: [WeatherWidgetComponent, DataTableComponent, LogInFormComponent, SignUpFormComponent]
})
export class FeaturesModule {
	constructor(library: FaIconLibrary) {
		library.addIconPacks(fas, fab, far);
	}
}
