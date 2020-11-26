import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/auth-data.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  isLoading:boolean = false;
  emailExists: boolean = false;
  constructor(
    private router:Router,
    private authService:AuthService
    ) { }

  ngOnInit(): void {
  }
  signUp(form:NgForm){
    var user = new User();
    this.isLoading = true;
    user.email = form.value.email;
    user.fullName =  form.value.fullName;
    user.password = form.value.password;
    this.authService.createUser(user);
    this.authService.getAuthStatusListener().subscribe(res=>{
      if(res==false){
        this.isLoading=false;
        this.emailExists=true;
      }
    })
  }
  toSignIn(){
    this.router.navigate(['sign-in'])
  }

}
