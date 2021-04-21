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
		'date',
		'name',
		'min-temp',
		'max-temp',
		'wind',
		'pressure',
		'humidity'
	];
	private weatherDataChangedSubscription: Subscription;
	dataSource = new MatTableDataSource<WeatherData>();
  @ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(private fetchingService: DataFetchingService) {}

	ngOnInit() {
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

  ngOnDestroy() {
    this.weatherDataChangedSubscription.unsubscribe();
  }
}
