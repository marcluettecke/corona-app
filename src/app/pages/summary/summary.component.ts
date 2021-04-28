import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { WeatherData } from 'src/app/core/interfaces/weatherData.model';
import { Router } from '@angular/router';
import { DataFetchingService } from 'src/app/core/services/data-fetching.service';

@Component({
	selector: 'app-summary',
	templateUrl: './summary.component.html',
	styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit, OnDestroy {
	WeatherDataFork$: Observable<WeatherData[]>;
	cities: string[];
	responseList: WeatherData[];
	private citiesChangedSubscription: Subscription;

	constructor(private dataFetching: DataFetchingService, private router: Router) {
		this.WeatherDataFork$ = this.dataFetching.getWeatherData(this.cities);
	}

	ngOnInit() {
		this.citiesChangedSubscription = this.dataFetching.citiesChanged.subscribe(users => {
			this.dataFetching.getWeatherData(users[0].cities).subscribe(weatherData => {
				this.responseList = weatherData;
			});
		});
		// this.dataFetching.fetchCities();
		// this.dataFetching.getWeatherData().subscribe(data => {
		// 	this.responseList = data;
		// });
	}

	onAddButtonClick() {
		this.router.navigateByUrl('/data');
	}

	ngOnDestroy(): void {
		this.citiesChangedSubscription.unsubscribe();
	}
}
