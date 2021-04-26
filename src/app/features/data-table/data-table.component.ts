import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { WeatherData } from 'src/app/core/interfaces/weatherData.model';
import { DataFetchingService } from 'src/app/core/services/data-fetching.service';

@Component({
	selector: 'app-data-table',
	templateUrl: './data-table.component.html',
	styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, AfterViewInit, OnDestroy {
	displayedColumns = [
		'dt',
		'name',
		'temp',
		'temp_min',
		'temp_max',
		'wind_speed',
		'pressure',
		'humidity',
		'add'
	];
	private weatherDataChangedSubscription: Subscription;
	dataSource = new MatTableDataSource<WeatherData>();
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(private fetchingService: DataFetchingService) {}

	ngOnInit() {
		this.dataSource.sortingDataAccessor = (item: WeatherData, property: string) => {
			switch (property) {
				case 'temp':
					return item.main.temp;
				case 'temp_min':
					return item.main.temp_min;
				case 'temp_max':
					return item.main.temp_max;
				case 'wind_speed':
					return item.wind.speed;
				case 'pressure':
					return item.main.pressure;
				case 'humidity':
					return item.main.humidity;
				default:
					return item.main.temp;
			}
		};

		this.weatherDataChangedSubscription = this.fetchingService.weatherDataChanged.subscribe(
			(data: WeatherData[]) => {
				this.dataSource.data = data;
			}
		);
		this.fetchingService.getDummyWeatherData();
	}

	ngAfterViewInit() {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	}

	doFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	onAddCityClick(row: WeatherData) {
		this.fetchingService.addCity(row.name);
	}

	ngOnDestroy() {
		this.weatherDataChangedSubscription.unsubscribe();
	}
}
