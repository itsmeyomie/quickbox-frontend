import { Injectable } from '@angular/core';
import { 
  collection, 
  doc, 
  getDoc,
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  writeBatch
} from 'firebase/firestore';
import { db } from '../config/firebase.config';
import { QuotesStoreService, Quote } from './stores/quotes-store.service';
import { OrdersStoreService, Order } from './stores/orders-store.service';
import { UsersStoreService, User } from './stores/users-store.service';
import { ContactsStoreService, Contact } from './stores/contacts-store.service';

/**
 * Firebase Sync Service
 * Handles synchronization between In-Memory stores and Firebase
 * 
 * Architecture:
 * - One-way sync: Firebase → InMemoryStore (on app load)
 * - Two-way sync: InMemoryStore → Firebase (background persistence)
 * - Offline queue: Stores changes when offline, syncs when online
 */
@Injectable({
  providedIn: 'root'
})
export class FirebaseSyncService {
  private syncInProgress = false;
  private offlineQueue: Array<{ type: string; action: string; data: any }> = [];
  private isOnline = navigator.onLine;

  constructor(
    private quotesStore: QuotesStoreService,
    private ordersStore: OrdersStoreService,
    private usersStore: UsersStoreService,
    private contactsStore: ContactsStoreService
  ) {
    this.setupOnlineListener();
  }

  /**
   * Initialize sync - Load all data from Firebase into in-memory stores
   * Call this once when app starts
   */
  async initializeSync(): Promise<void> {
    if (this.syncInProgress) {
      console.warn('Sync already in progress');
      return;
    }

    this.syncInProgress = true;
    console.log('Initializing Firebase sync...');

    try {
      await Promise.all([
        this.syncQuotesFromFirebase(),
        this.syncOrdersFromFirebase(),
        this.syncUsersFromFirebase(),
        this.syncContactsFromFirebase()
      ]);

      console.log('Firebase sync completed successfully');
      
      // Process offline queue if online
      if (this.isOnline) {
        await this.processOfflineQueue();
      }
    } catch (error) {
      console.error('Error during Firebase sync:', error);
      // App continues to work with in-memory data
    } finally {
      this.syncInProgress = false;
    }
  }

  // ============ QUOTES SYNC ============

  /**
   * Sync quotes from Firebase to in-memory store
   */
  private async syncQuotesFromFirebase(): Promise<void> {
    try {
      const snapshot = await getDocs(collection(db, 'quotes'));
      const quotes: Quote[] = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data['createdAt']?.toDate ? data['createdAt'].toDate() : new Date(),
          updatedAt: data['updatedAt']?.toDate ? data['updatedAt'].toDate() : undefined
        } as Quote;
      });
      
      this.quotesStore.load(quotes, true);
      console.log(`Synced ${quotes.length} quotes from Firebase`);
    } catch (error) {
      console.error('Error syncing quotes from Firebase:', error);
      throw error;
    }
  }

  /**
   * Persist quote to Firebase (background operation)
   */
  async persistQuote(quote: Quote): Promise<void> {
    if (!this.isOnline) {
      this.addToOfflineQueue('quotes', 'create', quote);
      return;
    }

    try {
      if (quote.id) {
        // Quote already has an ID, update existing document
        const quoteRef = doc(db, 'quotes', quote.id);
        const { id, ...data } = quote;
        await setDoc(quoteRef, {
          ...data,
          updatedAt: serverTimestamp()
        }, { merge: true });
        console.log(`Quote ${quote.id} synced to Firebase`);
      } else {
        // New quote, create document and get Firebase ID
        const quoteRef = doc(collection(db, 'quotes'));
        const { id, ...data } = quote;
        await setDoc(quoteRef, {
          ...data,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        // Update local store with Firebase-generated ID
        const localQuote = this.quotesStore.getAll().find(q => 
          q.name === quote.name && 
          q.email === quote.email && 
          q.contactNumber === quote.contactNumber &&
          !q.id
        );
        if (localQuote) {
          this.quotesStore.update(localQuote.id!, { id: quoteRef.id });
          console.log(`Quote synced to Firebase with ID: ${quoteRef.id}`);
        }
      }
    } catch (error) {
      console.error('Error persisting quote to Firebase:', error);
      this.addToOfflineQueue('quotes', 'create', quote);
      throw error;
    }
  }

  /**
   * Delete quote from Firebase
   */
  async deleteQuoteFromFirebase(quoteId: string): Promise<void> {
    if (!this.isOnline) {
      this.addToOfflineQueue('quotes', 'delete', { id: quoteId });
      return;
    }

    try {
      await deleteDoc(doc(db, 'quotes', quoteId));
    } catch (error) {
      console.error('Error deleting quote from Firebase:', error);
      this.addToOfflineQueue('quotes', 'delete', { id: quoteId });
      throw error;
    }
  }

  // ============ ORDERS SYNC ============

  /**
   * Sync orders from Firebase to in-memory store
   */
  private async syncOrdersFromFirebase(): Promise<void> {
    try {
      const snapshot = await getDocs(collection(db, 'packages'));
      const orders: Order[] = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data['createdAt']?.toDate ? data['createdAt'].toDate() : new Date(),
          updatedAt: data['updatedAt']?.toDate ? data['updatedAt'].toDate() : undefined,
          assignedAt: data['assignedAt']?.toDate ? data['assignedAt'].toDate() : undefined
        } as Order;
      });
      
      this.ordersStore.load(orders, true);
      console.log(`Synced ${orders.length} orders from Firebase`);
    } catch (error) {
      console.error('Error syncing orders from Firebase:', error);
      throw error;
    }
  }

  /**
   * Persist order to Firebase
   */
  async persistOrder(order: Order): Promise<void> {
    if (!this.isOnline) {
      this.addToOfflineQueue('orders', 'create', order);
      return;
    }

    try {
      if (order.id) {
        const orderRef = doc(db, 'packages', order.id);
        const { id, ...data } = order;
        await setDoc(orderRef, {
          ...data,
          updatedAt: serverTimestamp()
        }, { merge: true });
      }
    } catch (error) {
      console.error('Error persisting order to Firebase:', error);
      this.addToOfflineQueue('orders', 'create', order);
      throw error;
    }
  }

  // ============ USERS SYNC ============

  /**
   * Sync users from Firebase to in-memory store
   */
  private async syncUsersFromFirebase(): Promise<void> {
    try {
      const snapshot = await getDocs(collection(db, 'users'));
      const users: User[] = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data['createdAt']?.toDate ? data['createdAt'].toDate() : undefined,
          updatedAt: data['updatedAt']?.toDate ? data['updatedAt'].toDate() : undefined
        } as User;
      });
      
      this.usersStore.load(users, true);
      console.log(`Synced ${users.length} users from Firebase`);
    } catch (error) {
      console.error('Error syncing users from Firebase:', error);
      throw error;
    }
  }

  /**
   * Persist user to Firebase
   */
  async persistUser(user: User): Promise<void> {
    if (!this.isOnline) {
      this.addToOfflineQueue('users', 'create', user);
      return;
    }

    try {
      if (user.uid) {
        const userRef = doc(db, 'users', user.uid);
        const { id, password, ...data } = user; // Never sync password
        await setDoc(userRef, {
          ...data,
          updatedAt: serverTimestamp()
        }, { merge: true });
      }
    } catch (error) {
      console.error('Error persisting user to Firebase:', error);
      this.addToOfflineQueue('users', 'create', user);
      throw error;
    }
  }

  // ============ CONTACTS SYNC ============

  /**
   * Sync contacts from Firebase to in-memory store
   */
  private async syncContactsFromFirebase(): Promise<void> {
    try {
      const snapshot = await getDocs(collection(db, 'contacts'));
      const contacts: Contact[] = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data['createdAt']?.toDate ? data['createdAt'].toDate() : new Date()
        } as Contact;
      });
      
      this.contactsStore.load(contacts, true);
      console.log(`Synced ${contacts.length} contacts from Firebase`);
    } catch (error) {
      console.error('Error syncing contacts from Firebase:', error);
      throw error;
    }
  }

  /**
   * Persist contact to Firebase
   */
  async persistContact(contact: Contact): Promise<void> {
    if (!this.isOnline) {
      this.addToOfflineQueue('contacts', 'create', contact);
      return;
    }

    try {
      const contactRef = doc(collection(db, 'contacts'));
      const { id, ...data } = contact;
      await setDoc(contactRef, {
        ...data,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error persisting contact to Firebase:', error);
      this.addToOfflineQueue('contacts', 'create', contact);
      throw error;
    }
  }

  // ============ OFFLINE QUEUE ============

  /**
   * Add operation to offline queue
   */
  private addToOfflineQueue(type: string, action: string, data: any): void {
    this.offlineQueue.push({ type, action, data });
    this.saveOfflineQueue();
    console.log(`Added to offline queue: ${action} ${type}`);
  }

  /**
   * Process offline queue when connection is restored
   */
  private async processOfflineQueue(): Promise<void> {
    if (this.offlineQueue.length === 0) return;

    console.log(`Processing ${this.offlineQueue.length} queued operations...`);
    const queue = [...this.offlineQueue];
    this.offlineQueue = [];

    for (const item of queue) {
      try {
        switch (item.type) {
          case 'quotes':
            if (item.action === 'create') {
              await this.persistQuote(item.data);
            } else if (item.action === 'delete') {
              await this.deleteQuoteFromFirebase(item.data.id);
            }
            break;
          case 'orders':
            if (item.action === 'create') {
              await this.persistOrder(item.data);
            }
            break;
          case 'users':
            if (item.action === 'create') {
              await this.persistUser(item.data);
            }
            break;
          case 'contacts':
            if (item.action === 'create') {
              await this.persistContact(item.data);
            }
            break;
        }
      } catch (error) {
        console.error(`Error processing queued ${item.type} operation:`, error);
        // Re-add to queue if it fails
        this.offlineQueue.push(item);
      }
    }

    this.saveOfflineQueue();
    console.log('Offline queue processed');
  }

  /**
   * Save offline queue to localStorage
   */
  private saveOfflineQueue(): void {
    try {
      localStorage.setItem('firebase_offline_queue', JSON.stringify(this.offlineQueue));
    } catch (error) {
      console.warn('Failed to save offline queue:', error);
    }
  }

  /**
   * Load offline queue from localStorage
   */
  private loadOfflineQueue(): void {
    try {
      const stored = localStorage.getItem('firebase_offline_queue');
      if (stored) {
        this.offlineQueue = JSON.parse(stored);
      }
    } catch (error) {
      console.warn('Failed to load offline queue:', error);
    }
  }

  /**
   * Setup online/offline listeners
   */
  private setupOnlineListener(): void {
    window.addEventListener('online', async () => {
      console.log('Connection restored');
      this.isOnline = true;
      await this.processOfflineQueue();
    });

    window.addEventListener('offline', () => {
      console.log('Connection lost - operating in offline mode');
      this.isOnline = false;
    });

    // Load offline queue on startup
    this.loadOfflineQueue();
  }

  /**
   * Manual sync trigger (for testing or manual refresh)
   */
  async manualSync(): Promise<void> {
    await this.initializeSync();
  }

  /**
   * Get sync status
   */
  getSyncStatus(): { isOnline: boolean; queueLength: number; inProgress: boolean } {
    return {
      isOnline: this.isOnline,
      queueLength: this.offlineQueue.length,
      inProgress: this.syncInProgress
    };
  }
}
