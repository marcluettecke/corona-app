import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Observable, of, Subscription } from 'rxjs';
import { WeatherData } from 'src/app/core/interfaces/weatherData.model';
import { Router } from '@angular/router';
import { DataFetchingService } from 'src/app/core/services/data-fetching.service';
import { User } from '../../core/interfaces/user.model';
import { mergeMap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
	selector: 'app-summary',
	templateUrl: './summary.component.html',
	styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit, OnDestroy {
	WeatherData$: Observable<WeatherData[]>;
	cities: string[];
	responseList: WeatherData[];
	private dataFetchingSubscription: Subscription;

	constructor(
		private dataservice: DataFetchingService,
		private authService: AuthService,
		private router: Router
	) {}

	ngOnInit() {
		this.dataFetchingSubscription = this.dataservice
			.fetchCities(this.authService.loggedInUserEmail!)
			.pipe(
				mergeMap((userDataArray: User[]) => {
					const weatherData = userDataArray[0].cities!.map(city =>
						this.dataservice.getWeatherCity(city)
					);
					return forkJoin(weatherData);
				})
			)
			.subscribe(data => {
				this.responseList = data;
			});
	}

	onAddButtonClick() {
		this.router.navigateByUrl('/data');
	}

	ngOnDestroy() {
		this.dataFetchingSubscription.unsubscribe();
	}
}
