import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class Product {
  constructor(
    public description: string,
    public price: number,
  ) {}

}

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getProducts() {
    return this.httpClient.get<Product[]>('http://localhost:8080/products');
  }

  createProduct(product) {
    return this.httpClient.post('http://localhost:8080/products/create', product);
  }

  deleteProduct(id) {
    return this.httpClient.delete('http://localhost:8080/products/' + id);
  }

  updateProduct(product: Product) {
    return this.httpClient.put('http://localhost:8080/products/update', product);
  }

  getProductById(id) {
    return this.httpClient.get<Product>('http://localhost:8080/products/' + id);
  }
}
