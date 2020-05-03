import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { UserService} from './_services/user.service';
import { Role } from './_models/user';
import { SocketService } from './_services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  temperature = '20';
  connectedClients = 1;
  private allNavLinks = [
    { path: 'home', label: 'Home', roles: [Role.Admin, Role.User, Role.Guest] },
    { path: 'orders', label: 'All Orders', roles: [Role.Admin] },
    { path: 'orders', label: 'My Orders', roles: [Role.User] },
    { path: 'products', label: 'Products', roles: [Role.Admin, Role.User, Role.Guest] },
    { path: 'stores', label: 'Stores', roles: [Role.Admin] },
    { path: 'statistics', label: 'Statistics', roles: [Role.Admin]},
    { path: 'account', label: 'My Account', roles: [Role.User] },
  ];

  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    private socketService: SocketService
  ) {
  }

  public get navLinks() {
    return this.allNavLinks.filter(link => link.roles.includes(this.userService.currentUser().role));
  }

  public isLoggedIn() {
    return this.userService.currentUser().role !== Role.Guest;
  }

  public getUsername() {
    return this.userService.currentUser().username;
  }

  public getWeather() {
    const response = this.httpClient.get("http://api.weatherstack.com/current?access_key=f383ca587405ad2203ac17c589d505f2&query=%22Tel%20Aviv%22")
    response.subscribe((data: JSON) => this.temperature = data['current']['temperature']);
  }

  ngOnInit(): void {
    this.socketService.onConnectedClients().subscribe(data => this.connectedClients = data);
    // this.getWeather();
  }
}
