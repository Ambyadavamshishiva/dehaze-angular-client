import {Component, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import {HttpClientService, Product} from '../service/http-client.service';
import {ModalService} from '../service/modal.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  bodyText: string;
  products: string[];
  product: Product = new Product('', 0);
  editProduct: Product = new Product('', 0);

  constructor(private httpClientService: HttpClientService, private modalService: ModalService) {
  }
  ngOnInit() {

    this.httpClientService.getProducts().subscribe(
      response => this.handleSuccessfulResponse(response),
    );

  }


  handleSuccessfulResponse(response) {
    this.products = response;
  }

  createProduct(product: Product) {
    if (product.description && product.price) {
      this.httpClientService.createProduct(product).subscribe(data => this.httpClientService.getProducts().subscribe(
        response => this.handleSuccessfulResponse(response),
      ));
    }
  }

  deleteProduct(productId: string | Product) {
    this.httpClientService.deleteProduct(productId).subscribe(data => this.httpClientService.getProducts().subscribe(
      response => this.handleSuccessfulResponse(response),
    ));
  }

  updateProduct(product: Product) {
    if (product.description && product.price) {
      this.httpClientService.updateProduct(product).subscribe(data => this.httpClientService.getProducts().subscribe(
        response => this.handleSuccessfulResponse(response),
      ));
    }
  }

  getProductById(productId: string) {
    this.httpClientService.getProductById(productId).subscribe(data => this.editProduct = data);
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
