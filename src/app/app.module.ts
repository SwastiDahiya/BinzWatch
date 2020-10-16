import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { VideoplayerComponent } from "./videoplayer/videoplayer.component";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { MovieCardComponent } from './movie-card/movie-card.component';
import { ImageComponent } from './image/image.component';
import { SignInComponent } from './sign-in/sign-in.component';


export const appRoutes: Routes = [
  { path: "home", component: HomeComponent },
  { path: " ", redirectTo: "/home", pathMatch: "full" },
  { path: "videoPlayer", component: VideoplayerComponent },
  { path: "sign_in", component: SignInComponent },
  { path: "movie-card", component: MovieCardComponent }
];




@NgModule({
  declarations: [AppComponent, VideoplayerComponent, HomeComponent, MovieCardComponent, ImageComponent, SignInComponent],
  imports: [BrowserModule, AppRoutingModule, RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
