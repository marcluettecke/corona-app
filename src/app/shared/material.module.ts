import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

const materialModules = [MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule, MatListModule];

@NgModule({
	imports: [CommonModule, ...materialModules],
	exports: [...materialModules]
})
export class MaterialModule {}
