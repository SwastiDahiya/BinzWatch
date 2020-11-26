import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { User } from 'src/app/models/auth-data.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  isLoading:boolean = false;
  incorrectDetails: boolean = false;
  constructor(
    private router: Router,
    private authService:AuthService,
    ) {}
  ngOnInit(){

  }
  signIn(form:NgForm){
    if(form.invalid){
      return;
    }
    this.isLoading=true
    var user = new User();
    user.email = form.value.email;
    user.password = form.value.password;
    this.authService.signin(user);
    this.authService.getAuthStatusListener().subscribe((res)=>{
      if(res==false){
        this.isLoading=false;
        this.incorrectDetails = true;
      }
    });
    // this.router.navigate(['browse']);
  }
  toSignUp(){
    this.router.navigate(['signup'])
  }
}
