import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
	selector: 'app-toolbar',
	templateUrl: './toolbar.component.html',
	styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  isSmallScreen: boolean;

	constructor(private breakpointObserver: BreakpointObserver) {
		this.isSmallScreen = this.breakpointObserver.isMatched('(max-width: 599px)');
	}

	ngOnInit(): void {
    console.log(this.isSmallScreen);

  }
}
