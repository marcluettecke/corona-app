import { Component, Input, OnInit } from '@angular/core';
import { WeatherData } from 'src/app/core/interfaces/weatherData.model';
import { DataFetchingService } from 'src/app/core/services/data-fetching.service';

import { findLocalTime } from '@helper/findLocalTime';

@Component({
	selector: 'app-weather-widget',
	templateUrl: './weather-widget.component.html',
	styleUrls: ['./weather-widget.component.scss']
})
export class WeatherWidgetComponent implements OnInit {
  localTime: string | number;
	currentLocalHourClass: string;
	isClear: boolean;
	isCloudy: boolean;
	isSnowy: boolean;
	isRainy: boolean;
	isWindy: boolean;
	weatherDescription: string;

  @Input() responseData: WeatherData;

	constructor(private dataFetchingService: DataFetchingService) {}

	ngOnInit() {
    this.dataFetchingService.cleanWeatherData(this.responseData)
    this.localTime = findLocalTime(this.responseData.timezone)
    this.setWidgetHTMLClasses()
	}

  setWidgetHTMLClasses(){
		this.currentLocalHourClass = `sky-gradient-${findLocalTime(this.responseData.timezone)}`;
		this.responseData.weather[0].description == 'clear sky'
			? (this.isClear = true)
			: (this.isClear = false);
		['few clouds', 'scattered clouds', 'haze'].includes(this.responseData.weather[0].description)
			? (this.isCloudy = true)
			: (this.isCloudy = false);
		['broken clouds', 'shower rain', 'rain', 'thunderstorm'].includes(
			this.responseData.weather[0].description
		)
			? (this.isRainy = true)
			: (this.isRainy = false);
		['snow', 'mist'].includes(this.responseData.weather[0].description)
			? (this.isSnowy = true)
			: (this.isSnowy = false);
		this.responseData.wind.speed > 8 ? (this.isWindy = true) : (this.isWindy = false);
		this.weatherDescription = this.responseData.weather[0].description;
  }

}
