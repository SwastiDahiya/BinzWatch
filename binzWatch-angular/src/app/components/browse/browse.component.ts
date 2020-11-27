import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import {Movies} from '../../models/movies';
import {MovieService} from '../../services/movie.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  sticky = false;
  subs: Subscription[] = [];
  trending: Movies;
  popular: Movies;
  topRated: Movies;
  originals: Movies;
  nowPlaying: Movies;

  sliderConfig = {
    slidesToShow: 7,
    slidesToScroll: 2,
    arrows: true,
    autoplay: false,
  };

  @ViewChild('stickHeader',{static:false}) header: ElementRef;
  headerBGUrl: string;

  constructor(
    private movie: MovieService,
    private httpService:HttpService,
    private authService:AuthService
    ) {
  }

  trendingArray:Movies ={
    page: 0,
    total_results: 0,
    dates: null,
    total_pages: 0,
    type:'trending',
    results:[
      {
      popularity: 0,
      vote_count: 0,
      video: true,
      poster_path:'https://images-na.ssl-images-amazon.com/images/I/91a9Ez60pmL._AC_SY679_.jpg',
      id: 1,
      adult: true,
      backdrop_path: '',
      original_language: '',
      original_title: '',
      genre_ids:null,
      title: 'Dunkirk',
      vote_average:0,
      overview: '',
      release_date: '2017',
      mediaUrl:'http://binzwatchftp.ddns.net/Hollywood/Others/Dunkirk%20(2017)/Dunkirk.2017.1080p.BluRay.x264-[YTS.AG].mp4'
     },
     {
      popularity: 0,
      vote_count: 0,
      video: true,
      poster_path:'https://cdn.shopify.com/s/files/1/1416/8662/products/revenant_2016_french_original_film_art_5000x.jpg?v=1569071797',
      id: 2,
      adult: true,
      backdrop_path: '',
      original_language: '',
      original_title: '',
      genre_ids:null,
      title: 'The Revenant',
      vote_average:0,
      overview: '',
      release_date: '2016',
      mediaUrl:'http://binzwatchftp.ddns.net/Hollywood/Others/The%20Revenant%20(2015)%20[1080p]%20[YTS.AG]/The.Revenant.2015.1080p.BluRay.x264-[YTS.AG].mp4'
     },
     {
      popularity: 0,
      vote_count: 0,
      video: true,
      poster_path:'https://i.pinimg.com/originals/26/ee/c3/26eec32582fabc16d00cb64f37f2a393.jpg',
      id: 3,
      adult: true,
      backdrop_path: '',
      original_language: '',
      original_title: '',
      genre_ids:null,
      title: 'Interstellar',
      vote_average:0,
      overview: '',
      release_date: '2014',
      mediaUrl:'http://binzwatchftp.ddns.net/Hollywood/Others/Interstellar%20(2014)/Interstellar.2014.720p.BluRay.x264.YIFY.mp4'
     },
     {
      popularity: 0,
      vote_count: 0,
      video: true,
      poster_path:'https://ih1.redbubble.net/image.445865633.0482/flat,750x,075,f-pad,750x1000,f8f8f8.jpg',
      id: 4,
      adult: true,
      backdrop_path: '',
      original_language: '',
      original_title: '',
      genre_ids:null,
      title: 'Annabelle creation',
      vote_average:0,
      overview: '',
      release_date: '2017',
      mediaUrl:'http://binzwatchftp.ddns.net/Hollywood/Others/Annabelle%20Creation%20(2017)/Annabelle.Creation.2017.1080p.BluRay.x264-[YTS.AG].mp4'
     },
     {
      popularity: 0,
      vote_count: 0,
      video: true,
      poster_path:'https://i.pinimg.com/736x/64/2d/2b/642d2be82ad0a01cecf45a0cbd1bbab5.jpg',
      id: 5,
      adult: true,
      backdrop_path: '',
      original_language: '',
      original_title: '',
      genre_ids:null,
      title: 'How to train your dragon',
      vote_average:0,
      overview: '',
      release_date: '2010',
      mediaUrl:'http://binzwatchftp.ddns.net/Hollywood/Others/How%20To%20Train%20Your%20Dragon/How%20To%20Train%20Your%20Dragon%20(2010)%20BluRay%20720p%20x264%20[Dual%20Audio]%20[Hindi+English]--AbhinavRocks.mkv'
     },
     {
      popularity: 0,
      vote_count: 0,
      video: true,
      poster_path:'https://lumiere-a.akamaihd.net/v1/images/p_marvel_avengers_infinity_war_5ecb49d0.png',
      id: 6,
      adult: true,
      backdrop_path: '',
      original_language: '',
      original_title: '',
      genre_ids:null,
      title: 'Avengers Infinity war',
      vote_average:0,
      overview: '',
      release_date: '2018',
      mediaUrl:'http://binzwatchftp.ddns.net/Hollywood/Marvel/Avengers%20Infinity%20War%20(2018)/Avengers.Infinity.War.2018.1080p.WEBRip.x264-[YTS.AM].mp4'
     },
     {
      popularity: 0,
      vote_count: 0,
      video: true,
      poster_path:'http://binzwatchftp.ddns.net/Hollywood/Marvel/Ant-Man%20And%20The%20Wasp%20(2018)/p13798222_v_v8_af.jpg',
      id: 7,
      adult: true,
      backdrop_path: '',
      original_language: '',
      original_title: '',
      genre_ids:null,
      title: 'Ant-man and the wasp',
      vote_average:0,
      overview: '',
      release_date: '2017',
      mediaUrl:'http://binzwatchftp.ddns.net/Hollywood/Marvel/Ant-Man%20And%20The%20Wasp%20(2018)/Ant-Man.And.The.Wasp.2018.1080p.WEBRip.x264-[YTS.AM].mp4'
     },
     {
      popularity: 0,
      vote_count: 0,
      video: true,
      poster_path:'https://i.pinimg.com/736x/a6/ae/ea/a6aeea204f63a4cee5435fcdce2afdd2.jpg',
      id: 8,
      adult: true,
      backdrop_path: '',
      original_language: '',
      original_title: '',
      genre_ids:null,
      title: 'Fight Club',
      vote_average:0,
      overview: '',
      release_date: '1999',
      mediaUrl:'http://binzwatchftp.ddns.net/Hollywood/Others/Fight%20Club%20(1999)%20[1080p]/Fight.Club.10th.Anniversary.Edition.1999.1080p.BrRip.x264.YIFY.mp4'
     },
     {
      popularity: 0,
      vote_count: 0,
      video: true,
      poster_path:'https://i.pinimg.com/originals/49/0f/8a/490f8a2f9e8aaf38db71aa8b906e1908.jpg',
      id: 9,
      adult: true,
      backdrop_path: '',
      original_language: '',
      original_title: '',
      genre_ids:null,
      title: 'Whiplash',
      vote_average:0,
      overview: '',
      release_date: '2014',
      mediaUrl:'http://binzwatchftp.ddns.net/Hollywood/Others/Whiplash%20(2014)%20[1080p]/Whiplash.2014.1080p.BluRay.x264.YIFY.mp4'
     },
     {
      popularity: 0,
      vote_count: 0,
      video: true,
      poster_path:'http://binzwatchftp.ddns.net/Hollywood/Others/The%20Shawshank%20Redemption%20(1994)/ShawshankRedemptionMoviePoster.jpg',
      id: 10,
      adult: true,
      backdrop_path: '',
      original_language: '',
      original_title: '',
      genre_ids:null,
      title: 'The Shawshank Redemption',
      vote_average:0,
      overview: '',
      release_date: '1994',
      mediaUrl:'http://binzwatchftp.ddns.net/Hollywood/Others/The%20Shawshank%20Redemption%20(1994)/The.Shawshank.Redemption.1994.720p.BluRay.x264.YIFY.mp4'
     },
     {
      popularity: 0,
      vote_count: 0,
      video: true,
      poster_path:'https://cdn.shopify.com/s/files/1/0969/9128/products/Art_Poster_-_The_Martian_-_Hollywood_Collection_4045a75a-75a2-4a87-b532-7d2b27aab3c7.jpg?v=1481890103',
      id: 11,
      adult: true,
      backdrop_path: '',
      original_language: '',
      original_title: '',
      genre_ids:null,
      title: 'The Martian',
      vote_average:0,
      overview: '',
      release_date: '2015',
      mediaUrl:'http://binzwatchftp.ddns.net/Hollywood/Others/The%20Martian%20(2015)/The.Martian%20(2015).mp4'
     }
    ]
    }
  ngOnInit(): void {
  
    this.subs.push(this.movie.getTrending().subscribe(data => {
      this.trending = data;
      console.log(this.trending.results[0])
      this.headerBGUrl = 'https://image.tmdb.org/t/p/original' + this.trending.results[0].backdrop_path;
    }));
    
    this.subs.push(this.movie.getPopularMovies().subscribe(data => this.popular = data));
    this.subs.push(this.movie.getTopRated().subscribe(data => this.topRated = data));
    this.subs.push(this.movie.getOriginals().subscribe(data => this.originals = data));
    this.subs.push(this.movie.getNowPlaying().subscribe(data => this.nowPlaying = data));

  }

  ngOnDestroy(): void {
    this.subs.map(s => s.unsubscribe());
  }

  @HostListener('window:scroll', ['$event'])
  // tslint:disable-next-line:typedef
  handleScroll() {
    const windowScroll = window.pageYOffset;

    if (windowScroll >= this.header.nativeElement.offsetHeight) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }

  signOut(){
    this.authService.signOut();
  }

}
