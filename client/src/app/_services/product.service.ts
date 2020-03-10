import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Product from '../_models/product';

@Injectable({ providedIn: 'root' })
export class ProductService {
    constructor(private http: HttpClient) { }

    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    search(name?: string, maxWeight?: number, maxPrice?: number) {
        const params = {};
        if (name) {
            params['name'] = name;
        }
        if (maxWeight) {
            params['maxWeight'] = maxWeight;
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
        return this.http.delete(`api/products/${id}`);
    }

    edit(product: Product) {
        return this.http.post(
            `api/products/${product.id}`,
            JSON.stringify({ name: product.name, weight: product.weight, price: product.price }),
            this.httpOptions
        );
    }
}
