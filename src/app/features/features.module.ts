import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherWidgetComponent } from './weather-widget/weather-widget.component';
import { FontAwesomeModule, FaIconLibrary  } from '@fortawesome/angular-fontawesome';

import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
@NgModule({
	declarations: [WeatherWidgetComponent],
	imports: [CommonModule, FontAwesomeModule ],
	exports: [WeatherWidgetComponent]
})
export class FeaturesModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, fab, far);
  }
}
