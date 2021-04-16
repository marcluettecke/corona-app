import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherData } from 'src/app/core/interfaces/weatherData.model';
import { DataFetchingService } from 'src/app/core/services/data-fetching.service';

@Component({
	selector: 'app-summary',
	templateUrl: './summary.component.html',
	styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
	weatherData$: Observable<WeatherData>;

	constructor(private dataFetching: DataFetchingService) {}

	ngOnInit() {
		this.weatherData$ = this.dataFetching.weatherData$;
		// this.weatherData.subscribe(data => {
		// 	console.log(data);
		// });
	}
}
