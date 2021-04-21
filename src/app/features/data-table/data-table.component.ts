import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { WeatherData } from 'src/app/core/interfaces/weatherData.model';
import { DataFetchingService } from 'src/app/core/services/data-fetching.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  displayedColumns = ['date', 'name', 'min temp', 'max temp', 'wind speed', 'pressure', 'humidity'];
  dataSource = new MatTableDataSource<WeatherData>();

  constructor(private FetchingService: DataFetchingService) { }

  ngOnInit() {
  }

}
