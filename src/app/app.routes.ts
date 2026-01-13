import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { authGuard, roleGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./pages/login.component').then(m => m.LoginComponent) },
  { path: '', component: LayoutComponent, children: [
      { 
        path: '', 
        loadComponent: () => import('./pages/home.component').then(m => m.HomeComponent)
      },
      { 
        path: 'about', 
        loadComponent: () => import('./pages/about.component').then(m => m.AboutComponent)
      },
      { 
        path: 'services', 
        loadComponent: () => import('./pages/services.component').then(m => m.ServicesComponent)
      },
      { 
        path: 'blog', 
        loadComponent: () => import('./pages/blog.component').then(m => m.BlogComponent)
      },
      { 
        path: 'contact', 
        loadComponent: () => import('./pages/contact.component').then(m => m.ContactComponent)
      },
    ]
  },
  { 
    path: 'admin', 
    canActivate: [roleGuard(['ADMIN'])],
    loadComponent: () => import('./layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    children: [
      { 
        path: '', 
        loadComponent: () => import('./pages/admin/admin-dashboard.component').then(m => m.AdminDashboardComponent)
      },
      { 
        path: 'users', 
        loadComponent: () => import('./pages/admin/admin-users.component').then(m => m.AdminUsersComponent)
      },
      { 
        path: 'quotes', 
        loadComponent: () => import('./pages/admin/admin-quotes.component').then(m => m.AdminQuotesComponent)
      },
      { 
        path: 'video', 
        loadComponent: () => import('./pages/admin/admin-video.component').then(m => m.AdminVideoComponent)
      },
      { 
        path: 'reports', 
        loadComponent: () => import('./pages/admin/admin-reports.component').then(m => m.AdminReportsComponent)
      }
    ]
  },
  { 
    path: 'dispatch', 
    canActivate: [roleGuard(['DISPATCHER', 'ADMIN'])],
    loadComponent: () => import('./pages/dispatcher/dispatcher.component').then(m => m.DispatcherComponent)
  },
  { 
    path: 'rider', 
    canActivate: [roleGuard(['RIDER'])],
    loadComponent: () => import('./pages/rider/rider.component').then(m => m.RiderComponent)
  },
  { 
    path: 'client', 
    canActivate: [roleGuard(['CLIENT'])],
    loadComponent: () => import('./pages/client/client.component').then(m => m.ClientComponent)
  },
  { path: '**', redirectTo: '' }
];
