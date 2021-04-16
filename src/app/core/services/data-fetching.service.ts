import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {environment} from 'src/environments/environment'


import {WeatherData} from '../interfaces/weatherData.model'

@Injectable({
	providedIn: 'root'
})
export class DataFetchingService {
	weatherData$ = this.http.get<WeatherData>(`http://api.openweathermap.org/data/2.5/weather?q=Munich&appid=${environment.apiKey}`).pipe(
    tap(data => console.log(JSON.stringify(data)),
    catchError(this.handleError)
    )
  );

  constructor(private http: HttpClient) {}

	// getWeatherData(): Observable<WeatherData> {
  //   return this.http.get<WeatherData>('http://api.openweathermap.org/data/2.5/weather?q=Munich&appid=a3ff900fb3e7fc2b51ea1b5f84d99dca')

  // }

  private handleError(err: any): Observable<never> {
		// in a real world app, we may send the server to some remote logging infrastructure
		// instead of just logging it to the console
		let errorMessage: string;
		if (err.error instanceof ErrorEvent) {
			// A client-side or network error occurred. Handle it accordingly.
			errorMessage = `An error occurred: ${err.error.message}`;
		} else {
			// The backend returned an unsuccessful response code.
			// The response body may contain clues as to what went wrong,
			errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
		}
		console.error(err);
		return throwError(errorMessage);
	}
}
