# In-Memory Store Migration Guide

## Overview

The application has been migrated to use in-memory stores as the primary data source, with Firebase acting only as a persistence/sync layer.

## What Changed

### ✅ Completed

1. **In-Memory Stores Created**:
   - `QuotesStoreService` - Manages quotes
   - `OrdersStoreService` - Manages orders/packages
   - `UsersStoreService` - Manages users
   - `ContactsStoreService` - Manages contacts

2. **Services Updated**:
   - `DataService` - Main interface (replaces FirebaseDataService)
   - `ApiService` - Now uses DataService
   - `FirebaseSyncService` - Handles Firebase sync
   - `AppInitService` - Initializes sync on startup

3. **Components Updated**:
   - `admin-dashboard.component.ts` - Uses DataService
   - `admin-quotes.component.ts` - Uses DataService with reactive updates
   - `app.component.ts` - Initializes sync on startup

### ⚠️ Needs Update

The following components still need to be updated to use `DataService` instead of direct HTTP calls or `FirebaseDataService`:

- `admin-users.component.ts`
- `admin-video.component.ts`
- `admin-reports.component.ts`
- `client.component.ts`
- `rider.component.ts`
- `dispatcher.component.ts`

## Migration Pattern

### Before (Old Way)

```typescript
// Direct HTTP call
this.http.get(`${this.apiUrl}/quotes`).subscribe({
  next: (data) => { /* ... */ }
});

// Or FirebaseDataService
this.firebaseData.getQuotes().then(quotes => { /* ... */ });
```

### After (New Way)

```typescript
// Use DataService (works with in-memory store)
this.dataService.getQuotes().subscribe({
  next: (quotes) => { /* ... */ }
});

// Or reactive (real-time updates)
this.dataService.getQuotes$().subscribe(quotes => {
  this.quotes = quotes;
});
```

## Component Update Checklist

For each component that needs updating:

1. **Replace imports**:
   ```typescript
   // Remove
   import { FirebaseDataService } from '../../services/firebase-data.service';
   import { HttpClient } from '@angular/common/http';
   import { environment } from '../../../environments/environment';
   
   // Add
   import { DataService } from '../../services/data.service';
   ```

2. **Update constructor**:
   ```typescript
   // Remove
   constructor(
     private http: HttpClient,
     private firebaseData: FirebaseDataService,
     // ...
   ) {}
   
   // Add
   constructor(
     private dataService: DataService,
     // ...
   ) {}
   ```

3. **Update methods**:
   - Replace HTTP calls with DataService methods
   - Replace async/await with observables where needed
   - Use reactive observables for real-time updates

## Example: Updating Admin Users Component

### Before:
```typescript
loadUsers(): void {
  this.http.get<any[]>(url).subscribe({
    next: (data) => { this.users = data; }
  });
}
```

### After:
```typescript
loadUsers(): void {
  this.dataService.getUsers(this.selectedRole).subscribe({
    next: (users) => { this.users = users; }
  });
  
  // Or reactive (auto-updates):
  this.dataService.getUsers$().subscribe(users => {
    if (!this.selectedRole) {
      this.users = users;
    } else {
      this.users = users.filter(u => u.role === this.selectedRole);
    }
  });
}
```

## DataService Methods Reference

### Quotes
- `submitQuoteRequest(quote)` → Observable
- `getQuotes(status?)` → Observable
- `getQuotes$()` → Observable (reactive)
- `updateQuoteStatus(id, status)` → Promise
- `deleteQuote(id)` → Promise
- `getPendingQuotesCount()` → number

### Orders
- `createPackage(data)` → Promise
- `getClientOrders(clientId)` → Observable
- `getOrderById(id)` → Observable
- `getOrderByTrackingCode(code)` → Observable
- `trackPackage(trackingId)` → Observable
- `updatePackageStatus(id, status)` → Promise
- `getCodSummary(clientId)` → Observable
- `getOrders$()` → Observable (reactive)

### Users
- `getUsers(role?)` → Observable
- `getUsers$()` → Observable (reactive)
- `createUser(userData)` → Promise
- `updateUser(id, updates)` → Promise
- `disableUser(id)` → Promise

### Admin
- `getAdminKPIs()` → Observable (computed from in-memory data)

### Rider
- `getRiderTasks(riderId)` → Observable
- `updateTaskStatus(id, status)` → Promise
- `submitPOD(id, data, image?)` → Promise
- `submitCOD(id, data)` → Promise

### Dispatcher
- `getCreatedOrders()` → Observable
- `getLiveOrders()` → Observable
- `getAvailableRiders()` → Observable
- `assignOrder(orderId, riderId)` → Promise

### Reports
- `getOrdersReport(fromDate?, toDate?)` → Observable
- `getCodReport(fromDate?, toDate?)` → Observable

## Benefits After Migration

1. **Instant Operations**: All data operations are instant (no network latency)
2. **Offline Support**: App works completely offline
3. **Real-time Updates**: Reactive observables provide automatic updates
4. **Better Performance**: KPIs computed from memory (no Firebase queries)
5. **Cost Savings**: Minimal Firebase reads/writes

## Testing

After updating components:

1. Test with Firebase connected (normal operation)
2. Test with Firebase disconnected (offline mode)
3. Test data persistence (reload page)
4. Verify real-time updates work
5. Check console for errors

## Notes

- Old `FirebaseDataService` is kept for reference but not used
- All Firebase operations happen in background via `FirebaseSyncService`
- Data persists in localStorage (survives page reloads)
- Sync happens automatically on app startup
