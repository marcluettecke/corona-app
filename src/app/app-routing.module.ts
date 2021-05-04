import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SummaryComponent } from 'src/app/pages/summary/summary.component';
import { DataDisplayComponent } from 'src/app/pages/data-display/data-display.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
	{ path: 'summary', component: SummaryComponent, canActivate: [AuthGuard] },
	{ path: 'data', component: DataDisplayComponent, canActivate: [AuthGuard] },
	{ path: 'log-in', component: LogInComponent },
	{ path: 'sign-up', component: SignUpComponent },
	{ path: '', redirectTo: '/log-in', pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: [AuthGuard]
})
export class AppRoutingModule {}
