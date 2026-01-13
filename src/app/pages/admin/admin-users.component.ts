import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { FirebaseAuthService } from '../../services/firebase-auth.service';
import { UsersStoreService } from '../../services/stores/users-store.service';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-page">
      <div class="page-header">
        <div class="filters">
          <select [(ngModel)]="selectedRole" (change)="loadUsers()" class="filter-select">
            <option value="">All Roles</option>
            <option value="ADMIN">Admin</option>
            <option value="DISPATCHER">Dispatcher</option>
            <option value="RIDER">Rider</option>
            <option value="CLIENT">Client</option>
          </select>
          <button (click)="showAddUser = true" class="add-btn">Add User</button>
        </div>
      </div>
        
      <div class="content-card">
        <table class="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let user of users">
              <td>{{ user.fullName || 'N/A' }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.role }}</td>
              <td>
                <span class="status-badge" [class.active]="user.active" [class.inactive]="!user.active">
                  {{ user.active ? 'Active' : 'Disabled' }}
                </span>
              </td>
              <td>
                <button (click)="editUser(user)" class="btn-edit">Edit</button>
                <button (click)="disableUser(user.id)" *ngIf="user.active" class="btn-disable">Disable</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
        
      <!-- Add User Modal -->
      <div *ngIf="showAddUser" class="modal-overlay">
        <div class="modal-content">
          <h3 class="modal-title">Add New User</h3>
          <form (ngSubmit)="createUser()" #userForm="ngForm">
            <div class="form-group">
              <label>Full Name:</label>
              <input type="text" [(ngModel)]="newUser.fullName" name="fullName" required class="form-input">
            </div>
            
            <div class="form-group">
              <label>Email:</label>
              <input type="email" [(ngModel)]="newUser.email" name="email" required class="form-input">
            </div>
            
            <div class="form-group">
              <label>Phone (optional):</label>
              <input type="text" [(ngModel)]="newUser.phone" name="phone" class="form-input">
            </div>
            
            <div class="form-group">
              <label>Password:</label>
              <input type="password" [(ngModel)]="newUser.password" name="password" required class="form-input">
            </div>
            
            <div class="form-group">
              <label>Role:</label>
              <select [(ngModel)]="newUser.role" name="role" required class="form-input">
                <option value="">-- Select Role --</option>
                <option value="ADMIN">Admin</option>
                <option value="DISPATCHER">Dispatcher</option>
                <option value="RIDER">Rider</option>
                <option value="CLIENT">Client</option>
              </select>
            </div>
            
            <div class="form-group" *ngIf="newUser.role === 'RIDER'">
              <label>Zone:</label>
              <input type="text" [(ngModel)]="newUser.zone" name="zone" class="form-input">
            </div>
            
            <div class="form-group" *ngIf="newUser.role === 'RIDER'">
              <label>Vehicle:</label>
              <input type="text" [(ngModel)]="newUser.vehicle" name="vehicle" class="form-input">
            </div>
            
            <div class="form-group">
              <label>Branch (optional):</label>
              <input type="text" [(ngModel)]="newUser.branch" name="branch" class="form-input">
            </div>
            
            <div *ngIf="errorMessage" class="error-message">
              {{ errorMessage }}
            </div>
            
            <div class="modal-actions">
              <button type="button" (click)="closeAddUserModal()" class="btn-cancel">Cancel</button>
              <button type="submit" [disabled]="!userForm.valid || creating" class="btn-submit">
                {{ creating ? 'Creating...' : 'Create User' }}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <!-- Edit User Modal -->
      <div *ngIf="showEditUser" class="modal-overlay">
        <div class="modal-content">
          <h3 class="modal-title">Edit User</h3>
          <form (ngSubmit)="updateUser()" #editForm="ngForm">
            <div class="form-group">
              <label>Full Name:</label>
              <input type="text" [(ngModel)]="editUserData.fullName" name="editFullName" required class="form-input">
            </div>
            
            <div class="form-group">
              <label>Email:</label>
              <input type="email" [(ngModel)]="editUserData.email" name="editEmail" required class="form-input">
            </div>
            
            <div class="form-group">
              <label>Phone (optional):</label>
              <input type="text" [(ngModel)]="editUserData.phone" name="editPhone" class="form-input">
            </div>
            
            <div class="form-group">
              <label>New Password (leave blank to keep current):</label>
              <input type="password" [(ngModel)]="editUserData.password" name="editPassword" placeholder="Leave blank to keep current password" class="form-input">
            </div>
            
            <div class="form-group">
              <label>Role:</label>
              <select [(ngModel)]="editUserData.role" name="editRole" required class="form-input">
                <option value="ADMIN">Admin</option>
                <option value="DISPATCHER">Dispatcher</option>
                <option value="RIDER">Rider</option>
                <option value="CLIENT">Client</option>
              </select>
            </div>
            
            <div class="form-group" *ngIf="editUserData.role === 'RIDER'">
              <label>Zone:</label>
              <input type="text" [(ngModel)]="editUserData.zone" name="editZone" class="form-input">
            </div>
            
            <div class="form-group" *ngIf="editUserData.role === 'RIDER'">
              <label>Vehicle:</label>
              <input type="text" [(ngModel)]="editUserData.vehicle" name="editVehicle" class="form-input">
            </div>
            
            <div class="form-group">
              <label>Branch (optional):</label>
              <input type="text" [(ngModel)]="editUserData.branch" name="editBranch" class="form-input">
            </div>
            
            <div class="form-group">
              <label class="checkbox-label">
                <input type="checkbox" [(ngModel)]="editUserData.active" name="editActive">
                <span>Active</span>
              </label>
            </div>
            
            <div *ngIf="errorMessage" class="error-message">
              {{ errorMessage }}
            </div>
            
            <div class="modal-actions">
              <button type="button" (click)="closeEditUserModal()" class="btn-cancel">Cancel</button>
              <button type="submit" [disabled]="!editForm.valid || updating" class="btn-update">
                {{ updating ? 'Updating...' : 'Update User' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-page {
      padding: 0;
    }
    
    .page-header {
      margin-bottom: 20px;
    }
    
    .filters {
      display: flex;
      gap: 10px;
      align-items: center;
    }
    
    .filter-select {
      padding: 8px 12px;
      border: 1px solid #E1E1E1;
      border-radius: 8px;
      font-size: 14px;
      outline: none;
    }
    
    .add-btn {
      padding: 8px 16px;
      background: #f15f22;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500;
      transition: background 0.3s;
    }
    
    .add-btn:hover {
      background: #d14a1a;
    }
    
    .content-card {
      background: #FFFFFF;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }
    
    .data-table {
      width: 100%;
      border-collapse: collapse;
    }
    
    .data-table th {
      padding: 12px;
      text-align: left;
      border-bottom: 2px solid #E1E1E1;
      color: #050F24;
      font-weight: 600;
      font-size: 14px;
    }
    
    .data-table td {
      padding: 12px;
      border-bottom: 1px solid #F5F5F5;
      color: #050F24;
      font-size: 14px;
    }
    
    .status-badge {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
    }
    
    .status-badge.active {
      background: #E8F5E9;
      color: #4caf50;
    }
    
    .status-badge.inactive {
      background: #FFEBEE;
      color: #f44336;
    }
    
    .btn-edit {
      padding: 6px 12px;
      background: #2196f3;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      margin-right: 5px;
      font-size: 12px;
    }
    
    .btn-disable {
      padding: 6px 12px;
      background: #f44336;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 12px;
    }
    
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2000;
    }
    
    .modal-content {
      background: white;
      padding: 30px;
      border-radius: 12px;
      max-width: 500px;
      width: 90%;
      max-height: 90vh;
      overflow-y: auto;
    }
    
    .modal-title {
      margin: 0 0 20px 0;
      color: #050F24;
      font-size: 20px;
      font-weight: 600;
    }
    
    .form-group {
      margin-bottom: 15px;
    }
    
    .form-group label {
      display: block;
      margin-bottom: 5px;
      font-weight: 500;
      color: #050F24;
      font-size: 14px;
    }
    
    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .form-input {
      width: 100%;
      padding: 10px;
      border: 1px solid #E1E1E1;
      border-radius: 8px;
      font-size: 14px;
      outline: none;
      transition: border-color 0.3s;
    }
    
    .form-input:focus {
      border-color: #f15f22;
    }
    
    .error-message {
      color: #F54F5F;
      margin-bottom: 15px;
      font-size: 14px;
    }
    
    .modal-actions {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
      margin-top: 20px;
    }
    
    .btn-cancel {
      padding: 10px 20px;
      background: #E1E1E1;
      color: #050F24;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500;
    }
    
    .btn-submit {
      padding: 10px 20px;
      background: #4caf50;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500;
    }
    
    .btn-update {
      padding: 10px 20px;
      background: #2196f3;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500;
    }
  `]
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
  constructor(
    private dataService: DataService,
    private firebaseAuth: FirebaseAuthService,
    private usersStore: UsersStoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    // Subscribe to users changes for real-time updates
    this.dataService.getUsers$().subscribe(users => {
      if (!this.selectedRole) {
        this.users = users;
      } else {
        this.users = users.filter(u => u.role === this.selectedRole);
      }
    });
  }

  loadUsers(): void {
    this.dataService.getUsers(this.selectedRole).subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (err) => {
        console.error('Error loading users:', err);
      }
    });
  }

  async createUser(): Promise<void> {
    if (this.creating) return;
    
    this.creating = true;
    this.errorMessage = '';
    
    try {
      // Create user in Firebase Auth (creates auth account)
      await this.firebaseAuth.createUser(this.newUser, this.newUser.password);
      
      // User data is now in UsersStore (added by FirebaseAuthService.createUser)
      // But ensure it's synced
      const createdUser = this.usersStore.getByEmail(this.newUser.email);
      if (createdUser) {
        // User already in store from FirebaseAuthService
        this.closeAddUserModal();
        this.loadUsers();
      } else {
        // Fallback: add to store manually
        this.usersStore.add({
          ...this.newUser,
          active: true,
          createdAt: new Date()
        });
        this.closeAddUserModal();
        this.loadUsers();
      }
    } catch (err: any) {
      this.creating = false;
      this.errorMessage = err.message || 'Failed to create user. Please check all fields and try again.';
      console.error('Error creating user:', err);
    } finally {
      this.creating = false;
    }
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

  async updateUser(): Promise<void> {
    if (this.updating) return;
    
    this.updating = true;
    this.errorMessage = '';
    
    try {
      const updateData: any = { ...this.editUserData };
      delete updateData.password; // Password handled separately if provided
      
      // Update in store (instant)
      await this.dataService.updateUser(this.editUserData.id!, updateData);
      
      // Update password if provided
      if (this.editUserData.password && this.editUserData.password.trim() !== '') {
        // Note: Password update requires Firebase Auth API
        // For now, we'll skip password updates via this interface
        // Users should reset password through Firebase Console or implement password reset flow
      }
      
      this.updating = false;
      this.closeEditUserModal();
      this.loadUsers();
    } catch (err: any) {
      this.updating = false;
      this.errorMessage = err.message || 'Failed to update user. Please check all fields and try again.';
      console.error('Error updating user:', err);
    }
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

  async disableUser(userId: string): Promise<void> {
    if (confirm('Are you sure you want to disable this user?')) {
      try {
        await this.dataService.disableUser(userId);
        this.loadUsers();
      } catch (err) {
        console.error('Error disabling user:', err);
        alert('Failed to disable user. Please try again.');
      }
    }
  }

}

