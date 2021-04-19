import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryComponent } from './summary.component';
import { FeaturesModule } from 'src/app/features/features.module';

@NgModule({
	declarations: [SummaryComponent],
	imports: [CommonModule, FeaturesModule],
	exports: [SummaryComponent]
})
export class SummaryModule {}
