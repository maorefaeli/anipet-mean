import {Component, ContentChild, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'anipet';
  temperature = '20';

  constructor(private cookieService: CookieService, private httpClient: HttpClient) {
  }

  public getUsername() {
    return this.cookieService.get("username");
  }

  public getWeather() {
    const response = this.httpClient.get("http://api.weatherstack.com/current?access_key=f383ca587405ad2203ac17c589d505f2&query=%22Tel%20Aviv%22")
    response.subscribe((data: JSON) => this.temperature = data['current']['temperature']);
    let a = 0;
  }

  ngOnInit(): void {
    // this.getWeather();
  }
}
