import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { VideoplayerComponent } from '../app/components/videoplayer/videoplayer.component';
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "../app/components/home/home.component";
import { MovieCardComponent } from '../app/components/movie-card/movie-card.component';
import { ImageComponent } from '../app/components/image/image.component';
import { SignInComponent } from '../app/components/sign-in/sign-in.component';
import { SliderComponent } from '../app/components/slider/slider.component';
import { BrowseComponent } from './components/browse/browse.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
export const appRoutes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "videoPlayer", component: VideoplayerComponent },
  { path: "sign-in", component: SignInComponent },
  { path: "movie-card", component: MovieCardComponent },
  { path: "browse", component:BrowseComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];




@NgModule({
  declarations: [AppComponent, VideoplayerComponent, HomeComponent, MovieCardComponent, ImageComponent, SignInComponent,SliderComponent, BrowseComponent],
  imports: [BrowserModule, AppRoutingModule, RouterModule.forRoot(appRoutes), 
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatBadgeModule,
    SlickCarouselModule,
    HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
