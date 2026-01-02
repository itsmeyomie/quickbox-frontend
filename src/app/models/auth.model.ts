export interface LoginRequest {
  emailOrPhone: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  role: 'ADMIN' | 'DISPATCHER' | 'RIDER' | 'CLIENT';
  email: string;
  fullName: string;
  userId: number;
}

export interface User {
  id: number;
  email: string;
  phone?: string;
  role: 'ADMIN' | 'DISPATCHER' | 'RIDER' | 'CLIENT';
  fullName?: string;
  branch?: string;
  zone?: string;
  vehicle?: string;
  active: boolean;
  online?: boolean;
}


