import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'admin-topbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <header class="admin-topbar">
      <div class="topbar-left">
        <button class="menu-toggle" (click)="onToggleSidebar()" *ngIf="isMobile">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <a routerLink="/" class="mobile-logo" *ngIf="isMobile">
          <img src="/assets/img/logo/logo.png" alt="QuickBox" style="max-width: 40px; height: auto;">
        </a>
        <h1 class="page-title">{{ getPageTitle() }}</h1>
        <div class="search-box" *ngIf="!isMobile">
          <input type="text" placeholder="Search..." class="search-input">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="search-icon">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </div>
      </div>
      <div class="topbar-right">
        <div class="account-menu">
          <div class="account-info">
            <div class="account-name">{{ currentUser?.fullName || currentUser?.email || 'Admin' }}</div>
            <div class="account-role">Administrator</div>
          </div>
          <div class="account-avatar" (click)="toggleAccountMenu()">
            <div class="avatar-circle">{{ getInitials() }}</div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="dropdown-icon">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <div class="account-dropdown" *ngIf="showAccountMenu" (click)="$event.stopPropagation()">
            <a routerLink="/" class="dropdown-item" (click)="closeAccountMenu()">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <span>Home</span>
            </a>
            <a href="#" class="dropdown-item" (click)="closeAccountMenu(); $event.preventDefault()">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>Profile</span>
            </a>
            <a href="#" class="dropdown-item" (click)="closeAccountMenu(); $event.preventDefault()">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"></path>
              </svg>
              <span>Settings</span>
            </a>
            <div class="dropdown-divider"></div>
            <a href="#" class="dropdown-item logout" (click)="handleLogout($event)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              <span>Logout</span>
            </a>
          </div>
        </div>
      </div>
    </header>
    <div *ngIf="showAccountMenu" class="account-menu-backdrop" (click)="closeAccountMenu()"></div>
  `,
  styles: [`
    .admin-topbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 80px;
      background: #FFFFFF;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 30px;
      z-index: 1100;
    }
    
    .topbar-left {
      display: flex;
      align-items: center;
      gap: 20px;
      flex: 1;
    }
    
    .menu-toggle {
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
      display: none;
      color: #050F24;
    }
    
    .mobile-logo {
      display: none;
    }
    
    .page-title {
      font-size: 20px;
      font-weight: 600;
      color: #050F24;
      margin: 0;
    }
    
    .search-box {
      position: relative;
      max-width: 330px;
      flex: 1;
      margin-left: 40px;
    }
    
    .search-input {
      width: 100%;
      padding: 10px 40px 10px 15px;
      border: 1px solid #E1E1E1;
      border-radius: 8px;
      font-size: 14px;
      outline: none;
      transition: border-color 0.3s;
    }
    
    .search-input:focus {
      border-color: #f15f22;
    }
    
    .search-icon {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: #6F757E;
    }
    
    .topbar-right {
      display: flex;
      align-items: center;
      gap: 20px;
    }
    
    .account-menu {
      position: relative;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .account-info {
      text-align: right;
      display: none;
    }
    
    .account-name {
      font-size: 14px;
      font-weight: 600;
      color: #050F24;
    }
    
    .account-role {
      font-size: 12px;
      color: #6F757E;
    }
    
    .account-avatar {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      padding: 8px;
      border-radius: 8px;
      transition: background 0.3s;
    }
    
    .account-avatar:hover {
      background: #F5F5F5;
    }
    
    .avatar-circle {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background: #f15f22;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 16px;
    }
    
    .dropdown-icon {
      color: #6F757E;
    }
    
    .account-dropdown {
      position: absolute;
      top: calc(100% + 10px);
      right: 0;
      background: #FFFFFF;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      min-width: 200px;
      padding: 8px 0;
      z-index: 1200;
    }
    
    .dropdown-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 20px;
      text-decoration: none;
      color: #050F24;
      font-size: 14px;
      transition: background 0.3s;
      cursor: pointer;
      user-select: none;
    }
    
    .dropdown-item:hover {
      background: #F5F5F5;
    }
    
    .dropdown-item.logout {
      color: #F54F5F;
    }
    
    .dropdown-item.logout:hover {
      background: #FDDCDF;
    }
    
    .dropdown-divider {
      height: 1px;
      background: #E1E1E1;
      margin: 8px 0;
    }
    
    .account-menu-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1199;
    }
    
    @media (max-width: 1200px) {
      .menu-toggle {
        display: block;
      }
      
      .mobile-logo {
        display: block;
      }
      
      .search-box {
        display: none;
      }
      
      .account-info {
        display: block;
      }
    }
    
    @media (max-width: 768px) {
      .admin-topbar {
        padding: 0 15px;
      }
      
      .page-title {
        font-size: 18px;
      }
      
      .account-info {
        display: none;
      }
    }
  `]
})
export class AdminTopbarComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();
  showAccountMenu = false;
  currentUser: any = null;
  isMobile = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.checkMobile();
    window.addEventListener('resize', () => this.checkMobile());
  }

  checkMobile(): void {
    this.isMobile = window.innerWidth <= 1200;
  }

  getPageTitle(): string {
    const url = this.router.url;
    if (url === '/admin') return 'Dashboard';
    if (url.includes('/users')) return 'Users';
    if (url.includes('/quotes')) return 'Quotes';
    if (url.includes('/video')) return 'Video';
    if (url.includes('/reports')) return 'Reports';
    return 'Admin Panel';
  }

  getInitials(): string {
    if (this.currentUser?.fullName) {
      const names = this.currentUser.fullName.split(' ');
      if (names.length >= 2) {
        return (names[0][0] + names[1][0]).toUpperCase();
      }
      return names[0][0].toUpperCase();
    }
    if (this.currentUser?.email) {
      return this.currentUser.email[0].toUpperCase();
    }
    return 'A';
  }

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  toggleAccountMenu(): void {
    this.showAccountMenu = !this.showAccountMenu;
  }

  closeAccountMenu(): void {
    this.showAccountMenu = false;
  }

  handleLogout(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.closeAccountMenu();
    this.logout();
  }

  logout(): void {
    this.authService.logout();
  }
}
