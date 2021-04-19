import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherData } from 'src/app/core/interfaces/weatherData.model';
import { DataFetchingService } from 'src/app/core/services/data-fetching.service';

import { findLocalTime } from '@helper/findLocalTime';

@Component({
	selector: 'app-weather-widget',
	templateUrl: './weather-widget.component.html',
	styleUrls: ['./weather-widget.component.scss']
})
export class WeatherWidgetComponent implements OnInit {
	weatherData$: Observable<WeatherData>;
	weatherData: WeatherData;
  localTime: number;
	currentLocalHourClass: string;
	isClear: boolean;
	isCloudy: boolean;
	isSnowy: boolean;
	isRainy: boolean;
	isWindy: boolean;
	weatherDescription: string;

	constructor(private dataFetchingService: DataFetchingService) {}

	ngOnInit() {
		this.weatherData$ = this.dataFetchingService.weatherData$;

		this.weatherData = this.dataFetchingService.getDummyWeatherData();
    this.dataFetchingService.cleanWeatherData(this.weatherData)

    this.localTime = findLocalTime(this.weatherData.timezone)

    this.setWidgetClasses()

	}

  setWidgetClasses(){
		this.currentLocalHourClass = `sky-gradient-${findLocalTime(this.weatherData.timezone)}`;
		this.weatherData.weather[0].description == 'clear sky'
			? (this.isClear = true)
			: (this.isClear = false);
		['few clouds', 'scattered clouds', 'haze'].includes(this.weatherData.weather[0].description)
			? (this.isCloudy = true)
			: (this.isCloudy = false);
		['broken clouds', 'shower rain', 'rain', 'thunderstorm'].includes(
			this.weatherData.weather[0].description
		)
			? (this.isRainy = true)
			: (this.isRainy = false);
		['snow', 'mist'].includes(this.weatherData.weather[0].description)
			? (this.isSnowy = true)
			: (this.isSnowy = false);
		this.weatherData.wind.speed > 8 ? (this.isWindy = true) : (this.isWindy = false);
		this.weatherDescription = this.weatherData.weather[0].description;
  }

}
