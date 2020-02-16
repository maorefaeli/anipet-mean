import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule } from "@angular/forms";
import { StoresComponent } from './stores/stores.component';
import { CookieService } from 'ngx-cookie-service';
import { SignInModule } from "./sign-in/sign-in.module";
import { HttpClientModule} from "@angular/common/http";
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    StoresComponent,
    HomeComponent,
    MapComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    SignInModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCMATjaKa93lheSTMFtmUvseVWcj1o61uw'
    })
  ],
  providers: [
    CookieService,
    HttpClientModule,
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
