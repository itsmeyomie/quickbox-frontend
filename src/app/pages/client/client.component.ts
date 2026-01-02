import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="min-height: 100vh; background: #f5f5f5; padding: 20px;">
      <div style="max-width: 1200px; margin: 0 auto;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
          <h1 style="color: #333;">Client Portal</h1>
          <div>
            <span style="margin-right: 15px;">{{ currentUser?.fullName || currentUser?.email }}</span>
            <button (click)="logout()" style="padding: 8px 16px; background: #d32f2f; color: white; border: none; border-radius: 5px; cursor: pointer;">Logout</button>
          </div>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
          <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="margin-bottom: 20px;">Create Order</h2>
            <form (ngSubmit)="createOrder()" #orderForm="ngForm">
              <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px;">Pickup Address:</label>
                <input type="text" [(ngModel)]="orderData.pickupAddress" name="pickupAddress" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
              </div>
              <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px;">Delivery Address:</label>
                <input type="text" [(ngModel)]="orderData.deliveryAddress" name="deliveryAddress" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
              </div>
              <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px;">Receiver Name:</label>
                <input type="text" [(ngModel)]="orderData.receiverName" name="receiverName" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
              </div>
              <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px;">Receiver Phone:</label>
                <input type="text" [(ngModel)]="orderData.receiverPhone" name="receiverPhone" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
              </div>
              <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px;">Package Description:</label>
                <textarea [(ngModel)]="orderData.packageDescription" name="packageDescription" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; min-height: 80px;"></textarea>
              </div>
              <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px;">Package Weight (kg):</label>
                <input type="number" [(ngModel)]="orderData.packageWeight" name="packageWeight" step="0.1" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
              </div>
              <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px;">COD Amount (optional):</label>
                <input type="number" [(ngModel)]="orderData.codAmount" name="codAmount" step="0.01" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
              </div>
              <button type="submit" [disabled]="!orderForm.valid || creating" style="width: 100%; padding: 12px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">
                {{ creating ? 'Creating...' : 'Create Order' }}
              </button>
            </form>
            <div *ngIf="newTrackingCode" style="margin-top: 15px; padding: 15px; background: #e8f5e9; border-radius: 5px;">
              <strong>Order Created!</strong><br>
              Tracking Code: <strong>{{ newTrackingCode }}</strong>
            </div>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="margin-bottom: 20px;">My Orders</h2>
            <div style="max-height: 600px; overflow-y: auto;">
              <div *ngFor="let order of orders" style="border: 1px solid #ddd; padding: 15px; margin-bottom: 10px; border-radius: 5px;">
                <div style="font-weight: bold; margin-bottom: 5px;">{{ order.trackingCode }}</div>
                <div style="color: #666; font-size: 14px; margin-bottom: 10px;">
                  <div>Status: <strong>{{ order.status }}</strong></div>
                  <div>Destination: {{ order.deliveryAddress }}</div>
                  <div *ngIf="order.codAmount && order.codAmount > 0">COD: {{ order.codAmount | number:'1.2-2' }}</div>
                  <div>Created: {{ order.createdAt | date:'short' }}</div>
                </div>
                <button (click)="trackOrder(order.trackingCode)" style="padding: 5px 10px; background: #2196f3; color: white; border: none; border-radius: 3px; cursor: pointer;">Track</button>
              </div>
              <div *ngIf="orders.length === 0" style="text-align: center; padding: 40px; color: #999;">No orders yet</div>
            </div>
          </div>
        </div>
        
        <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="margin-bottom: 20px;">COD Summary</h2>
          <div *ngIf="codSummary" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
            <div>
              <div style="color: #666; font-size: 14px;">Collected</div>
              <div style="font-size: 24px; font-weight: bold; color: #4caf50;">{{ codSummary.collected | number:'1.2-2' }}</div>
            </div>
            <div>
              <div style="color: #666; font-size: 14px;">Pending Remittance</div>
              <div style="font-size: 24px; font-weight: bold; color: #ff9800;">{{ codSummary.pendingRemittance | number:'1.2-2' }}</div>
            </div>
            <div>
              <div style="color: #666; font-size: 14px;">Remitted</div>
              <div style="font-size: 24px; font-weight: bold; color: #2196f3;">{{ codSummary.remitted | number:'1.2-2' }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ClientComponent implements OnInit {
  orders: any[] = [];
  codSummary: any = null;
  currentUser: any = null;
  creating = false;
  newTrackingCode = '';
  orderData: any = {
    pickupAddress: '',
    deliveryAddress: '',
    receiverName: '',
    receiverPhone: '',
    packageDescription: '',
    packageWeight: null,
    codAmount: null
  };
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadOrders();
    this.loadCodSummary();
  }

  loadOrders(): void {
    this.http.get<any[]>(`${this.apiUrl}/client/orders`).subscribe({
      next: (data) => {
        this.orders = data;
      },
      error: (err) => console.error('Error loading orders:', err)
    });
  }

  loadCodSummary(): void {
    this.http.get<any>(`${this.apiUrl}/client/cod/summary`).subscribe({
      next: (data) => {
        this.codSummary = data;
      },
      error: (err) => console.error('Error loading COD summary:', err)
    });
  }

  createOrder(): void {
    this.creating = true;
    this.newTrackingCode = '';
    
    this.http.post<any>(`${this.apiUrl}/client/orders`, this.orderData).subscribe({
      next: (data) => {
        this.creating = false;
        this.newTrackingCode = data.trackingCode;
        this.orderData = {
          pickupAddress: '',
          deliveryAddress: '',
          receiverName: '',
          receiverPhone: '',
          packageDescription: '',
          packageWeight: null,
          codAmount: null
        };
        this.loadOrders();
      },
      error: (err) => {
        this.creating = false;
        console.error('Error creating order:', err);
        alert('Failed to create order. Please try again.');
      }
    });
  }

  trackOrder(trackingCode: string): void {
    window.open(`/track/${trackingCode}`, '_blank');
  }

  logout(): void {
    this.authService.logout();
  }
}


