import { Injectable } from '@angular/core';
import { InMemoryStoreService } from '../in-memory-store.service';

export interface Order {
  id?: string;
  trackingCode: string;
  clientId?: string;
  riderId?: string;
  pickupAddress: string;
  deliveryAddress: string;
  receiverName: string;
  receiverPhone: string;
  packageDescription?: string;
  packageWeight?: number;
  codAmount?: number;
  status: 'CREATED' | 'ASSIGNED' | 'IN_TRANSIT' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'RETURNED' | 'FAILED';
  codCollected?: boolean;
  codRemitted?: boolean;
  podSubmitted?: boolean;
  podData?: {
    receiverName?: string;
    receiverPhone?: string;
    notes?: string;
    imageUrl?: string;
    submittedAt?: Date;
  };
  codData?: {
    amount?: number;
    collectedAt?: Date;
  };
  createdAt?: Date | any;
  updatedAt?: Date | any;
  assignedAt?: Date | any;
}

@Injectable({
  providedIn: 'root'
})
export class OrdersStoreService extends InMemoryStoreService<Order> {
  protected override getStoreName(): string {
    return 'orders';
  }

  /**
   * Get orders by status
   * @param status Order status
   * @returns Array of orders with matching status
   */
  getByStatus(status: Order['status']): Order[] {
    return this.find(o => o.status === status);
  }

  /**
   * Get orders by client
   * @param clientId Client user id
   * @returns Array of orders for the client
   */
  getByClient(clientId: string): Order[] {
    return this.find(o => o.clientId === clientId);
  }

  /**
   * Get orders by rider
   * @param riderId Rider user id
   * @returns Array of orders assigned to the rider
   */
  getByRider(riderId: string): Order[] {
    return this.find(o => o.riderId === riderId);
  }

  /**
   * Get order by tracking code
   * @param trackingCode Tracking code
   * @returns Order or undefined
   */
  getByTrackingCode(trackingCode: string): Order | undefined {
    return this.find(o => o.trackingCode === trackingCode)[0];
  }

  /**
   * Update order status
   * @param id Order id
   * @param status New status
   * @returns Updated order or undefined
   */
  updateStatus(id: string, status: Order['status']): Order | undefined {
    return this.update(id, { 
      status, 
      updatedAt: new Date() 
    });
  }

  /**
   * Assign order to rider
   * @param id Order id
   * @param riderId Rider user id
   * @returns Updated order or undefined
   */
  assignToRider(id: string, riderId: string): Order | undefined {
    return this.update(id, {
      riderId,
      status: 'ASSIGNED',
      assignedAt: new Date(),
      updatedAt: new Date()
    });
  }

  /**
   * Generate a unique tracking code
   * @returns Tracking code
   */
  generateTrackingCode(): string {
    return 'QB' + Date.now().toString().slice(-10);
  }

  /**
   * Create order from quote
   * @param quote Quote data
   * @param clientId Client user id
   * @returns Created order
   */
  createFromQuote(quote: any, clientId: string): Order {
    const order: Order = {
      trackingCode: this.generateTrackingCode(),
      clientId,
      pickupAddress: quote.pickupLocation || '',
      deliveryAddress: quote.deliveryDestination || '',
      receiverName: quote.name,
      receiverPhone: quote.contactNumber,
      packageDescription: quote.additionalServices,
      packageWeight: quote.packageWeight ? parseFloat(quote.packageWeight) : undefined,
      status: 'CREATED',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    return this.add(order);
  }

  /**
   * Get COD summary for a client
   * @param clientId Client user id
   * @returns COD summary object
   */
  getCodSummary(clientId: string): { collected: number; pendingRemittance: number; remitted: number } {
    const orders = this.getByClient(clientId);
    
    let collected = 0;
    let pendingRemittance = 0;
    let remitted = 0;
    
    orders.forEach(order => {
      const codAmount = order.codAmount || 0;
      if (order.status === 'DELIVERED' && order.codCollected) {
        if (order.codRemitted) {
          remitted += codAmount;
        } else {
          pendingRemittance += codAmount;
        }
        collected += codAmount;
      }
    });
    
    return { collected, pendingRemittance, remitted };
  }

  /**
   * Get KPIs for admin dashboard
   * @returns KPI object
   */
  getKPIs(): { totalOrders: number; delivered: number; failed: number; codPending: number } {
    const orders = this.getAll();
    
    const totalOrders = orders.length;
    const delivered = orders.filter(o => o.status === 'DELIVERED').length;
    const failed = orders.filter(o => o.status === 'RETURNED' || o.status === 'FAILED').length;
    const codPending = orders
      .filter(o => o.codAmount && o.status !== 'DELIVERED')
      .reduce((sum, o) => sum + (o.codAmount || 0), 0);
    
    return { totalOrders, delivered, failed, codPending };
  }
}
