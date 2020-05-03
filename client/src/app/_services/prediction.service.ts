import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Product from '../_models/product';

@Injectable({ providedIn: 'root' })
export class PredictionService {
    constructor(private http: HttpClient) { }

    getProduct() {
        return this.http.get<Product>('api/predictions');
    }
}
