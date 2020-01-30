import { Component , OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MarverApiService } from './marver-api.service';
import { NgxSpinnerService } from 'ngx-spinner';

declare var require: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  //title = 'Marvel Explorer';
  baseUrl: string = 'https://gateway.marvel.com/v1/public/comics?';
  apiKey: string = 'fe15c799917208fdc527ef1df6af9699';
  privateKey: string = 'be38de6f1069f339414e4a6b3640f7bd2a2cb1fc';
  ts: number = new Date().getTime();
  md5 = require('blueimp-md5');
  hash: any = this.md5(this.ts+this.privateKey+this.apiKey);
  queryUrl: string = '&query=';
  apiURL: string = this.baseUrl + "ts=" + this.ts + "&apikey=" + this.apiKey + "&hash=" + this.hash;

  comics: any = [];
  offset: number;
  totalComics: number;
  notscrolly: boolean = true;
  notEmptyPost: boolean = true;

  constructor(private httpClient: HttpClient, private apiService: MarverApiService, private spinner: NgxSpinnerService){}

  ngOnInit(){
    this.loadInitComics();
  }  

  //load the Initial 20 comics
  loadInitComics() {
    this.apiService.getComics().subscribe((res)=>{
      console.log(res);
      this.comics = res['data']['results'];
      this.offset = res['data']['offset'];
      this.totalComics = res['data']['total'];
    });
  }

  onScrollDown() { 
    console.log('scrolled down!!');
    this.scrollRules(this.offset);
    this.offset = this.offset+20;
  }

  onScrollUp() {
    console.log('scrolled up!!');
    this.scrollRules(this.offset);
    this.offset = this.offset-20;
  }

  scrollRules(offset) {
    // Remove if statement if you want to run infinity
    if (this.notscrolly && this.notEmptyPost) {
      this.spinner.show();
      this.notscrolly = false;
      this.loadNextComics(offset, this.totalComics);
    }
  }

  // load the next Offset comics
  loadNextComics(offset: number,totalComics: number) {
    // call http request
    this.httpClient.get(this.apiURL+"&offset="+offset)
    .subscribe( (res: any) => {

      console.log(res);
      this.comics = res['data']['results'];

      const newComics = this.comics[0];
      //console.log(newComics);
      this.spinner.hide();

      if (offset >= totalComics ) {
        this.notEmptyPost =  false;
      }
      // add newly fetched comics to the existing post
      this.comics = this.comics.concat(newComics);

      this.notscrolly = true;

      console.log(offset);
      console.log(totalComics);
    });
  }
}
