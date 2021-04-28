import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule, FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { SummaryModule } from './pages/summary/summary.module';
import { DataDisplayModule } from './pages/data-display/data-display.module';
import { LogInModule } from './pages/log-in/log-in.module';
import { SignUpModule } from './pages/sign-up/sign-up.module';

@NgModule({
	declarations: [AppComponent],
	imports: [
		CommonModule,
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MaterialModule,
		FlexLayoutModule,
		HttpClientModule,
		SummaryModule,
		DataDisplayModule,
		LogInModule,
		SignUpModule,
		CoreModule
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
