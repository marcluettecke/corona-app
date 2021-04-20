import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { WeatherData } from '../interfaces/weatherData.model';

@Injectable({
	providedIn: 'root'
})
export class DataFetchingService {
	citiesObservable$: Observable<string>;
	cities: string[];
	// weatherData$ = this.http.get<WeatherData>(`http://api.openweathermap.org/data/2.5/weather?q=Munich&appid=${environment.apiKey}&units=metric`).pipe(
	weatherData$ = this.http
		.get<WeatherData>(
			`http://api.openweathermap.org/data/2.5/weather?q=Munich&appid=${environment.apiKey}`
		)
		.pipe(
			// tap(data => console.log(JSON.stringify(data)),
			tap(data => console.log(data), catchError(this.handleError))
		);

	constructor(private http: HttpClient) {
		this.getCities();
	}

	getCities() {
		this.citiesObservable$ = this.http.get<string>('../../../assets/data/cities_clean.txt', {
			responseType: 'text' as 'json'
		});
	}

	getWeatherData(): Observable<WeatherData[]> {
		let joinedData$: Observable<WeatherData>;
		// let data$: Observable<WeatherData>[] = [];
		// this.citiesObservable$.subscribe(citiesLoaded => {
		// 	this.cities = citiesLoaded.split(',');
		// 	data$ = this.cities.map(city => {
		// 		return this.getWeatherCity(city);
		// 	});
		// 	// data$.map(el => {
		// 	// 	console.log(el.subscribe(elData => console.log(elData)));
		// 	// });
		// });
		// console.log(forkJoin(data$).subscribe(elements => console.log(elements)));

		let response1 = this.getWeatherCity('Landau');
		let response2 = this.getWeatherCity('Hamm');
		let response3 = this.getWeatherCity('Munich');

		response1.subscribe(data => {
			console.log(data);
		});

		return forkJoin([response1, response2, response3]);
	}

	getWeatherCity(city: string): Observable<WeatherData> {
		return this.http
			.get<WeatherData>(
				`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${environment.apiKey}`
			)
			.pipe(
				// tap(data => console.log(data)),
				catchError(this.handleError)
			);
	}

	getDummyWeatherData() {
		let data = JSON.parse(
			'{"coord":{"lon":72.85,"lat":19.01},"weather":[{"id":721,"main":"Haze","description":"thunderstorm","icon":"50n"}],"base":"stations","main":{"temp":8.15,"feels_like":8.15,"temp_min":7.22,"temp_max":8.89,"pressure":1013,"humidity":69},"visibility":3500,"wind":{"speed":9,"deg":300},"clouds":{"all":80},"dt":1580141589,"sys":{"type":1,"id":9052,"country":"IN","sunrise":1580089441,"sunset":1580129884},"timezone":19800,"id":1275339,"name":"Mumbai","cod":200}'
		);
		return data;
	}

	cleanWeatherData(data: WeatherData) {
		let cleanData = { ...data };
		cleanData.main.temp = +data.main.temp.toFixed(0);
		cleanData.main.temp_min = +data.main.temp_min.toFixed(0);
		cleanData.main.temp_max = +data.main.temp_max.toFixed(0);
		cleanData.main.feels_like = +data.main.feels_like.toFixed(0);
		// console.log(cleanData);
		return cleanData;
	}

	private handleError(err: any): Observable<never> {
		// simple dummy logging structure
		let errorMessage: string;
		if (err.error instanceof ErrorEvent) {
			errorMessage = `An error occurred: ${err.error.message}`;
		} else {
			errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
		}
		console.error(err);
		return throwError(errorMessage);
	}
}
