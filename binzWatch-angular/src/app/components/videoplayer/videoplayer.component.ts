import { Component, OnInit, ViewChild, ElementRef, HostListener, OnChanges, NgZone } from '@angular/core';
import { fromEvent, timer } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';

@Component({
	selector: 'app-videoplayer',
	templateUrl: './videoplayer.component.html',
	styleUrls: [ './videoplayer.component.css' ]
})
export class VideoplayerComponent implements OnInit {
	selectedMovie;
	hideLoader=false;
	// --------- video assets -------------
	movieTitle: string = '';
	videoSource: string = '';
	subtitleSource: string = 'server/e1.vtt';
	quality = 720;
	subtitleLanguage: string = 'off';
	//    ---------------------------------------------
	hideVolume: boolean = true;
	x=true;
	currentTime;
	totalDuration;
	hideTop = true;
	displayLoader = true;
	hideLower = true;
	progressPos;
	screenStatus: string = 'fullscreen';
	videoStatus: string = 'pause';
	topVisible = false;
	openQuality: boolean = false;
	openSubtitles: boolean = false;
	videoPlayer: HTMLVideoElement;
	MouseOverManipulate = false;
	// ------------ parent-child relationships ----------------------
	@ViewChild('videoFullscreen', { static: false })
	divRef;

	@ViewChild('videoPlayer', { static: false })
	set mainVideoEl(el: ElementRef) {
		this.videoPlayer = el.nativeElement;
	}
	//    --------------------------------------------------------------
	
	// @HostListener('document:mousemove', [ '$event' ]) //fuction to display and hide element sue to mouseover
	// onMouseMove($event) {
	// 	if (this.MouseOverManipulate == false) {
	// 		this.hideTop = false;

	// 		setTimeout(() => {
	// 			this.hideTop = true;
	// 			this.hideVolume = true;
	// 			this.openSubtitles = false;
	// 			this.openQuality = false;
	// 		}, 5000);
	// 	}
	// }

	// ngOnInit() {
	// 	this.initialisePlayer();
	// }
	constructor(private router:Router,private movieService:MovieService,private zone:NgZone) {
		
	}
	ngOnInit(): void {
		document.getElementById("overlay").style.display = "none";
		this.initialisePlayer();
		// this.disableLoader();
		if (this.MouseOverManipulate == false) {
			fromEvent<MouseEvent>(document, 'mousemove')
				.pipe(
					tap(() => {
					
						this.hideTop = false;
					}),
					switchMap((event) =>
						timer(5000).pipe(
							tap(() => {
						
								this.hideTop = true;
								this.hideVolume = true;
								this.openSubtitles = false;
								this.openQuality = false;
							})
						)
					)
				)
				.subscribe();
		}
	}

	

	toBrowsePage(){
		this.router.navigate(['browse'])
	}
	public initialisePlayer() {
		this.selectedMovie = this.movieService.getSelectedMovie();
		this.videoSource = this.movieService.getSelectedMovie().mediaUrl;
		this.movieTitle = this.movieService.getSelectedMovie().title;
		this.MouseOverManipulate = true;
		var myVideo: any = document.getElementById('myVideo');
		myVideo.onplaying = function() {
			document.getElementById("loader").style.display = "none";
			document.getElementById("overlay").style.display = "block";
		};
		myVideo.onwaiting = function() {
			document.getElementById("loader").style.display = "block";
			document.getElementById("overlay").style.display = "none";
		  };
		this.hideLoader=true;
		if (myVideo.paused == true) {
			this.hideLoader = false;

			this.updateDuration();
			this.seekbar();
			this.updateVolume();
			this.hideTop = false;
			// this.hideLower = false;
			this.MouseOverManipulate = false;
		}
	}

	public changeTitleVisible() {
		this.topVisible = true;
		setTimeout(() => {
			this.topVisible = false;
		}, 5000);
	}

	public changeQuality(quality) {
		//for changing the quality of the video

		this.quality = quality;
	}

	public toggleQuality() {
		//toggling quality button
		this.openSubtitles = false;
		this.hideVolume = true;
		if (this.openQuality == false) {
			this.openQuality = true;
		} else {
			this.openQuality = false;
		}
	}

	public toggleVolume() {
		//toggling quality button
		this.openQuality = false;
		this.openSubtitles = false;
		if (this.hideVolume == false) {
			this.hideVolume = true;
		} else {
			this.hideVolume = false;
		}
	}

	public toggleSubtitles() {
		//toggling subtitle button
		this.openQuality = false;
		this.hideVolume = true;
		if (this.openSubtitles == true) {
			this.openSubtitles = false;
		} else {
			this.openSubtitles = true;
		}
	}

	public playButton() {
		//toggling play button
		var myVideo: any = document.getElementById('myVideo');
		if (this.videoStatus === 'pause') {
			myVideo.pause();
			this.videoStatus = 'play_arrow';
		} else {
			myVideo.play();
			this.videoStatus = 'pause';
		}
	}
	
	public toggleFullScreen() {
		//toggling fullscreen
		const elem = this.divRef.nativeElement;

		if (this.screenStatus === 'fullscreen') {
			if (elem.requestFullscreen) {
				elem.requestFullscreen();
			} else if (elem.msRequestFullscreen) {
				elem.msRequestFullscreen();
			} else if (elem.mozRequestFullScreen) {
				elem.mozRequestFullScreen();
			} else if (elem.webkitRequestFullscreen) {
				elem.webkitRequestFullscreen();
			}
			this.screenStatus = 'fullscreen_exit';
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			}
			this.screenStatus = 'fullscreen';
		}
	}

	public backwardRewind(time) {
		//function for 10 seconds backward
		var myVideo: any = document.getElementById('myVideo');
		myVideo.currentTime -= time;
	}

	public forwardRewind(time) {
		// function for 10 seconds forward
		var myVideo: any = document.getElementById('myVideo');
		myVideo.currentTime += time;
	}

	updateDuration() {
		// function for updating the duration , displaying time durations
		var myVideo: any = document.getElementById('myVideo');
		var progress: any = document.getElementById('progress');

		myVideo.addEventListener('timeupdate', function() {
			// if (!myVideo.paused) {

			// }
			var progressPos = myVideo.currentTime / myVideo.duration;
			progress.style.width = progressPos * 100 + '%';
			var s = Math.trunc(myVideo.currentTime % 60);
			var m = Math.trunc((myVideo.currentTime / 60) % 60);
			var h = Math.trunc((myVideo.currentTime / (60 * 60)) % 60);
			var formattedseconds = ('0' + s).slice(-2);
			var formattedminutes = ('0' + m).slice(-2);
			var formattedhours = ('0' + h).slice(-2);
			var leftTime = myVideo.duration - myVideo.currentTime;
			var sDur = Math.trunc(leftTime % 60);
			var mDur = Math.trunc((leftTime / 60) % 60);
			var hDur = Math.trunc((leftTime / (60 * 60)) % 60);
			var formattedsecondsDuration = ('0' + sDur).slice(-2);
			var formattedminutesDuration = ('0' + mDur).slice(-2);
			var formattedhoursDuration = ('0' + hDur).slice(-2);

			document.getElementById('currentTime').innerHTML =
				formattedhours + ':' + formattedminutes + ':' + formattedseconds;
			document.getElementById('totalDuration').innerHTML =
				formattedhoursDuration + ':' + formattedminutesDuration + ':' + formattedsecondsDuration;
		});
	}

	seekbar() {
		//for updating the seek bar
		var progress: any = document.getElementById('progress');
		var progressBar: any = document.getElementById('progress-bar');
		var myVideo: any = document.getElementById('myVideo');

		progressBar.addEventListener('click', function(e) {

			var percent = e.offsetX / this.offsetWidth;
			myVideo.currentTime = percent * myVideo.duration;
			var progressPos = myVideo.currentTime / myVideo.duration;
			progress.style.width = progressPos * 100 + '%';
		});
	}

	toggleSubtitlesDisplay(subtitle: string) {
	
		this.subtitleLanguage = subtitle;
		this.openSubtitles = false;
	}

	updateVolume() {
		var slider = <HTMLInputElement>document.getElementById('volumeSlider');
		var myVideo: any = document.getElementById('myVideo');
		slider.value = myVideo.volume;
		var y: any = slider.value;
	
		y = y * 100;
		var color = 'linear-gradient(90deg, white ' + y + '%, rgba(0, 0, 0, 0.1) ' + y + '%)';
		slider.style.background = color;

		slider.addEventListener('mousemove', function() {
			var x: any = slider.value;
			myVideo.volume = x;
			x = x * 100;
			var color = 'linear-gradient(90deg, white ' + x + '%, rgba(0, 0, 0, 0.1) ' + x + '%)';
			slider.style.background = color;
		});
	}
}
