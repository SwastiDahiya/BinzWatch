import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {
	ngOnInit() {
		this.httpService.fetchMovies().subscribe((res)=>{
			console.log(res);
		  })
	}
	constructor(public router: Router,private httpService:HttpService) {}
	toVideoPlayer() {
		this.router.navigate([ 'videoPlayer' ]);
	}
	playMovie(){
		this.router.navigate(['videoPlayer'])
  }
  toSignInPage(){
    this.router.navigate(['sign-in'])
  }
}
