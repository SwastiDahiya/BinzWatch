import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {
	ngOnInit() {}
	constructor(public router: Router) {}
	toVideoPlayer() {
		this.router.navigate([ 'videoPlayer' ]);
	}
	playMovie(){
		this.router.navigate(['videoPlayer'])
	}
}
