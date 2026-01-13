import { Injectable } from '@angular/core';
import { FirebaseSyncService } from './firebase-sync.service';

/**
 * App Initialization Service
 * Handles app startup tasks, including Firebase sync
 */
@Injectable({
  providedIn: 'root'
})
export class AppInitService {
  constructor(private syncService: FirebaseSyncService) {}

  /**
   * Initialize app - called on startup
   * This loads all data from Firebase into in-memory stores
   */
  async init(): Promise<void> {
    console.log('Initializing application...');
    
    try {
      // Initialize Firebase sync (loads data into in-memory stores)
      await this.syncService.initializeSync();
      console.log('Application initialized successfully');
    } catch (error) {
      console.error('Error during app initialization:', error);
      // App continues to work with in-memory data (offline mode)
      console.log('Continuing in offline mode with cached data');
    }
  }
}
