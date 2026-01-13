import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

interface NavItem {
  title: string;
  path: string;
  icon: string;
}

@Component({
  selector: 'admin-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <aside class="admin-sidebar" [class.mobile-open]="mobileOpen">
      <div class="sidebar-logo">
        <a routerLink="/" class="logo-link">
          <img src="/assets/img/logo/logo.png" alt="QuickBox" style="max-width: 100%; height: auto;">
        </a>
      </div>
      
      <nav class="sidebar-nav">
        <ul class="nav-list">
          <li *ngFor="let item of navItems" class="nav-item">
            <a [routerLink]="item.path" 
               routerLinkActive="active"
               [routerLinkActiveOptions]="{exact: item.path === '/admin'}"
               class="nav-link"
               (click)="closeMobileSidebar()">
              <span class="nav-icon" [innerHTML]="getIconSvg(item.icon)"></span>
              <span class="nav-text">{{ item.title }}</span>
            </a>
          </li>
        </ul>
      </nav>
      
      <div class="sidebar-footer">
        <button class="logout-btn" (click)="logout()">
          <span class="nav-icon" [innerHTML]="getIconSvg('logout')"></span>
          <span class="nav-text">Log out</span>
        </button>
      </div>
    </aside>
    <div *ngIf="mobileOpen" class="sidebar-backdrop" (click)="closeMobileSidebar()"></div>
  `,
  styles: [`
    .admin-sidebar {
      width: 278px;
      background: #FFFFFF;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      position: fixed;
      left: 0;
      top: 80px;
      height: calc(100vh - 80px);
      display: flex;
      flex-direction: column;
      z-index: 1000;
      overflow-y: auto;
      margin: 15px;
      border-radius: 20px;
    }
    
    .sidebar-logo {
      padding: 25px 20px;
      border-bottom: 1px solid #E1E1E1;
      position: sticky;
      top: 0;
      background: #FFFFFF;
      z-index: 10;
    }
    
    .logo-link {
      display: block;
      text-decoration: none;
    }
    
    .sidebar-nav {
      flex: 1;
      padding: 20px 10px;
      overflow-y: auto;
    }
    
    .nav-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .nav-item {
      margin: 5px 0;
    }
    
    .nav-link, .logout-btn {
      display: flex;
      align-items: center;
      padding: 12px 20px;
      text-decoration: none;
      color: #6F757E;
      border-radius: 12px;
      transition: all 0.3s ease;
      cursor: pointer;
      border: none;
      background: none;
      width: 100%;
      font-size: 14px;
      font-weight: 500;
    }
    
    .nav-link:hover, .logout-btn:hover {
      background: #F5F5F5;
      color: #050F24;
    }
    
    .nav-link.active {
      background: #f15f22;
      color: #FFFFFF;
    }
    
    .nav-link.active .nav-icon {
      color: #FFFFFF;
    }
    
    .nav-icon {
      width: 24px;
      height: 24px;
      margin-right: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: inherit;
    }
    
    .nav-text {
      flex: 1;
    }
    
    .sidebar-footer {
      padding: 20px 10px;
      border-top: 1px solid #E1E1E1;
      position: sticky;
      bottom: 0;
      background: #FFFFFF;
    }
    
    .logout-btn {
      color: #F54F5F;
    }
    
    .logout-btn:hover {
      background: #FDDCDF;
      color: #F54F5F;
    }
    
    .sidebar-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      z-index: 999;
    }
    
    @media (max-width: 1200px) {
      .admin-sidebar {
        transform: translateX(-100%);
        transition: transform 0.3s ease;
        margin: 0;
        border-radius: 0;
        top: 0;
        height: 100vh;
      }
      
      .admin-sidebar.mobile-open {
        transform: translateX(0);
      }
    }
  `]
})
export class AdminSidebarComponent {
  @Input() mobileOpen = false;
  @Output() closeSidebar = new EventEmitter<void>();

  navItems: NavItem[] = [
    { title: 'Dashboard', path: '/admin', icon: 'home' },
    { title: 'Users', path: '/admin/users', icon: 'users' },
    { title: 'Quotes', path: '/admin/quotes', icon: 'quotes' },
    { title: 'Video', path: '/admin/video', icon: 'video' },
    { title: 'Reports', path: '/admin/reports', icon: 'reports' }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  closeMobileSidebar(): void {
    this.closeSidebar.emit();
  }

  logout(): void {
    this.authService.logout();
  }

  getIconSvg(icon: string): string {
    const icons: { [key: string]: string } = {
      home: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>',
      users: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
      quotes: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>',
      video: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>',
      reports: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>',
      logout: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>'
    };
    return icons[icon] || '';
  }
}
