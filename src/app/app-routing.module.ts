import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SummaryComponent } from 'src/app/pages/summary/summary.component';
import { DataDisplayComponent } from 'src/app/pages/data-display/data-display.component';
import { VisualizationComponent } from 'src/app/pages/visualization/visualization.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

const routes: Routes = [
	{ path: 'summary', component: SummaryComponent },
	{ path: 'data', component: DataDisplayComponent },
	{ path: 'visualization', component: VisualizationComponent },
	{ path: 'log-in', component: LogInComponent },
	{ path: 'sign-up', component: SignUpComponent },
	{ path: '', redirectTo: '/summary', pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
