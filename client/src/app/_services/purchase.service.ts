import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Purchase from '../_models/purchase';

@Injectable({ providedIn: 'root' })
export class PurchaseService {
    constructor(private http: HttpClient) { }

    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    get() {
        return this.http.get<Purchase[]>('api/purchases');
    }

    add(productId: string) {
        return this.http.post<Purchase>('api/purchases/add', JSON.stringify({ productId }), this.httpOptions);
    }
}
