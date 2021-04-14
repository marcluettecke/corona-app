import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component'
import { MaterialModule } from 'src/app/shared/material.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [ToolbarComponent]
})
export class ToolbarModule { }
