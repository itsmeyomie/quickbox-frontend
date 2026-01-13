import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Base In-Memory Store Service
 * Provides CRUD operations for any entity type
 * Acts as the primary data source for the application
 */
@Injectable({
  providedIn: 'root'
})
export class InMemoryStoreService<T extends { id?: string }> {
  private data: Map<string, T> = new Map();
  private dataSubject = new BehaviorSubject<T[]>([]);
  public data$: Observable<T[]> = this.dataSubject.asObservable();

  constructor() {
    this.loadFromLocalStorage();
  }

  /**
   * Add a new item to the store
   * @param item Item to add (id will be generated if not provided)
   * @returns The added item with generated id
   */
  add(item: T): T {
    const id = item.id || this.generateId();
    const newItem = { ...item, id } as T;
    this.data.set(id, newItem);
    this.notify();
    this.saveToLocalStorage();
    return newItem;
  }

  /**
   * Get all items from the store
   * @returns Array of all items
   */
  getAll(): T[] {
    return Array.from(this.data.values());
  }

  /**
   * Get a single item by id
   * @param id Item id
   * @returns Item or undefined if not found
   */
  getById(id: string): T | undefined {
    return this.data.get(id);
  }

  /**
   * Update an existing item
   * @param id Item id
   * @param updates Partial updates to apply
   * @returns Updated item or undefined if not found
   */
  update(id: string, updates: Partial<T>): T | undefined {
    const existing = this.data.get(id);
    if (!existing) return undefined;

    const updated = { ...existing, ...updates, id } as T;
    this.data.set(id, updated);
    this.notify();
    this.saveToLocalStorage();
    return updated;
  }

  /**
   * Remove an item from the store
   * @param id Item id
   * @returns true if item was removed, false if not found
   */
  remove(id: string): boolean {
    const removed = this.data.delete(id);
    if (removed) {
      this.notify();
      this.saveToLocalStorage();
    }
    return removed;
  }

  /**
   * Clear all items from the store
   */
  clear(): void {
    this.data.clear();
    this.notify();
    this.saveToLocalStorage();
  }

  /**
   * Load multiple items into the store (used for sync)
   * @param items Array of items to load
   * @param replace If true, replaces all existing data; if false, merges
   */
  load(items: T[], replace: boolean = false): void {
    if (replace) {
      this.data.clear();
    }
    items.forEach(item => {
      if (item.id) {
        this.data.set(item.id, item);
      }
    });
    this.notify();
    this.saveToLocalStorage();
  }

  /**
   * Find items by a predicate function
   * @param predicate Function to test each item
   * @returns Array of matching items
   */
  find(predicate: (item: T) => boolean): T[] {
    return Array.from(this.data.values()).filter(predicate);
  }

  /**
   * Get count of items
   * @returns Number of items in store
   */
  count(): number {
    return this.data.size;
  }

  /**
   * Check if store has an item with given id
   * @param id Item id
   * @returns true if item exists
   */
  has(id: string): boolean {
    return this.data.has(id);
  }

  /**
   * Get items as a Map (for internal use)
   * @returns Map of id -> item
   */
  getDataMap(): Map<string, T> {
    return new Map(this.data);
  }

  /**
   * Set the entire data map (for sync operations)
   * @param dataMap New data map
   */
  setDataMap(dataMap: Map<string, T>): void {
    this.data = new Map(dataMap);
    this.notify();
    this.saveToLocalStorage();
  }

  /**
   * Notify subscribers of data changes
   */
  private notify(): void {
    this.dataSubject.next(this.getAll());
  }

  /**
   * Generate a unique ID
   * @returns Generated ID
   */
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  /**
   * Save current state to localStorage (for persistence across page reloads)
   */
  private saveToLocalStorage(): void {
    try {
      const storeName = this.getStoreName();
      const data = Array.from(this.data.entries());
      localStorage.setItem(`inmemory_${storeName}`, JSON.stringify(data));
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  }

  /**
   * Load state from localStorage
   */
  private loadFromLocalStorage(): void {
    try {
      const storeName = this.getStoreName();
      const stored = localStorage.getItem(`inmemory_${storeName}`);
      if (stored) {
        const data: [string, T][] = JSON.parse(stored);
        this.data = new Map(data);
        this.notify();
      }
    } catch (error) {
      console.warn('Failed to load from localStorage:', error);
    }
  }

  /**
   * Get store name for localStorage key
   * Override in subclasses if needed
   */
  protected getStoreName(): string {
    return 'default';
  }
}
