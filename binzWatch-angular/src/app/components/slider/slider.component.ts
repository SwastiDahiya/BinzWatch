import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
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
  mobileSliderConfig = {
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
  };
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    center: true,
    dots: true,
    autoHeight: true,
    autoWidth: true,
    responsive: {
      0: {
        items: 1,
      },
      300: {
        items: 1,
      },
      600: {
        items: 2,
      },
      800: {
        items: 3,
      },
      1000: {
        items: 3,
      },
      1300: {
        items: 4,
      },
    },
  };
}
