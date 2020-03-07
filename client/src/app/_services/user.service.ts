import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';

const USERNAME_COOKIE_NAME = 'user';

export const enum Role {
    Guest,
    User,
    Admin
}

interface User {
    username: string;
    role: Role;
}

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient, private cookieService: CookieService) { }

    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    register(username: string, password: string) {
        return this.http.post('api/users/register', JSON.stringify({ username, password}), this.httpOptions);
    }

    login(username: string, password: string) {
        return this.http.post<{isAdmin: true}>('api/login', JSON.stringify({ username, password}), this.httpOptions)
            .pipe(map(user => {
                const currentUser: User = {
                    username,
                    role: user.isAdmin ? Role.Admin : Role.User
                };
                this.cookieService.set(USERNAME_COOKIE_NAME, JSON.stringify(currentUser));
                return currentUser;
            }));
    }

    logout() {
        this.cookieService.delete(USERNAME_COOKIE_NAME);
        return this.http.get('api/logout');
    }

    currentUser(): User {
        const user: User = {
            username: '',
            role: Role.Guest,
        }
        const cookie = this.cookieService.get(USERNAME_COOKIE_NAME);
        if (!cookie) return user;

        return { ...user, ...JSON.parse(cookie) };
    }
}
