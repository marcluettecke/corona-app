import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class DataFetchingService {
	// weatherData: Observable<any>;

  constructor(private http: HttpClient) {}

	getWeatherData() {
    return this.http.get('http://api.openweathermap.org/data/2.5/weather?q=Munich&appid=a3ff900fb3e7fc2b51ea1b5f84d99dca')

  }
}
