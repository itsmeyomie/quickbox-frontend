import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-rider',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="min-height: 100vh; background: #f5f5f5; padding: 20px;">
      <div style="max-width: 1200px; margin: 0 auto;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
          <h1 style="color: #333;">Rider Portal</h1>
          <div>
            <span style="margin-right: 15px;">{{ currentUser?.fullName || currentUser?.email }}</span>
            <button (click)="logout()" style="padding: 8px 16px; background: #d32f2f; color: white; border: none; border-radius: 5px; cursor: pointer;">Logout</button>
          </div>
        </div>
        
        <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="margin-bottom: 20px;">My Tasks</h2>
          <div *ngIf="tasks.length === 0" style="text-align: center; padding: 40px; color: #999;">No tasks assigned</div>
          
          <div *ngFor="let task of tasks" style="border: 1px solid #ddd; padding: 20px; margin-bottom: 15px; border-radius: 5px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
              <div>
                <div style="font-weight: bold; font-size: 18px; margin-bottom: 5px;">{{ task.order?.trackingCode }}</div>
                <div style="color: #666; font-size: 14px;">
                  <div>Customer: {{ task.order?.receiverName }} ({{ task.order?.receiverPhone }})</div>
                  <div>Address: {{ task.order?.deliveryAddress }}</div>
                  <div *ngIf="task.order?.codAmount && task.order.codAmount > 0" style="color: #ff9800; font-weight: bold;">
                    COD: {{ task.order.codAmount | number:'1.2-2' }}
                  </div>
                </div>
              </div>
              <div style="text-align: right;">
                <div style="font-weight: bold; color: #667eea;">{{ task.status }}</div>
              </div>
            </div>
            
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
              <button *ngIf="task.status === 'ASSIGNED'" (click)="updateStatus(task.id, 'PICKED_UP')" style="padding: 8px 16px; background: #4caf50; color: white; border: none; border-radius: 5px; cursor: pointer;">Picked Up</button>
              <button *ngIf="task.status === 'PICKED_UP'" (click)="updateStatus(task.id, 'IN_TRANSIT')" style="padding: 8px 16px; background: #2196f3; color: white; border: none; border-radius: 5px; cursor: pointer;">In Transit</button>
              <button *ngIf="task.status === 'IN_TRANSIT'" (click)="updateStatus(task.id, 'ARRIVED')" style="padding: 8px 16px; background: #ff9800; color: white; border: none; border-radius: 5px; cursor: pointer;">Arrived</button>
              <button *ngIf="task.status === 'ARRIVED'" (click)="openPODModal(task)" style="padding: 8px 16px; background: #4caf50; color: white; border: none; border-radius: 5px; cursor: pointer;">Delivered</button>
              <button *ngIf="task.order?.codAmount && task.order.codAmount > 0 && task.status === 'DELIVERED' && !task.order.codCollected" (click)="openCODModal(task)" style="padding: 8px 16px; background: #9c27b0; color: white; border: none; border-radius: 5px; cursor: pointer;">Record COD</button>
              <button (click)="updateStatus(task.id, 'FAILED')" style="padding: 8px 16px; background: #f44336; color: white; border: none; border-radius: 5px; cursor: pointer;">Failed</button>
            </div>
          </div>
        </div>
        
        <!-- POD Modal -->
        <div *ngIf="showPODModal" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;">
          <div style="background: white; padding: 30px; border-radius: 10px; max-width: 500px; width: 90%;">
            <h3 style="margin-bottom: 20px;">Proof of Delivery</h3>
            <form (ngSubmit)="submitPOD()">
              <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px;">Receiver Name:</label>
                <input type="text" [(ngModel)]="podData.receiverName" name="receiverName" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
              </div>
              <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px;">Receiver Phone:</label>
                <input type="text" [(ngModel)]="podData.receiverPhone" name="receiverPhone" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
              </div>
              <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px;">Notes:</label>
                <textarea [(ngModel)]="podData.notes" name="notes" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; min-height: 80px;"></textarea>
              </div>
              <div style="display: flex; gap: 10px; justify-content: flex-end;">
                <button type="button" (click)="closePODModal()" style="padding: 10px 20px; background: #ccc; color: #333; border: none; border-radius: 5px; cursor: pointer;">Cancel</button>
                <button type="submit" style="padding: 10px 20px; background: #4caf50; color: white; border: none; border-radius: 5px; cursor: pointer;">Submit</button>
              </div>
            </form>
          </div>
        </div>
        
        <!-- COD Modal -->
        <div *ngIf="showCODModal" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;">
          <div style="background: white; padding: 30px; border-radius: 10px; max-width: 500px; width: 90%;">
            <h3 style="margin-bottom: 20px;">Record COD Collection</h3>
            <form (ngSubmit)="submitCOD()">
              <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px;">Amount Collected:</label>
                <input type="number" [(ngModel)]="codData.amount" name="amount" required step="0.01" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
              </div>
              <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px;">Payment Method:</label>
                <select [(ngModel)]="codData.paymentMethod" name="paymentMethod" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                  <option value="CASH">Cash</option>
                  <option value="MPESA">M-Pesa</option>
                </select>
              </div>
              <div style="margin-bottom: 15px;" *ngIf="codData.paymentMethod === 'MPESA'">
                <label style="display: block; margin-bottom: 5px;">M-Pesa Code:</label>
                <input type="text" [(ngModel)]="codData.mpesaCode" name="mpesaCode" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
              </div>
              <div style="display: flex; gap: 10px; justify-content: flex-end;">
                <button type="button" (click)="closeCODModal()" style="padding: 10px 20px; background: #ccc; color: #333; border: none; border-radius: 5px; cursor: pointer;">Cancel</button>
                <button type="submit" style="padding: 10px 20px; background: #9c27b0; color: white; border: none; border-radius: 5px; cursor: pointer;">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `
})
export class RiderComponent implements OnInit {
  tasks: any[] = [];
  currentUser: any = null;
  showPODModal = false;
  showCODModal = false;
  selectedTask: any = null;
  podData: any = { receiverName: '', receiverPhone: '', notes: '' };
  codData: any = { amount: 0, paymentMethod: 'CASH', mpesaCode: '' };
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadTasks();
    setInterval(() => this.loadTasks(), 30000);
  }

  loadTasks(): void {
    this.http.get<any[]>(`${this.apiUrl}/rider/tasks`).subscribe({
      next: (data) => {
        this.tasks = data;
      },
      error: (err) => console.error('Error loading tasks:', err)
    });
  }

  updateStatus(taskId: number, status: string): void {
    this.http.post(`${this.apiUrl}/rider/tasks/${taskId}/status`, { status }).subscribe({
      next: () => {
        this.loadTasks();
      },
      error: (err) => {
        console.error('Error updating status:', err);
        alert('Failed to update status. Please try again.');
      }
    });
  }

  openPODModal(task: any): void {
    this.selectedTask = task;
    this.podData = {
      receiverName: task.order?.receiverName || '',
      receiverPhone: task.order?.receiverPhone || '',
      notes: ''
    };
    this.showPODModal = true;
  }

  closePODModal(): void {
    this.showPODModal = false;
    this.selectedTask = null;
    this.podData = { receiverName: '', receiverPhone: '', notes: '' };
  }

  submitPOD(): void {
    if (!this.selectedTask) return;
    
    const formData = new FormData();
    formData.append('receiverName', this.podData.receiverName);
    if (this.podData.receiverPhone) formData.append('receiverPhone', this.podData.receiverPhone);
    if (this.podData.notes) formData.append('notes', this.podData.notes);
    
    this.http.post(`${this.apiUrl}/rider/tasks/${this.selectedTask.id}/pod`, formData).subscribe({
      next: () => {
        this.updateStatus(this.selectedTask.id, 'DELIVERED');
        this.closePODModal();
      },
      error: (err) => {
        console.error('Error submitting POD:', err);
        alert('Failed to submit POD. Please try again.');
      }
    });
  }

  openCODModal(task: any): void {
    this.selectedTask = task;
    this.codData = {
      amount: task.order?.codAmount || 0,
      paymentMethod: 'CASH',
      mpesaCode: ''
    };
    this.showCODModal = true;
  }

  closeCODModal(): void {
    this.showCODModal = false;
    this.selectedTask = null;
    this.codData = { amount: 0, paymentMethod: 'CASH', mpesaCode: '' };
  }

  submitCOD(): void {
    if (!this.selectedTask) return;
    
    this.http.post(`${this.apiUrl}/rider/tasks/${this.selectedTask.id}/cod`, this.codData).subscribe({
      next: () => {
        this.closeCODModal();
        this.loadTasks();
      },
      error: (err) => {
        console.error('Error submitting COD:', err);
        alert('Failed to record COD. Please try again.');
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
}


