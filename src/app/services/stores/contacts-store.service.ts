import { Injectable } from '@angular/core';
import { InMemoryStoreService } from '../in-memory-store.service';

export interface Contact {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  read?: boolean;
  createdAt?: Date | any;
}

@Injectable({
  providedIn: 'root'
})
export class ContactsStoreService extends InMemoryStoreService<Contact> {
  protected override getStoreName(): string {
    return 'contacts';
  }

  /**
   * Get unread contacts
   * @returns Array of unread contacts
   */
  getUnread(): Contact[] {
    return this.find(c => !c.read);
  }

  /**
   * Mark contact as read
   * @param id Contact id
   * @returns Updated contact or undefined
   */
  markAsRead(id: string): Contact | undefined {
    return this.update(id, { read: true });
  }

  /**
   * Get unread count
   * @returns Number of unread contacts
   */
  getUnreadCount(): number {
    return this.getUnread().length;
  }
}
