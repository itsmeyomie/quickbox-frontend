import { Injectable } from '@angular/core';
import { InMemoryStoreService } from '../in-memory-store.service';

export interface User {
  id?: string;
  uid?: string;
  email: string;
  fullName?: string;
  role: 'ADMIN' | 'DISPATCHER' | 'RIDER' | 'CLIENT';
  phone?: string;
  zone?: string;
  vehicle?: string;
  branch?: string;
  active?: boolean;
  password?: string; // Only for creation, never stored in memory
  createdAt?: Date | any;
  updatedAt?: Date | any;
}

@Injectable({
  providedIn: 'root'
})
export class UsersStoreService extends InMemoryStoreService<User> {
  protected override getStoreName(): string {
    return 'users';
  }

  /**
   * Get users by role
   * @param role User role
   * @returns Array of users with matching role
   */
  getByRole(role: User['role']): User[] {
    return this.find(u => u.role === role && u.active !== false);
  }

  /**
   * Get active users
   * @returns Array of active users
   */
  getActive(): User[] {
    return this.find(u => u.active !== false);
  }

  /**
   * Get user by email
   * @param email User email
   * @returns User or undefined
   */
  getByEmail(email: string): User | undefined {
    return this.find(u => u.email === email)[0];
  }

  /**
   * Get user by Firebase UID
   * @param uid Firebase user UID
   * @returns User or undefined
   */
  getByUid(uid: string): User | undefined {
    return this.find(u => u.uid === uid)[0];
  }

  /**
   * Get active riders count
   * @returns Number of active riders
   */
  getActiveRidersCount(): number {
    return this.getByRole('RIDER').length;
  }

  /**
   * Disable a user
   * @param id User id
   * @returns Updated user or undefined
   */
  disable(id: string): User | undefined {
    return this.update(id, { active: false, updatedAt: new Date() });
  }

  /**
   * Enable a user
   * @param id User id
   * @returns Updated user or undefined
   */
  enable(id: string): User | undefined {
    return this.update(id, { active: true, updatedAt: new Date() });
  }
}
