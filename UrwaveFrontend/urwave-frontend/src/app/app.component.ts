import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { LoadingService } from './services/loading.service';
import { Observable } from 'rxjs';
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CardModule,ButtonModule,RouterOutlet, MenubarModule,ProgressSpinnerModule,CommonModule,ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  loading$: Observable<boolean>;
  title = 'urwave-frontend';
  items: MenuItem[] | undefined;

  constructor(public router: Router, private loadingService: LoadingService) {
    this.loading$ = this.loadingService.loading$;
  }
  
  ngOnInit(): void {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => {
          this.router.navigate(['/']);
        }
      },
      {
        label: 'Product List',
        icon: 'pi pi-list',
        command: () => {
          this.router.navigate(['/product-list']);
        }
      }
    ]
  }

  goToProductList(){
    this.router.navigate(['/product-list'])
  }
}
