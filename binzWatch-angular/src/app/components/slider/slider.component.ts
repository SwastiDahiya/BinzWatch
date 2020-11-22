import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import {Movies} from '../../models/movies';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
   @Input() sliderConfig;
   @Input() movies: Movies;
   @Input() title: string;

  constructor(private router:Router,private movieService:MovieService) { }

  ngOnInit(): void {
    
  }

  playMovie(movie){
    console.log(movie);
    this.movieService.setSelectedMovie(movie);
    this.router.navigate(['videoPlayer']);
  }
}
