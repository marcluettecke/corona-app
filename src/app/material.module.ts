import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';

@NgModule({
	imports: [
		MatButtonModule,
		MatIconModule,
		MatToolbarModule,
		MatSlideToggleModule,
		MatFormFieldModule,
		MatCheckboxModule,
		MatCardModule,
		MatExpansionModule,
		MatSidenavModule,
		MatListModule
	],
	exports: [
		MatButtonModule,
		MatIconModule,
		MatToolbarModule,
		MatSlideToggleModule,
		MatFormFieldModule,
		MatCheckboxModule,
		MatCardModule,
		MatExpansionModule,
		MatSidenavModule,
		MatListModule
	]
})
export class MaterialModule {}
