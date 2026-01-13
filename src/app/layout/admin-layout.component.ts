import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AdminSidebarComponent } from './admin-sidebar.component';
import { AdminTopbarComponent } from './admin-topbar.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AdminSidebarComponent, AdminTopbarComponent],
  template: `
    <div class="admin-layout">
      <admin-topbar (toggleSidebar)="toggleMobileSidebar()"></admin-topbar>
      <div class="admin-layout-container">
        <admin-sidebar [mobileOpen]="mobileOpen" (closeSidebar)="closeMobileSidebar()"></admin-sidebar>
        <main class="admin-main-content">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .admin-layout {
      min-height: 100vh;
      background: #FFF4EA;
      display: flex;
      flex-direction: column;
    }
    
    .admin-layout-container {
      display: flex;
      flex: 1;
      margin-top: 80px;
    }
    
    .admin-main-content {
      flex: 1;
      padding: 30px;
      margin-left: 278px;
      transition: margin-left 0.3s ease;
    }
    
    @media (max-width: 1200px) {
      .admin-main-content {
        margin-left: 0;
      }
    }
  `]
})
export class AdminLayoutComponent implements OnInit {
  mobileOpen = false;

  toggleMobileSidebar(): void {
    this.mobileOpen = !this.mobileOpen;
  }

  closeMobileSidebar(): void {
    this.mobileOpen = false;
  }

  ngOnInit(): void {}
}
