import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataDisplayComponent } from './data-display.component';
import { FeaturesModule } from 'src/app/features/features.module';

@NgModule({
	declarations: [DataDisplayComponent],
	imports: [CommonModule, FeaturesModule],
	exports: [FeaturesModule]
})
export class DataDisplayModule {}
