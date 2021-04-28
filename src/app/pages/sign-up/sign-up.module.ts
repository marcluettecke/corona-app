import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up.component';
import { FeaturesModule } from 'src/app/features/features.module';

@NgModule({
	declarations: [SignUpComponent],
	imports: [CommonModule, FeaturesModule],
	exports: [FeaturesModule]
})
export class SignUpModule {}
