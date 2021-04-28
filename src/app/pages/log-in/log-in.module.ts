import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogInComponent } from './log-in.component';
import { FeaturesModule } from 'src/app/features/features.module';

@NgModule({
	imports: [CommonModule, FeaturesModule],
	declarations: [LogInComponent],
	exports: [FeaturesModule]
})
export class LogInModule {}
