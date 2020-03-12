import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Product from '../_models/product';

@Injectable({ providedIn: 'root' })
export class ProductService {
    constructor(private http: HttpClient) { }

    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    search(name?: string, minWeight?: number, maxWeight?: number, minPrice?: number, maxPrice?: number) {
        const params = {};
        if (name) {
            params['name'] = name;
        }
        if (minWeight) {
            params['minWeight'] = minWeight;
        }
        if (maxWeight) {
            params['maxWeight'] = maxWeight;
        }
        if (minPrice) {
            params['minPrice'] = minPrice;
        }
        if (maxPrice) {
            params['maxPrice'] = maxPrice;
        }
        return this.http.get<Product[]>('api/products', { params });
    }

    add(name: string, weight: number, price: number) {
        return this.http.post<Product>('api/products/add', JSON.stringify({ name, weight, price }), this.httpOptions);
    }

    delete(id: string) {
        return this.http.delete<boolean>(`api/products/${id}`);
    }

    edit(id: string, name: string, weight: number, price: number) {
        return this.http.post<Product>(`api/products/${id}`, JSON.stringify({ name, weight, price }), this.httpOptions);
    }
}
