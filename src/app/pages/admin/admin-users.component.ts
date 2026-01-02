import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div style="min-height: 100vh; background: #f5f5f5; padding: 20px;">
      <div style="max-width: 1200px; margin: 0 auto;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
          <h1 style="color: #333;">User Management</h1>
          <div>
            <span style="margin-right: 15px;">{{ currentUser?.fullName || currentUser?.email }}</span>
            <button (click)="logout()" style="padding: 8px 16px; background: #d32f2f; color: white; border: none; border-radius: 5px; cursor: pointer;">Logout</button>
          </div>
        </div>
        
        <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 20px;">
          <div style="display: flex; gap: 15px; margin-bottom: 20px;">
            <a [routerLink]="['/admin']" style="padding: 10px 20px; background: #e0e0e0; color: #333; text-decoration: none; border-radius: 5px;">Dashboard</a>
            <a [routerLink]="['/admin/users']" style="padding: 10px 20px; background: #667eea; color: white; text-decoration: none; border-radius: 5px;">Users</a>
            <a [routerLink]="['/admin/reports']" style="padding: 10px 20px; background: #e0e0e0; color: #333; text-decoration: none; border-radius: 5px;">Reports</a>
          </div>
          
          <div style="display: flex; gap: 10px; margin-bottom: 20px;">
            <select [(ngModel)]="selectedRole" (change)="loadUsers()" style="padding: 8px; border: 1px solid #ddd; border-radius: 5px;">
              <option value="">All Roles</option>
              <option value="ADMIN">Admin</option>
              <option value="DISPATCHER">Dispatcher</option>
              <option value="RIDER">Rider</option>
              <option value="CLIENT">Client</option>
            </select>
            <button (click)="showAddUser = true" style="padding: 8px 16px; background: #4caf50; color: white; border: none; border-radius: 5px; cursor: pointer;">Add User</button>
          </div>
        </div>
        
        <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="border-bottom: 2px solid #ddd;">
                <th style="padding: 12px; text-align: left;">Name</th>
                <th style="padding: 12px; text-align: left;">Email</th>
                <th style="padding: 12px; text-align: left;">Role</th>
                <th style="padding: 12px; text-align: left;">Status</th>
                <th style="padding: 12px; text-align: left;">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let user of users" style="border-bottom: 1px solid #eee;">
                <td style="padding: 12px;">{{ user.fullName || 'N/A' }}</td>
                <td style="padding: 12px;">{{ user.email }}</td>
                <td style="padding: 12px;">{{ user.role }}</td>
                <td style="padding: 12px;">
                  <span [style.color]="user.active ? '#4caf50' : '#f44336'">
                    {{ user.active ? 'Active' : 'Disabled' }}
                  </span>
                </td>
                <td style="padding: 12px;">
                  <button (click)="editUser(user)" style="padding: 5px 10px; background: #2196f3; color: white; border: none; border-radius: 3px; cursor: pointer; margin-right: 5px;">Edit</button>
                  <button (click)="disableUser(user.id)" *ngIf="user.active" style="padding: 5px 10px; background: #f44336; color: white; border: none; border-radius: 3px; cursor: pointer;">Disable</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Add User Modal -->
        <div *ngIf="showAddUser" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;">
          <div style="background: white; padding: 30px; border-radius: 10px; max-width: 500px; width: 90%; max-height: 90vh; overflow-y: auto;">
            <h3 style="margin-bottom: 20px;">Add New User</h3>
            <form (ngSubmit)="createUser()" #userForm="ngForm">
              <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Full Name:</label>
                <input type="text" [(ngModel)]="newUser.fullName" name="fullName" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
              </div>
              
              <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Email:</label>
                <input type="email" [(ngModel)]="newUser.email" name="email" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
              </div>
              
              <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Phone (optional):</label>
                <input type="text" [(ngModel)]="newUser.phone" name="phone" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
              </div>
              
              <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Password:</label>
                <input type="password" [(ngModel)]="newUser.password" name="password" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
              </div>
              
              <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Role:</label>
                <select [(ngModel)]="newUser.role" name="role" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                  <option value="">-- Select Role --</option>
                  <option value="ADMIN">Admin</option>
                  <option value="DISPATCHER">Dispatcher</option>
                  <option value="RIDER">Rider</option>
                  <option value="CLIENT">Client</option>
                </select>
              </div>
              
              <div style="margin-bottom: 15px;" *ngIf="newUser.role === 'RIDER'">
                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Zone:</label>
                <input type="text" [(ngModel)]="newUser.zone" name="zone" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
              </div>
              
              <div style="margin-bottom: 15px;" *ngIf="newUser.role === 'RIDER'">
                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Vehicle:</label>
                <input type="text" [(ngModel)]="newUser.vehicle" name="vehicle" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
              </div>
              
              <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Branch (optional):</label>
                <input type="text" [(ngModel)]="newUser.branch" name="branch" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
              </div>
              
              <div *ngIf="errorMessage" style="color: #d32f2f; margin-bottom: 15px; font-size: 14px;">
                {{ errorMessage }}
              </div>
              
              <div style="display: flex; gap: 10px; justify-content: flex-end;">
                <button type="button" (click)="closeAddUserModal()" style="padding: 10px 20px; background: #ccc; color: #333; border: none; border-radius: 5px; cursor: pointer;">Cancel</button>
                <button type="submit" [disabled]="!userForm.valid || creating" style="padding: 10px 20px; background: #4caf50; color: white; border: none; border-radius: 5px; cursor: pointer;">
                  {{ creating ? 'Creating...' : 'Create User' }}
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <!-- Edit User Modal -->
        <div *ngIf="showEditUser" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;">
          <div style="background: white; padding: 30px; border-radius: 10px; max-width: 500px; width: 90%; max-height: 90vh; overflow-y: auto;">
            <h3 style="margin-bottom: 20px;">Edit User</h3>
            <form (ngSubmit)="updateUser()" #editForm="ngForm">
              <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Full Name:</label>
                <input type="text" [(ngModel)]="editUserData.fullName" name="editFullName" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
              </div>
              
              <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Email:</label>
                <input type="email" [(ngModel)]="editUserData.email" name="editEmail" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
              </div>
              
              <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Phone (optional):</label>
                <input type="text" [(ngModel)]="editUserData.phone" name="editPhone" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
              </div>
              
              <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: 500;">New Password (leave blank to keep current):</label>
                <input type="password" [(ngModel)]="editUserData.password" name="editPassword" placeholder="Leave blank to keep current password" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
              </div>
              
              <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Role:</label>
                <select [(ngModel)]="editUserData.role" name="editRole" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                  <option value="ADMIN">Admin</option>
                  <option value="DISPATCHER">Dispatcher</option>
                  <option value="RIDER">Rider</option>
                  <option value="CLIENT">Client</option>
                </select>
              </div>
              
              <div style="margin-bottom: 15px;" *ngIf="editUserData.role === 'RIDER'">
                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Zone:</label>
                <input type="text" [(ngModel)]="editUserData.zone" name="editZone" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
              </div>
              
              <div style="margin-bottom: 15px;" *ngIf="editUserData.role === 'RIDER'">
                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Vehicle:</label>
                <input type="text" [(ngModel)]="editUserData.vehicle" name="editVehicle" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
              </div>
              
              <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Branch (optional):</label>
                <input type="text" [(ngModel)]="editUserData.branch" name="editBranch" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
              </div>
              
              <div style="margin-bottom: 15px;">
                <label style="display: flex; align-items: center; gap: 10px;">
                  <input type="checkbox" [(ngModel)]="editUserData.active" name="editActive" style="width: auto;">
                  <span>Active</span>
                </label>
              </div>
              
              <div *ngIf="errorMessage" style="color: #d32f2f; margin-bottom: 15px; font-size: 14px;">
                {{ errorMessage }}
              </div>
              
              <div style="display: flex; gap: 10px; justify-content: flex-end;">
                <button type="button" (click)="closeEditUserModal()" style="padding: 10px 20px; background: #ccc; color: #333; border: none; border-radius: 5px; cursor: pointer;">Cancel</button>
                <button type="submit" [disabled]="!editForm.valid || updating" style="padding: 10px 20px; background: #2196f3; color: white; border: none; border-radius: 5px; cursor: pointer;">
                  {{ updating ? 'Updating...' : 'Update User' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AdminUsersComponent implements OnInit {
  users: any[] = [];
  selectedRole: string = '';
  showAddUser = false;
  showEditUser = false;
  currentUser: any = null;
  creating = false;
  updating = false;
  errorMessage = '';
  newUser: any = {
    fullName: '',
    email: '',
    phone: '',
    password: '',
    role: '',
    zone: '',
    vehicle: '',
    branch: '',
    active: true
  };
  editUserData: any = {
    id: null,
    fullName: '',
    email: '',
    phone: '',
    password: '',
    role: '',
    zone: '',
    vehicle: '',
    branch: '',
    active: true
  };
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadUsers();
  }

  loadUsers(): void {
    const url = this.selectedRole 
      ? `${this.apiUrl}/admin/users?role=${this.selectedRole}`
      : `${this.apiUrl}/admin/users`;
    
    this.http.get<any[]>(url).subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.error('Error loading users:', err);
      }
    });
  }

  createUser(): void {
    if (this.creating) return;
    
    this.creating = true;
    this.errorMessage = '';
    
    this.http.post<any>(`${this.apiUrl}/admin/users`, this.newUser).subscribe({
      next: (data) => {
        this.creating = false;
        this.closeAddUserModal();
        this.loadUsers();
      },
      error: (err) => {
        this.creating = false;
        this.errorMessage = err.error?.message || 'Failed to create user. Please check all fields and try again.';
        console.error('Error creating user:', err);
      }
    });
  }

  closeAddUserModal(): void {
    this.showAddUser = false;
    this.newUser = {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      role: '',
      zone: '',
      vehicle: '',
      branch: '',
      active: true
    };
    this.errorMessage = '';
  }

  editUser(user: any): void {
    this.editUserData = {
      id: user.id,
      fullName: user.fullName || '',
      email: user.email || '',
      phone: user.phone || '',
      password: '',
      role: user.role || '',
      zone: user.zone || '',
      vehicle: user.vehicle || '',
      branch: user.branch || '',
      active: user.active !== undefined ? user.active : true
    };
    this.showEditUser = true;
    this.errorMessage = '';
  }

  updateUser(): void {
    if (this.updating) return;
    
    this.updating = true;
    this.errorMessage = '';
    
    // Remove password if empty (don't update password)
    const updateData = { ...this.editUserData };
    if (!updateData.password || updateData.password.trim() === '') {
      delete updateData.password;
    }
    
    this.http.put<any>(`${this.apiUrl}/admin/users/${this.editUserData.id}`, updateData).subscribe({
      next: (data) => {
        this.updating = false;
        this.closeEditUserModal();
        this.loadUsers();
      },
      error: (err) => {
        this.updating = false;
        this.errorMessage = err.error?.message || 'Failed to update user. Please check all fields and try again.';
        console.error('Error updating user:', err);
      }
    });
  }

  closeEditUserModal(): void {
    this.showEditUser = false;
    this.editUserData = {
      id: null,
      fullName: '',
      email: '',
      phone: '',
      password: '',
      role: '',
      zone: '',
      vehicle: '',
      branch: '',
      active: true
    };
    this.errorMessage = '';
  }

  disableUser(userId: number): void {
    if (confirm('Are you sure you want to disable this user?')) {
      this.http.patch(`${this.apiUrl}/admin/users/${userId}/disable`, {}).subscribe({
        next: () => {
          this.loadUsers();
        },
        error: (err) => {
          console.error('Error disabling user:', err);
          alert('Failed to disable user. Please try again.');
        }
      });
    }
  }

  logout(): void {
    this.authService.logout();
  }
}

