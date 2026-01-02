import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dispatcher',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="min-height: 100vh; background: #f5f5f5; padding: 20px;">
      <div style="max-width: 1400px; margin: 0 auto;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
          <h1 style="color: #333;">Dispatcher Portal</h1>
          <div>
            <span style="margin-right: 15px;">{{ currentUser?.fullName || currentUser?.email }}</span>
            <button (click)="logout()" style="padding: 8px 16px; background: #d32f2f; color: white; border: none; border-radius: 5px; cursor: pointer;">Logout</button>
          </div>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="margin-bottom: 20px;">Queue (CREATED Orders)</h2>
            <div style="max-height: 600px; overflow-y: auto;">
              <div *ngFor="let order of createdOrders" style="border: 1px solid #ddd; padding: 15px; margin-bottom: 10px; border-radius: 5px;">
                <div style="font-weight: bold; margin-bottom: 5px;">{{ order.trackingCode }}</div>
                <div style="color: #666; font-size: 14px; margin-bottom: 10px;">
                  <div>Client: {{ order.client?.email || 'N/A' }}</div>
                  <div>Destination: {{ order.deliveryAddress }}</div>
                </div>
                <button (click)="openAssignModal(order)" style="padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">Assign Rider</button>
              </div>
              <div *ngIf="createdOrders.length === 0" style="text-align: center; padding: 40px; color: #999;">No orders in queue</div>
            </div>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="margin-bottom: 20px;">Live Orders (Assigned & In-Transit)</h2>
            <div style="max-height: 600px; overflow-y: auto;">
              <div *ngFor="let order of liveOrders" style="border: 1px solid #ddd; padding: 15px; margin-bottom: 10px; border-radius: 5px;">
                <div style="font-weight: bold; margin-bottom: 5px;">{{ order.trackingCode }}</div>
                <div style="color: #666; font-size: 14px;">
                  <div>Status: <strong>{{ order.status }}</strong></div>
                  <div>Rider: {{ order.rider?.email || 'Unassigned' }}</div>
                  <div>Destination: {{ order.deliveryAddress }}</div>
                </div>
              </div>
              <div *ngIf="liveOrders.length === 0" style="text-align: center; padding: 40px; color: #999;">No active orders</div>
            </div>
          </div>
        </div>
        
        <!-- Assign Modal -->
        <div *ngIf="showAssignModal" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;">
          <div style="background: white; padding: 30px; border-radius: 10px; max-width: 500px; width: 90%; max-height: 80vh; overflow-y: auto;">
            <h3 style="margin-bottom: 20px;">Assign Rider to {{ selectedOrder?.trackingCode }}</h3>
            <div style="margin-bottom: 20px;">
              <label style="display: block; margin-bottom: 5px;">Select Rider:</label>
              <select [(ngModel)]="selectedRiderId" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                <option value="">-- Select Rider --</option>
                <option *ngFor="let rider of availableRiders" [value]="rider.id">{{ rider.fullName || rider.email }} ({{ rider.zone || 'No zone' }})</option>
              </select>
            </div>
            <div style="display: flex; gap: 10px; justify-content: flex-end;">
              <button (click)="closeAssignModal()" style="padding: 10px 20px; background: #ccc; color: #333; border: none; border-radius: 5px; cursor: pointer;">Cancel</button>
              <button (click)="assignRider()" [disabled]="!selectedRiderId" style="padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">Assign</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DispatcherComponent implements OnInit {
  createdOrders: any[] = [];
  liveOrders: any[] = [];
  availableRiders: any[] = [];
  showAssignModal = false;
  selectedOrder: any = null;
  selectedRiderId: number | null = null;
  currentUser: any = null;
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadCreatedOrders();
    this.loadLiveOrders();
    this.loadAvailableRiders();
    // Auto-refresh every 30 seconds
    setInterval(() => {
      this.loadCreatedOrders();
      this.loadLiveOrders();
    }, 30000);
  }

  loadCreatedOrders(): void {
    this.http.get<any[]>(`${this.apiUrl}/dispatch/orders?status=CREATED`).subscribe({
      next: (data) => {
        this.createdOrders = data;
      },
      error: (err) => console.error('Error loading orders:', err)
    });
  }

  loadLiveOrders(): void {
    this.http.get<any[]>(`${this.apiUrl}/dispatch/live`).subscribe({
      next: (data) => {
        this.liveOrders = data;
      },
      error: (err) => console.error('Error loading live orders:', err)
    });
  }

  loadAvailableRiders(): void {
    this.http.get<any[]>(`${this.apiUrl}/dispatch/riders?available=true`).subscribe({
      next: (data) => {
        this.availableRiders = data;
      },
      error: (err) => console.error('Error loading riders:', err)
    });
  }

  openAssignModal(order: any): void {
    this.selectedOrder = order;
    this.selectedRiderId = null;
    this.showAssignModal = true;
    this.loadAvailableRiders();
  }

  closeAssignModal(): void {
    this.showAssignModal = false;
    this.selectedOrder = null;
    this.selectedRiderId = null;
  }

  assignRider(): void {
    if (!this.selectedOrder || !this.selectedRiderId) return;
    
    this.http.post(`${this.apiUrl}/dispatch/assign`, {
      orderId: this.selectedOrder.id,
      riderId: this.selectedRiderId
    }).subscribe({
      next: () => {
        this.closeAssignModal();
        this.loadCreatedOrders();
        this.loadLiveOrders();
      },
      error: (err) => {
        console.error('Error assigning rider:', err);
        alert('Failed to assign rider. Please try again.');
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
}


