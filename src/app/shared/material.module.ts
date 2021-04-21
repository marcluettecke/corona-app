import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const materialModules = [
	MatSidenavModule,
	MatToolbarModule,
	MatIconModule,
	MatButtonModule,
	MatListModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatInputModule
];

@NgModule({
	imports: [CommonModule, ...materialModules],
	exports: [...materialModules]
})
export class MaterialModule {}
