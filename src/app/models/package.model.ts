export interface Package {
  trackingId?: string;
  recipientName: string;
  senderName?: string;
  pickupAddress?: string;
  deliveryAddress?: string;
  packageWeight?: string;
  status?: string;
}

export interface PackageResponse {
  success: boolean;
  message?: string;
  data?: PackageData;
}

export interface PackageData {
  id: number;
  trackingId: string;
  recipientName: string;
  senderName?: string;
  pickupAddress?: string;
  deliveryAddress?: string;
  packageWeight?: string;
  status: string;
  createdAt: string;
  estimatedDelivery?: string;
  deliveredAt?: string;
}

