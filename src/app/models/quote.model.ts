export interface QuoteRequest {
  name: string;
  email: string;
  contactNumber: string;
  serviceType?: string;
  pickupLocation?: string;
  deliveryDestination?: string;
  packageWeight?: string;
  additionalServices?: string;
}

export interface QuoteResponse {
  success: boolean;
  message: string;
  data: QuoteData;
}

export interface QuoteData {
  id: number;
  name: string;
  email: string;
  contactNumber: string;
  serviceType?: string;
  pickupLocation?: string;
  deliveryDestination?: string;
  packageWeight?: string;
  additionalServices?: string;
  status: string;
  createdAt: string;
}



