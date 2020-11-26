import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from './services/auth.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "binzWatch";
  constructor(private authService:AuthService,private router:Router){}
  ngOnInit(){
    this.authService.autoAuthuser();
    if(this.authService.getIsAuth()==true){
      this.router.navigate(['browse'])
    }

  }

}
