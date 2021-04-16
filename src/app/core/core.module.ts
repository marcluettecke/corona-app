import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DataFetchingService } from './services/data-fetching.service';


const coreModules = [HttpClientModule];

@NgModule({
  imports: [CommonModule, ...coreModules],
	exports: [...coreModules],
  providers: [DataFetchingService],
})
export class CoreModule {}
