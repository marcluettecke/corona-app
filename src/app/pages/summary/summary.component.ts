import { Component, OnChanges, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WeatherData } from 'src/app/core/interfaces/weatherData.model';
import { Router } from '@angular/router';
import { DataFetchingService } from 'src/app/core/services/data-fetching.service';

@Component({
	selector: 'app-summary',
	templateUrl: './summary.component.html',
	styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
	WeatherDataFork$: Observable<WeatherData[]>;
	responseList: WeatherData[];
	responseData1: any = {};
	responseData2: any = {};
	responseData3: any = {};

	constructor(private dataFetching: DataFetchingService, private router: Router) {
		this.WeatherDataFork$ = this.dataFetching.getWeatherData();
	}

	ngOnInit() {
		this.dataFetching.getWeatherData().subscribe(responseList => {
			this.responseList = responseList;
		});
	}

	onAddButtonClick() {
		this.router.navigateByUrl('/data');
	}
}
