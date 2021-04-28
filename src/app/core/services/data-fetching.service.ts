import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { forkJoin, Observable, throwError, of, Subject, Subscription } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { WeatherData } from '../interfaces/weatherData.model';
import { User } from '../interfaces/user.model';

@Injectable({
	providedIn: 'root'
})
export class DataFetchingService {
	cities: string[];
	citiesChanged = new Subject<User[]>();
	testCities: Observable<string[]>;
	weatherDataChanged = new Subject<WeatherData[]>();
	private fbSubs: Subscription[] = [];

	data: Observable<WeatherData[]>;
	// weatherData$ = this.http.get<WeatherData>(`http://api.openweathermap.org/data/2.5/weather?q=Munich&appid=${environment.apiKey}&units=metric`).pipe(
	weatherData$ = this.http
		.get<WeatherData>(
			`http://api.openweathermap.org/data/2.5/weather?q=Munich&appid=${environment.apiKey}`
		)
		.pipe(
			// tap(data => console.log(JSON.stringify(data)),
			tap(data => console.log(data), catchError(this.handleError))
		);

	constructor(private http: HttpClient, private db: AngularFirestore) {
		this.cities = [];
		// this.cities = ['Landau', 'Cologne', 'Munich', 'Tokyo', 'Sydney', 'New York'];
		// this.db
		// 	.collection('users')
		// 	.valueChanges()
		// 	.subscribe((data: any) => {
		// 		this.cities.next(data[0].cities);
		// 	});
	}

	getCities() {
		return this.http.get<string>('../../../assets/data/cities_clean.txt', {
			responseType: 'text' as 'json'
		});
	}

	fetchCities() {
		// this.cities = [];
		this.fbSubs.push(
			this.db
				.collection('users')
				.valueChanges()
				.subscribe((users: any) => {
					this.citiesChanged.next(users);
					// this.cities.push(...users[0].cities);
					// console.log(this.cities);
				})
		);
	}
	getWeatherData(cities: any): Observable<WeatherData[]> {
		let data: Observable<WeatherData[]> = of();
		let responses$: Observable<WeatherData>[] = [];
		this.fetchCities();
		cities.map((city: string) => {
			responses$.push(this.getWeatherCity(city));
		});
		data = forkJoin(responses$);
		return data;
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
		this.http.get('../../../assets/data/data_dummy.json').subscribe((data: any) => {
			this.weatherDataChanged.next(data);
		});
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

	addCity(city: string) {
		// this.cities.push(city);
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

	cancelSubscriptions() {
		this.fbSubs.forEach(sub => sub.unsubscribe());
	}
}
