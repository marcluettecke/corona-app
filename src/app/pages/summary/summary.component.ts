import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataFetchingService } from 'src/app/core/services/data-fetching.service';

@Component({
	selector: 'app-summary',
	templateUrl: './summary.component.html',
	styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
	weatherData: Observable<any>;

	constructor(private dataFetching: DataFetchingService) {}

	ngOnInit() {
		this.weatherData = this.dataFetching.getWeatherData();
		this.weatherData.subscribe(data => {
			console.log(data);
		});
	}
}
