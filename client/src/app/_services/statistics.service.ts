import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class StatisticsService {
    constructor(private http: HttpClient) { }

    orders(days: number) {
        return this.http.get<Array<{date: string; count: number}>>('api/stats/orders', { params: { days: String(days)} });
    }

    products(days: number) {
        return this.http.get<Array<{product: string; count: number}>>('api/stats/products', { params: { days: String(days)} });
    }
}
