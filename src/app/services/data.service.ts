import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { QuotesStoreService, Quote } from './stores/quotes-store.service';
import { OrdersStoreService, Order } from './stores/orders-store.service';
import { UsersStoreService, User } from './stores/users-store.service';
import { ContactsStoreService, Contact } from './stores/contacts-store.service';
import { FirebaseSyncService } from './firebase-sync.service';
import { ContactResponse, ContactData } from '../models/contact.model';
import { QuoteRequest, QuoteResponse, QuoteData } from '../models/quote.model';
import { PackageResponse, PackageData } from '../models/package.model';

/**
 * Main Data Service
 * Acts as the interface between UI components and in-memory stores
 * All UI components should use this service, NOT Firebase directly
 */
@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(
    private quotesStore: QuotesStoreService,
    private ordersStore: OrdersStoreService,
    private usersStore: UsersStoreService,
    private contactsStore: ContactsStoreService,
    private syncService: FirebaseSyncService
  ) {}

  // ============ CONTACTS ============

  /**
   * Submit contact form
   * Stores in memory first, then syncs to Firebase in background
   */
  submitContact(contact: any): Observable<ContactResponse> {
    const saved = this.contactsStore.add({
      ...contact,
      read: false,
      createdAt: new Date()
    });

    // Persist to Firebase in background (non-blocking)
    this.syncService.persistContact(saved).catch(err => {
      console.error('Background sync failed for contact:', err);
    });

    const contactData: ContactData = {
      id: parseInt(saved.id || '0', 10) || 0,
      name: saved.name,
      email: saved.email,
      phone: saved.phone,
      subject: saved.subject || '',
      message: saved.message,
      createdAt: saved.createdAt instanceof Date ? saved.createdAt.toISOString() : new Date().toISOString(),
      isRead: saved.read || false
    };

    return of({
      success: true,
      message: 'Contact submitted successfully',
      data: contactData
    });
  }

  /**
   * Get all contacts (from in-memory store)
   */
  getContacts(): Observable<Contact[]> {
    return of(this.contactsStore.getAll());
  }

  /**
   * Get unread contacts
   */
  getUnreadContacts(): Observable<Contact[]> {
    return of(this.contactsStore.getUnread());
  }

  // ============ QUOTES ============

  /**
   * Submit quote request
   * Stores in memory first, then syncs to Firebase in background
   */
  submitQuoteRequest(quote: QuoteRequest): Observable<QuoteResponse> {
    const saved = this.quotesStore.add({
      ...quote,
      status: 'PENDING',
      createdAt: new Date()
    });

    console.log('Quote added to in-memory store:', saved);

    // Persist to Firebase in background
    this.syncService.persistQuote(saved).then(() => {
      console.log('Quote synced to Firebase successfully');
    }).catch(err => {
      console.error('Background sync failed for quote:', err);
    });

    const quoteData: QuoteData = {
      id: parseInt(saved.id || '0', 10) || 0,
      name: saved.name,
      email: saved.email,
      contactNumber: saved.contactNumber,
      serviceType: saved.serviceType,
      pickupLocation: saved.pickupLocation,
      deliveryDestination: saved.deliveryDestination,
      packageWeight: saved.packageWeight,
      additionalServices: saved.additionalServices,
      status: saved.status,
      createdAt: saved.createdAt instanceof Date ? saved.createdAt.toISOString() : new Date().toISOString()
    };

    return of({
      success: true,
      data: quoteData,
      message: 'Quote request submitted successfully'
    });
  }

  /**
   * Get all quotes (from in-memory store)
   */
  getQuotes(status?: string): Observable<Quote[]> {
    if (status && status !== 'ALL') {
      return of(this.quotesStore.getByStatus(status as Quote['status']));
    }
    return of(this.quotesStore.getAll());
  }

  /**
   * Get quote by ID
   */
  getQuoteById(id: string): Observable<Quote | undefined> {
    return of(this.quotesStore.getById(id));
  }

  /**
   * Update quote status
   */
  async updateQuoteStatus(id: string, status: string): Promise<void> {
    const updated = this.quotesStore.updateStatus(id, status as Quote['status']);
    if (updated) {
      // Sync to Firebase in background
      this.syncService.persistQuote(updated).catch(err => {
        console.error('Background sync failed for quote update:', err);
      });
    }
  }

  /**
   * Delete quote
   */
  async deleteQuote(id: string): Promise<void> {
    this.quotesStore.remove(id);
    // Delete from Firebase in background
    this.syncService.deleteQuoteFromFirebase(id).catch(err => {
      console.error('Background sync failed for quote delete:', err);
    });
  }

  /**
   * Get pending quotes count
   */
  getPendingQuotesCount(): number {
    return this.quotesStore.getPendingCount();
  }

  // ============ PACKAGES/TRACKING ============

  /**
   * Track package by tracking code
   */
  trackPackage(trackingId: string): Observable<PackageResponse> {
    const order = this.ordersStore.getByTrackingCode(trackingId);
    
    if (!order) {
      return of({
        success: false,
        message: 'Package not found'
      });
    }

    const packageData: PackageData = {
      id: parseInt(order.id || '0', 10) || 0,
      trackingId: order.trackingCode,
      recipientName: order.receiverName,
      senderName: order.clientId, // Using clientId as sender identifier
      pickupAddress: order.pickupAddress,
      deliveryAddress: order.deliveryAddress,
      packageWeight: order.packageWeight?.toString(),
      status: order.status,
      createdAt: order.createdAt instanceof Date ? order.createdAt.toISOString() : new Date().toISOString(),
      estimatedDelivery: order.updatedAt instanceof Date ? order.updatedAt.toISOString() : undefined,
      deliveredAt: order.status === 'DELIVERED' && order.updatedAt ? 
        (order.updatedAt instanceof Date ? order.updatedAt.toISOString() : new Date().toISOString()) : 
        undefined
    };

    return of({
      success: true,
      data: packageData
    });
  }

  /**
   * Create package/order
   */
  async createPackage(packageData: any): Promise<{ trackingCode: string; id: string }> {
    const order = this.ordersStore.add({
      ...packageData,
      trackingCode: this.ordersStore.generateTrackingCode(),
      status: 'CREATED',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Persist to Firebase in background
    this.syncService.persistOrder(order).catch(err => {
      console.error('Background sync failed for order:', err);
    });

    return {
      trackingCode: order.trackingCode,
      id: order.id!
    };
  }

  /**
   * Update package status
   */
  async updatePackageStatus(id: string, status: string): Promise<void> {
    const updated = this.ordersStore.updateStatus(id, status as Order['status']);
    if (updated) {
      // Sync to Firebase in background
      this.syncService.persistOrder(updated).catch(err => {
        console.error('Background sync failed for order update:', err);
      });
    }
  }

  // ============ ORDERS ============

  /**
   * Get client orders
   */
  getClientOrders(clientId: string): Observable<Order[]> {
    return of(this.ordersStore.getByClient(clientId));
  }

  /**
   * Get COD summary
   */
  getCodSummary(clientId: string): Observable<any> {
    return of(this.ordersStore.getCodSummary(clientId));
  }

  /**
   * Get order by ID
   */
  getOrderById(id: string): Observable<Order | undefined> {
    return of(this.ordersStore.getById(id));
  }

  /**
   * Get order by tracking code
   */
  getOrderByTrackingCode(trackingCode: string): Observable<Order | undefined> {
    return of(this.ordersStore.getByTrackingCode(trackingCode));
  }

  // ============ ADMIN ============

  /**
   * Get admin KPIs (computed from in-memory data)
   */
  getAdminKPIs(): Observable<any> {
    const kpis = {
      ...this.ordersStore.getKPIs(),
      ridersActive: this.usersStore.getActiveRidersCount(),
      pendingQuotes: this.quotesStore.getPendingCount()
    };
    return of(kpis);
  }

  /**
   * Get users
   */
  getUsers(role?: string): Observable<User[]> {
    if (role) {
      return of(this.usersStore.getByRole(role as User['role']));
    }
    return of(this.usersStore.getAll());
  }

  /**
   * Create user
   * Creates user in Firebase Auth and adds to store
   */
  async createUser(userData: any): Promise<void> {
    // Note: User creation in Firebase Auth is handled by FirebaseAuthService
    // This method just ensures the user data is in the store
    // The FirebaseAuthService.createUser() should be called first
    const saved = this.usersStore.add({
      ...userData,
      active: true,
      createdAt: new Date()
    });

    // Persist to Firebase in background
    this.syncService.persistUser(saved).catch(err => {
      console.error('Background sync failed for user:', err);
    });
  }

  /**
   * Update user
   */
  async updateUser(userId: string, updates: any): Promise<void> {
    const updated = this.usersStore.update(userId, {
      ...updates,
      updatedAt: new Date()
    });
    
    if (updated) {
      // Sync to Firebase in background
      this.syncService.persistUser(updated).catch(err => {
        console.error('Background sync failed for user update:', err);
      });
    }
  }

  /**
   * Disable user
   */
  async disableUser(userId: string): Promise<void> {
    const updated = this.usersStore.disable(userId);
    if (updated) {
      this.syncService.persistUser(updated).catch(err => {
        console.error('Background sync failed for user disable:', err);
      });
    }
  }

  // ============ RIDER ============

  /**
   * Get rider tasks
   */
  getRiderTasks(riderId: string): Observable<any[]> {
    const orders = this.ordersStore.getByRider(riderId);
    return of(orders.map(order => ({
      id: order.id,
      order: order
    })));
  }

  /**
   * Update task status
   */
  async updateTaskStatus(taskId: string, status: string): Promise<void> {
    await this.updatePackageStatus(taskId, status);
  }

  /**
   * Submit POD
   */
  async submitPOD(taskId: string, podData: any, imageFile?: File): Promise<void> {
    const order = this.ordersStore.getById(taskId);
    if (!order) throw new Error('Order not found');

    const updates: any = {
      podSubmitted: true,
      podData: {
        receiverName: podData.receiverName,
        receiverPhone: podData.receiverPhone,
        notes: podData.notes,
        submittedAt: new Date()
      },
      updatedAt: new Date()
    };

    // Handle image upload if provided (would need Firebase Storage)
    if (imageFile) {
      // TODO: Upload image to Firebase Storage and get URL
      // For now, just store the file reference
      updates.podData.imageFile = imageFile;
    }

    const updated = this.ordersStore.update(taskId, updates);
    if (updated) {
      this.syncService.persistOrder(updated).catch(err => {
        console.error('Background sync failed for POD:', err);
      });
    }
  }

  /**
   * Submit COD
   */
  async submitCOD(taskId: string, codData: any): Promise<void> {
    const order = this.ordersStore.getById(taskId);
    if (!order) throw new Error('Order not found');

    const updated = this.ordersStore.update(taskId, {
      codCollected: true,
      codData: {
        amount: codData.amount,
        collectedAt: new Date()
      },
      updatedAt: new Date()
    });

    if (updated) {
      this.syncService.persistOrder(updated).catch(err => {
        console.error('Background sync failed for COD:', err);
      });
    }
  }

  // ============ DISPATCHER ============

  /**
   * Get created orders
   */
  getCreatedOrders(): Observable<Order[]> {
    return of(this.ordersStore.getByStatus('CREATED'));
  }

  /**
   * Get live orders
   */
  getLiveOrders(): Observable<Order[]> {
    const inTransit = this.ordersStore.getByStatus('IN_TRANSIT');
    const outForDelivery = this.ordersStore.getByStatus('OUT_FOR_DELIVERY');
    return of([...inTransit, ...outForDelivery]);
  }

  /**
   * Get available riders
   */
  getAvailableRiders(): Observable<User[]> {
    return of(this.usersStore.getByRole('RIDER'));
  }

  /**
   * Assign order to rider
   */
  async assignOrder(orderId: string, riderId: string): Promise<void> {
    const updated = this.ordersStore.assignToRider(orderId, riderId);
    if (updated) {
      this.syncService.persistOrder(updated).catch(err => {
        console.error('Background sync failed for order assignment:', err);
      });
    }
  }

  // ============ REPORTS ============

  /**
   * Get orders report
   */
  getOrdersReport(fromDate?: string, toDate?: string): Observable<Order[]> {
    let orders = this.ordersStore.getAll();

    if (fromDate) {
      const from = new Date(fromDate);
      orders = orders.filter(o => {
        const created = o.createdAt instanceof Date ? o.createdAt : new Date(o.createdAt);
        return created >= from;
      });
    }

    if (toDate) {
      const to = new Date(toDate);
      to.setHours(23, 59, 59, 999);
      orders = orders.filter(o => {
        const created = o.createdAt instanceof Date ? o.createdAt : new Date(o.createdAt);
        return created <= to;
      });
    }

    return of(orders);
  }

  /**
   * Get COD report
   */
  getCodReport(fromDate?: string, toDate?: string): Observable<any[]> {
    return this.getOrdersReport(fromDate, toDate).pipe(
      map(orders => {
        return orders
          .filter(o => o.codAmount && o.codCollected)
          .map(o => ({
            order: { trackingCode: o.trackingCode },
            amount: o.codAmount,
            status: o.codRemitted ? 'REMITTED' : 'PENDING',
            rider: o.riderId,
            client: o.clientId,
            collectedAt: o.codData?.collectedAt || o.createdAt
          }));
      })
    );
  }

  // ============ OBSERVABLES ============

  /**
   * Get quotes as observable (reactive)
   */
  getQuotes$(): Observable<Quote[]> {
    return this.quotesStore.data$;
  }

  /**
   * Get orders as observable (reactive)
   */
  getOrders$(): Observable<Order[]> {
    return this.ordersStore.data$;
  }

  /**
   * Get users as observable (reactive)
   */
  getUsers$(): Observable<User[]> {
    return this.usersStore.data$;
  }
}
