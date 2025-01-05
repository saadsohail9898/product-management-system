import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { CreateProduct } from '../models/create-product';
import { LoadingService } from './loading.service';
import { catchError, finalize } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // private apiUrl = 'https://localhost:44370/api/products';
  private apiUrl = `${environment.apiUrl}/products`

  constructor(private http: HttpClient, private loadingService: LoadingService) {}

  getProducts(): Observable<Product[]> {
    this.loadingService.startLoading(); 
    return this.http.get<Product[]>(this.apiUrl).pipe(
      finalize(() => {
        this.loadingService.stopLoading();
      }),
      catchError((error) => {
        this.loadingService.stopLoading();
        throw error;
      })
    );
  }

  getProduct(id: number): Observable<Product> {
    this.loadingService.startLoading(); 
    return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(
      finalize(() => {
        this.loadingService.stopLoading();  
      }),
      catchError((error) => {
        this.loadingService.stopLoading();  
        throw error;  
      })
    );
  }

  createProduct(product: CreateProduct): Observable<Product> {
    this.loadingService.startLoading(); 
    return this.http.post<Product>(this.apiUrl, product).pipe(
      finalize(() => {
        this.loadingService.stopLoading();  
      }),
      catchError((error) => {
        this.loadingService.stopLoading();  
        throw error;  
      })
    );
  }

  updateProduct(id: number, product: CreateProduct): Observable<Product> {
    this.loadingService.startLoading(); 
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product).pipe(
      finalize(() => {
        this.loadingService.stopLoading();  
      }),
      catchError((error) => {
        this.loadingService.stopLoading();  
        throw error;  
      })
    );
  }

  deleteProduct(id: number): Observable<void> {
    this.loadingService.startLoading(); 
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      finalize(() => {
        this.loadingService.stopLoading();  
      }),
      catchError((error) => {
        this.loadingService.stopLoading();  
        throw error;  
      })
    );
  }
}
