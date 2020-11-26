import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { movieModel } from '../models/movies';
import { User } from '../models/auth-data.model';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http:HttpClient) { }

  fetchMovies():Observable<Object>{
    return this.http.get('http://localhost:3000/media/movies');
  }
  addMovie(movie:movieModel):Observable<Object>{
    return this.http.post<{message:string}>('http://localhost:3000/media/addMovie',movie);
  }
  createUser(User:User):Observable<Object>{
    return this.http.post("http://localhost:3000/user/signup",User);
  }
  signin(User:User):Observable<Object>{
    return this.http.post<{token:string,expiresIn:number}>("http://localhost:3000/user/signin",User);
  }
}
