import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { movieModel } from 'src/app/models/movies';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
    private httpService:HttpService,
    private authService:AuthService
    ) { }
  
  ngOnInit(): void {
  }
  addMovie(form:NgForm){
    var movie:movieModel = new movieModel();
    movie.movieTitle = form.value.movieTitle;
    movie.movieType = form.value.movieType;
    movie.movieMediaUrl = form.value.movieMediaUrl;
    movie.moviePosterLink = form.value.moviePosterLink;
    console.log(movie);
    this.httpService.addMovie(movie).subscribe((res:any)=>{
      console.log(res.message);
    })
  }
}
