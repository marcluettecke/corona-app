import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
	AngularFirestore,
	AngularFirestoreCollection,
	DocumentReference
} from '@angular/fire/firestore';
import { Observable, throwError, Subject, Subscription, BehaviorSubject } from 'rxjs';
import { catchError, tap, mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { WeatherData } from '../interfaces/weatherData.model';
import { User } from '../interfaces/user.model';
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root'
})
export class DataFetchingService {
	private userRef: DocumentReference;
	private singleUser: User;
	cities: string[];
	citiesChanged = new BehaviorSubject<boolean>(false);
	testCities: Observable<string[]>;
	weatherDataChanged = new Subject<WeatherData[]>();

	data: Observable<WeatherData[]>;
	// weatherData$ = this.http.get<WeatherData>(`http://api.openweathermap.org/data/2.5/weather?q=Munich&appid=${environment.apiKey}&units=metric`).pipe(
	// weatherData$ = this.http
	// 	.get<WeatherData>(
	// 		`https://api.openweathermap.org/data/2.5/weather?q=Munich&appid=${environment.apiKey}`
	// 	)
	// 	.pipe(
	// 		// tap(data => console.log(JSON.stringify(data)),
	// 		tap(data => console.log(data), catchError(this.handleError))
	// 	);

	constructor(
		private http: HttpClient,
		private db: AngularFirestore,
		private authService: AuthService
	) {
		this.cities = [];
		// this.cities = ['Landau', 'Cologne', 'Munich', 'Tokyo', 'Sydney', 'New York'];
	}

	getCities() {
		return this.http.get<string>('../../../assets/data/cities_clean.txt', {
			responseType: 'text' as 'json'
		});
	}

	async getSingleUser() {
		const snapshotResult = await this.db
			.collection('users', ref =>
				ref.where('email', '==', this.authService.loggedInUserEmail).limit(1)
			)
			.snapshotChanges()
			.pipe(mergeMap(users => users));
		snapshotResult.subscribe(doc => {
			this.singleUser = <User>doc.payload.doc.data();
			this.userRef = doc.payload.doc.ref;
			// console.log(this.singleUser);
		});
	}

	addCity(newCity: string) {
		this.singleUser.cities?.push(newCity);
		this.userRef.update(this.singleUser);
		this.citiesChanged.next(true);
	}

	deleteCity(deletedCity: string) {
		console.log(this.singleUser.cities);
		const index = this.singleUser.cities!.indexOf(deletedCity);
		if (index > -1) {
			this.singleUser.cities!.splice(index, 1);
		}
		this.citiesChanged.next(true);
		this.userRef.update(this.singleUser);
	}

	fetchCities(email: string): Observable<User[]> {
		const userCollectionRef: AngularFirestoreCollection<User> = this.db.collection(
			'users',
			ref => ref.where('email', '==', email)
		);
		return userCollectionRef.valueChanges();
	}

	getWeatherCity(city: string): Observable<WeatherData> {
		return this.http
			.get<WeatherData>(
				`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${environment.apiKey}`
			)
			.pipe(catchError(this.handleError));
	}

	// getWeatherCityForecast(lat: number, lon: number): Observable<WeatherData> {
	// 	return this.http
	// 		.get<WeatherData>(
	// 			`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${environment.apiKey}`
	// 			// `http://api.openweathermap.org/data/2.5/onecall?q=${city}&exclude=current,minutely,hourly,alerts&units=metric&appid=${environment.apiKey}`
	// 		)
	// 		.pipe(catchError(this.handleError));
	// }

	getDummyWeatherData() {
		return this.http.get('../../../assets/data/data_dummy.json');
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
