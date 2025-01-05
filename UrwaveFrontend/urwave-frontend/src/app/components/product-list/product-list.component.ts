import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmationService, MessageService, Message } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [TableModule, ConfirmDialogModule, MessagesModule, ToastModule, ToolbarModule, TagModule, RatingModule, CommonModule, ButtonModule, IconFieldModule, InputIconModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  providers: [ConfirmationService]
})
export class ProductListComponent implements OnInit {
  products!: Product[];
  loading: boolean = true;
  messages: Message[] = [];


  constructor(private productService: ProductService, private router: Router, private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.productService.getProducts().pipe(
      catchError((error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to fetch products. Please try again later.',
          life: 5000
        });
        return of(null);
      }))
      .subscribe(data => {
        if (data) {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Products Fetched Successfuly',
            life: 3000
          });
          this.products = data;
          this.loading = false;
        }
        else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to fetch products. Please try again later.',
            life: 5000
          });
        }
      });
  }

  openNew() {
    this.router.navigate(['/product-form']);
  }

  editProduct(value: any) {
    this.router.navigate(['/product-form', value.id]);
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.deleteProduct(product.id).pipe(
          catchError((error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to delete product. Please try again later.',
              life: 5000
            });
            return of(null);
          }))
          .subscribe(data => {
            if (data) {
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
              this.products = this.products.filter(val => val.id !== product.id);
            }
            else {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to delete product. Please try again later.',
                life: 5000
              });
            }
          });

      }
    });
  }
}
