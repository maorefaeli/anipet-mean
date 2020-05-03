import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface DataPoint {
    x: string;
    t: number;
}

@Injectable({ providedIn: 'root' })
export class StatisticsService {
    constructor(private http: HttpClient) { }

    orders(days: number) {
        return this.http.get<Array<DataPoint>>('api/stats/orders', { params: { days: String(days)} });
    }

    products(days: number) {
        return this.http.get<Array<DataPoint>>('api/stats/products', { params: { days: String(days)} });
    }
}
