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
                <label style="display: block; margin-bottom: 5px; font-weight: 600;">Pickup Address <span style="color: red;">*</span>:</label>
                <input type="text" [(ngModel)]="orderData.pickupAddress" name="pickupAddress" 
                       required minlength="5"
                       style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;"
                       #pickupAddressField="ngModel"
                       [style.border-color]="pickupAddressField.invalid && pickupAddressField.touched ? '#dc3545' : '#ddd'">
                <div *ngIf="pickupAddressField.invalid && pickupAddressField.touched" style="color: red; font-size: 12px; margin-top: 5px;">
                  <div *ngIf="pickupAddressField.errors?.['required']">Pickup address is required</div>
                  <div *ngIf="pickupAddressField.errors?.['minlength']">Address must be at least 5 characters</div>
                </div>
              </div>
              <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: 600;">Delivery Address <span style="color: red;">*</span>:</label>
                <input type="text" [(ngModel)]="orderData.deliveryAddress" name="deliveryAddress" 
                       required minlength="5"
                       style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;"
                       #deliveryAddressField="ngModel"
                       [style.border-color]="deliveryAddressField.invalid && deliveryAddressField.touched ? '#dc3545' : '#ddd'">
                <div *ngIf="deliveryAddressField.invalid && deliveryAddressField.touched" style="color: red; font-size: 12px; margin-top: 5px;">
                  <div *ngIf="deliveryAddressField.errors?.['required']">Delivery address is required</div>
                  <div *ngIf="deliveryAddressField.errors?.['minlength']">Address must be at least 5 characters</div>
                </div>
              </div>
              <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: 600;">Receiver Name <span style="color: red;">*</span>:</label>
                <input type="text" [(ngModel)]="orderData.receiverName" name="receiverName" 
                       required minlength="2" pattern="[a-zA-Z\s]+"
                       style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;"
                       #receiverNameField="ngModel"
                       [style.border-color]="receiverNameField.invalid && receiverNameField.touched ? '#dc3545' : '#ddd'">
                <div *ngIf="receiverNameField.invalid && receiverNameField.touched" style="color: red; font-size: 12px; margin-top: 5px;">
                  <div *ngIf="receiverNameField.errors?.['required']">Receiver name is required</div>
                  <div *ngIf="receiverNameField.errors?.['minlength']">Name must be at least 2 characters</div>
                  <div *ngIf="receiverNameField.errors?.['pattern']">Name can only contain letters and spaces</div>
                </div>
              </div>
              <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: 600;">Receiver Phone <span style="color: red;">*</span>:</label>
                <input type="tel" [(ngModel)]="orderData.receiverPhone" name="receiverPhone" 
                       required pattern="[0-9+\s\-()]+" minlength="10"
                       style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;"
                       #receiverPhoneField="ngModel"
                       [style.border-color]="receiverPhoneField.invalid && receiverPhoneField.touched ? '#dc3545' : '#ddd'">
                <div *ngIf="receiverPhoneField.invalid && receiverPhoneField.touched" style="color: red; font-size: 12px; margin-top: 5px;">
                  <div *ngIf="receiverPhoneField.errors?.['required']">Receiver phone is required</div>
                  <div *ngIf="receiverPhoneField.errors?.['minlength']">Phone must be at least 10 digits</div>
                  <div *ngIf="receiverPhoneField.errors?.['pattern']">Please enter a valid phone number</div>
                </div>
              </div>
              <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: 600;">Package Description <span style="color: red;">*</span>:</label>
                <textarea [(ngModel)]="orderData.packageDescription" name="packageDescription" 
                          required minlength="5"
                          style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; min-height: 80px;"
                          #packageDescriptionField="ngModel"
                          [style.border-color]="packageDescriptionField.invalid && packageDescriptionField.touched ? '#dc3545' : '#ddd'"></textarea>
                <div *ngIf="packageDescriptionField.invalid && packageDescriptionField.touched" style="color: red; font-size: 12px; margin-top: 5px;">
                  <div *ngIf="packageDescriptionField.errors?.['required']">Package description is required</div>
                  <div *ngIf="packageDescriptionField.errors?.['minlength']">Description must be at least 5 characters</div>
                </div>
              </div>
              <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: 600;">Package Weight (kg) <span style="color: red;">*</span>:</label>
                <input type="number" [(ngModel)]="orderData.packageWeight" name="packageWeight" 
                       required step="0.1" min="0.1"
                       style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;"
                       #packageWeightField="ngModel"
                       [style.border-color]="packageWeightField.invalid && packageWeightField.touched ? '#dc3545' : '#ddd'">
                <div *ngIf="packageWeightField.invalid && packageWeightField.touched" style="color: red; font-size: 12px; margin-top: 5px;">
                  <div *ngIf="packageWeightField.errors?.['required']">Package weight is required</div>
                  <div *ngIf="packageWeightField.errors?.['min']">Weight must be greater than 0</div>
                </div>
              </div>
              <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: 600;">COD Amount (optional):</label>
                <input type="number" [(ngModel)]="orderData.codAmount" name="codAmount" 
                       step="0.01" min="0"
                       style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
              </div>
              <button type="submit" [disabled]="!orderForm.valid || creating" style="width: 100%; padding: 12px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">
                {{ creating ? 'Creating...' : 'Create Order' }}
              </button>
              <div *ngIf="!orderForm.valid && orderForm.touched" style="color: red; font-size: 12px; margin-top: 10px;">
                Please fill in all required fields correctly
              </div>
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
    // Validate all required fields
    if (!this.orderData.pickupAddress || this.orderData.pickupAddress.trim().length < 5) {
      alert('Pickup address is required and must be at least 5 characters');
      return;
    }

    if (!this.orderData.deliveryAddress || this.orderData.deliveryAddress.trim().length < 5) {
      alert('Delivery address is required and must be at least 5 characters');
      return;
    }

    if (!this.orderData.receiverName || this.orderData.receiverName.trim().length < 2) {
      alert('Receiver name is required and must be at least 2 characters');
      return;
    }

    if (!this.orderData.receiverPhone || this.orderData.receiverPhone.replace(/\s/g, '').length < 10) {
      alert('Receiver phone is required and must be at least 10 digits');
      return;
    }

    if (!this.orderData.packageDescription || this.orderData.packageDescription.trim().length < 5) {
      alert('Package description is required and must be at least 5 characters');
      return;
    }

    if (!this.orderData.packageWeight || this.orderData.packageWeight <= 0) {
      alert('Package weight is required and must be greater than 0');
      return;
    }

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


