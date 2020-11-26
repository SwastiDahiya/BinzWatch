import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from '../models/auth-data.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token:string;
  private isAuthenticated:boolean;
  private authStatusListener = new Subject<boolean>();
  private tokenTimer :any;
  constructor(private httpService:HttpService,private router:Router) { }
 
  getToken(){
    return this.token;
  }
  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }
  getIsAuth(){
    return this.isAuthenticated
  }
  createUser(User:User){
    this.httpService.createUser(User)
    .subscribe((response)=>{
      this.signin(User);
    },(err:HttpErrorResponse)=>{
      console.log('email address already exists');
      this.authStatusListener.next(false);
      this.isAuthenticated = false
    })
  }

  signin(User:User){
    this.httpService.signin(User).subscribe((res:any)=>{
      // console.log(res);
      const token = res.token;
      this.token = token;
      if(token){
        const expiresInDuration = res.expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.authStatusListener.next(true);
        this.isAuthenticated= true;
        const now = new Date();
        const expirationDate = new Date(now.getTime()+ expiresInDuration*1000);
        this.saveAuthData(token,expirationDate);
        this.router.navigate(['browse']);
      }
    },(err:HttpErrorResponse)=>{
      console.log('wrong credentials')
      this.authStatusListener.next(false);
      this.isAuthenticated = false
    })
  }
 
  autoAuthuser(){
    const authInformation = this.getAuthData();
    if(!authInformation){
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime()-now.getTime();
    if(expiresIn>0){
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn/1000);
      this.authStatusListener.next(true);
    }
  }
  signOut(){
    this.token=null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/'])
  }
  private setAuthTimer(duration:number){
    console.log("setting timer: "+duration)
    this.tokenTimer = setTimeout(()=>{
      this.signOut();
    },duration*1000)
  }
  private getAuthData(){
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    if(!token||!expirationDate){
      return;
    }
    return {
      token:token,
      expirationDate:new Date(expirationDate)
    }
  }

  private saveAuthData(token:string, expirationDate:Date){
    localStorage.setItem('token',token);
    localStorage.setItem('expiration',expirationDate.toISOString());
  }

  private clearAuthData(){
    localStorage.removeItem("token");
    localStorage.removeItem('expiration');
  }
}
