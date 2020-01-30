import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { tap } from 'rxjs/operators';
// import { Comic } from './comic';

declare var require: any;

@Injectable({
  providedIn: 'root'
})
export class MarverApiService {

  baseUrl: string = 'https://gateway.marvel.com/v1/public/comics?';
  apiKey: string = 'fe15c799917208fdc527ef1df6af9699';
  privateKey: string = 'be38de6f1069f339414e4a6b3640f7bd2a2cb1fc';
  ts: number = new Date().getTime();
  
  md5 = require('blueimp-md5');
  hash: any = this.md5(this.ts+this.privateKey+this.apiKey);
  queryUrl: string = '&query=';
  apiURL: string = this.baseUrl + "ts=" + this.ts + "&apikey=" + this.apiKey + "&hash=" + this.hash;

  constructor(private httpClient: HttpClient) {}

  public getComics(){
    return this.httpClient.get(this.apiURL);
  }

}
