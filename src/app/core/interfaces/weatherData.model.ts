export interface WeatherData {
	coord: {
		lon: number;
		lat: number;
	};
	weather: [
		{
			id: number;
			main: 'Thunderstorm' | 'Drizzle' | 'Rain' | 'Snow' | 'Atmohsphere' | 'Clouds' | 'Clear';
			description:
				| 'clear sky'
				| 'few clouds'
				| 'scattered clouds'
				| 'broken clouds'
				| 'shower rain'
				| 'rain'
				| 'thunderstorm'
				| 'snow'
				| 'mist';
			icon:
				| '01d'
				| '02d'
				| '03d'
				| '04d'
				| '09d'
				| '10d'
				| '11d'
				| '13d'
				| '50d'
				| '01n'
				| '02n'
				| '03n'
				| '04n'
				| '09n'
				| '10n'
				| '11n'
				| '13n'
				| '50n';
		}
	];
	base: string;
	main: {
		temp: number;
		feels_like: number;
		temp_min: number;
		temp_max: number;
		pressure: number;
		humidity: number;
	};
	visibility: number;
	wind: {
		speed: number;
		deg: number;
	};
	clouds: {
		all: number;
	};
	dt: number;
	sys: {
		type: number;
		id: number;
		message: number;
		country: string;
		sunrise: number;
		sunset: number;
	};
	timezone: number;
	id: number;
	name: string;
	cod: number;
}
