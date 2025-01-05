import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, Message } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast'; 
import { TableModule } from 'primeng/table';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-product-form',
  standalone: true,
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  styles: [`
    :host ::ng-deep .p-dialog .product-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
    }
`],
  imports: [FormsModule,TableModule, MessagesModule, ToastModule,DialogModule, CommonModule, ConfirmDialogModule, ButtonModule,InputTextModule,InputNumberModule, InputTextareaModule],
  providers: [ConfirmationService]
})
export class ProductFormComponent implements OnInit {
  messages: Message[] = [];
  productDialog!: boolean;
  product: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    createdDate: new Date()
  };
  
  editMode: boolean = false;
  submitted!: boolean;

  constructor(
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.editMode = true;
        
        this.productService.getProduct(params['id'])
          .subscribe(product => this.product = product);

          this.productDialog = true;
      }
      else{
        this.openNew()
      }
    });
  }

  openNew() {
    this.product = {
      id: 0,
      name: '',
      description: '',
      price: 0,
      imageUrl: '',
      createdDate: new Date()
    };
    this.submitted = false;
    this.productDialog = true;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
    this.onDialogClose(false);
  }

  isFormValid(): boolean {
    return !!(
      this.product.name?.trim() &&
      this.product.name.length <= 100 &&
      this.product.description?.trim() &&
      this.product.description.length <= 500 &&
      this.product.price > 0
    );
  }

  saveProduct() {
    this.submitted = true;
  
    if (this.isFormValid()) {
      if (this.product.id) {
        this.productService.updateProduct(this.product.id, this.product)
          .pipe(
            catchError((error) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to update product. Please try again later.',
                life: 5000
              });
              return of(null);
            })
          )
          .subscribe((data) => {
            if (data) {
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Product Updated',
                life: 3000
              });
              this.productDialog = false;
              this.onDialogClose(false);
            }
            else{
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to update product. Please try again later.',
                life: 5000
              });
            }
          });
      } else {
        this.productService.createProduct(this.product)
          .pipe(
            catchError((error) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to create product. Please try again later.',
                life: 5000
              });
              return of(null);
            })
          )
          .subscribe((data) => {
            if (data) {
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Product Created',
                life: 3000
              });
              this.productDialog = false;
              this.onDialogClose(false);
            }
            else{
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to create product. Please try again later.',
                life: 5000
              });
            }
          });
      }
    }
  }
  

  onDialogClose(event: boolean){
    if (!event) {
      this.router.navigate(['/product-list']);
  }
  }
}