import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { VideoplayerComponent } from '../app/components/videoplayer/videoplayer.component';
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "../app/components/home/home.component";
import { MovieCardComponent } from '../app/components/movie-card/movie-card.component';
import { ImageComponent } from '../app/components/image/image.component';
import { SignInComponent } from '../app/components/auth/sign-in/sign-in.component';
import { SliderComponent } from '../app/components/slider/slider.component';
import { BrowseComponent } from './components/browse/browse.component';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {SlickCarouselModule} from 'ngx-slick-carousel';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminComponent } from './components/admin/admin.component';
import { FormsModule } from '@angular/forms';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { LoaderComponent } from './components/loader/loader.component';
import { AuthGuard } from './components/auth/auth.guard';
import { CarouselModule } from 'ngx-owl-carousel-o';
export const appRoutes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "videoPlayer", component: VideoplayerComponent,canActivate:[AuthGuard] },
  { path: "sign-in", component: SignInComponent },
  { path: "signup", component:SignUpComponent},
  { path: "movie-card", component: MovieCardComponent },
  { path: "browse", component:BrowseComponent,canActivate:[AuthGuard]},
  { path: "admin",component:AdminComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '', redirectTo: '/browse', pathMatch: 'full', canActivate:[AuthGuard] }
];




@NgModule({
  declarations: [AppComponent, VideoplayerComponent, HomeComponent, MovieCardComponent, ImageComponent, SignInComponent,SliderComponent, BrowseComponent, AdminComponent, SignUpComponent, LoaderComponent],
  imports: [BrowserModule, AppRoutingModule, RouterModule.forRoot(appRoutes), 
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    SlickCarouselModule,
    HttpClientModule,
    FormsModule,
    CarouselModule,
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS, useClass:AuthInterceptorService,multi:true
    },AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
