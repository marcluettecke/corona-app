import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherData } from 'src/app/core/interfaces/weatherData.model';
import { DataFetchingService } from 'src/app/core/services/data-fetching.service';

@Component({
	selector: 'app-weather-widget',
	templateUrl: './weather-widget.component.html',
	styleUrls: ['./weather-widget.component.scss']
})
export class WeatherWidgetComponent implements OnInit {
	weatherData$: Observable<WeatherData>;
	WeatherData: WeatherData;
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
		this.getWeatherData();
		this.currentLocalHourClass = `sky-gradient-${this.findLocalTime()}`;
		this.WeatherData.weather[0].description == 'clear sky'
			? (this.isClear = true)
			: (this.isClear = false);
		['few clouds', 'scattered clouds', 'haze'].includes(this.WeatherData.weather[0].description)
			? (this.isCloudy = true)
			: (this.isCloudy = false);
		['broken clouds', 'shower rain', 'rain', 'thunderstorm'].includes(this.WeatherData.weather[0].description)
			? (this.isRainy = true)
			: (this.isRainy = false);
		['snow', 'mist'].includes(this.WeatherData.weather[0].description)
			? (this.isSnowy = true)
			: (this.isSnowy = false);
		this.WeatherData.wind.speed > 8 ? (this.isWindy = true) : (this.isWindy = false);
		this.weatherDescription = this.WeatherData.weather[0].description;
	}

	getWeatherData() {
		let data = JSON.parse(
			'{"coord":{"lon":72.85,"lat":19.01},"weather":[{"id":721,"main":"Haze","description":"thunderstorm","icon":"50n"}],"base":"stations","main":{"temp":8.15,"feels_like":8.15,"temp_min":7.22,"temp_max":8.89,"pressure":1013,"humidity":69},"visibility":3500,"wind":{"speed":9,"deg":300},"clouds":{"all":80},"dt":1580141589,"sys":{"type":1,"id":9052,"country":"IN","sunrise":1580089441,"sunset":1580129884},"timezone":19800,"id":1275339,"name":"Mumbai","cod":200}'
		);
		this.setWeatherData(data);
	}

	addMinutes(date: Date, minutes: number) {
		return new Date(date.getTime() + minutes * 60000);
	}

	findLocalTime() {
		let currentDate = new Date();
		let currentTimeUTC = this.addMinutes(currentDate, currentDate.getTimezoneOffset());
		let currentTimeLocal = this.addMinutes(currentTimeUTC, this.WeatherData.timezone / 60);
		return currentTimeLocal.getHours();
	}

	//will all be done in the service
	setWeatherData(data: any) {
		this.WeatherData = data;
		this.WeatherData.main.temp = +this.WeatherData.main.temp.toFixed(0);
		this.WeatherData.main.temp_min = +this.WeatherData.main.temp_min.toFixed(0);
		this.WeatherData.main.temp_max = +this.WeatherData.main.temp_max.toFixed(0);
		this.WeatherData.main.feels_like = +this.WeatherData.main.feels_like.toFixed(0);
		console.log(this.WeatherData);
	}
}
