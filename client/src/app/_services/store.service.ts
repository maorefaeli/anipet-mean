import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Store from '../_models/store';

@Injectable({ providedIn: 'root' })
export class StoreService {
    constructor(private http: HttpClient) { }

    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    get() {
        return this.http.get<Store[]>('api/stores');
    }

    add(name: string, lng: number, lat: number) {
        return this.http.post<Store>('api/stores/add', JSON.stringify({ name, lng, lat }), this.httpOptions);
    }
}
