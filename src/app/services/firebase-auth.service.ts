import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase.config';
import { BehaviorSubject, Observable } from 'rxjs';

export interface UserData {
  uid: string;
  email: string;
  fullName?: string;
  role: 'ADMIN' | 'DISPATCHER' | 'RIDER' | 'CLIENT';
  phone?: string;
  zone?: string;
  vehicle?: string;
  branch?: string;
  active?: boolean;
}

export interface LoginResponse {
  token: string;
  user: UserData;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  private currentUserSubject = new BehaviorSubject<UserData | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private router: Router) {
    // Listen to auth state changes
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userData = await this.getUserData(firebaseUser.uid);
        this.currentUserSubject.next(userData);
      } else {
        this.currentUserSubject.next(null);
      }
    });
  }

  async login(emailOrPhone: string, password: string): Promise<LoginResponse> {
    try {
      // Try email first, then check if it's a phone number
      let email = emailOrPhone;
      
      // If it's a phone number, we need to find the user by phone in Firestore
      // For now, assuming email login
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userData = await this.getUserData(userCredential.user.uid);
      
      if (!userData) {
        throw new Error('User data not found. Please contact administrator.');
      }
      
      if (userData.active === false) {
        throw new Error('User account is disabled');
      }

      // Generate a simple token (Firebase handles auth tokens internally)
      const token = await userCredential.user.getIdToken();

      return {
        token,
        user: userData,
        role: userData.role
      };
    } catch (error: any) {
      // Handle Firebase Auth errors
      let errorMessage = 'Login failed';
      
      if (error.code) {
        switch (error.code) {
          case 'auth/user-not-found':
            errorMessage = 'No account found with this email address.';
            break;
          case 'auth/wrong-password':
            errorMessage = 'Incorrect password. Please try again.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Invalid email address format.';
            break;
          case 'auth/user-disabled':
            errorMessage = 'This account has been disabled.';
            break;
          case 'auth/too-many-requests':
            errorMessage = 'Too many failed login attempts. Please try again later.';
            break;
          case 'auth/operation-not-allowed':
            errorMessage = 'Email/Password sign-in is not enabled. Please contact administrator.';
            break;
          case 'auth/invalid-credential':
            errorMessage = 'Invalid email or password.';
            break;
          default:
            errorMessage = error.message || `Login failed: ${error.code}`;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      throw new Error(errorMessage);
    }
  }

  async logout(): Promise<void> {
    await signOut(auth);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  async getCurrentUser(): Promise<UserData | null> {
    const firebaseUser = auth.currentUser;
    if (!firebaseUser) return null;
    return await this.getUserData(firebaseUser.uid);
  }

  getCurrentUserSync(): UserData | null {
    return this.currentUserSubject.value;
  }

  getToken(): Promise<string | null> {
    const user = auth.currentUser;
    if (!user) return Promise.resolve(null);
    return user.getIdToken();
  }

  isAuthenticated(): boolean {
    return auth.currentUser !== null;
  }

  hasRole(role: string): boolean {
    const user = this.currentUserSubject.value;
    return user?.role === role;
  }

  getRoleRoute(): string {
    const user = this.currentUserSubject.value;
    if (!user) return '/login';
    
    switch (user.role) {
      case 'ADMIN':
        return '/admin';
      case 'DISPATCHER':
        return '/dispatch';
      case 'RIDER':
        return '/rider';
      case 'CLIENT':
        return '/client';
      default:
        return '/login';
    }
  }

  private async getUserData(uid: string): Promise<UserData | null> {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (!userDoc.exists()) return null;
      
      return {
        uid,
        ...userDoc.data()
      } as UserData;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  }

  async createUser(userData: UserData, password: string): Promise<void> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        userData.email, 
        password
      );

      if (userData.fullName) {
        await updateProfile(userCredential.user, {
          displayName: userData.fullName
        });
      }

      await setDoc(doc(db, 'users', userCredential.user.uid), {
        ...userData,
        uid: userCredential.user.uid,
        active: true,
        createdAt: new Date()
      });
    } catch (error: any) {
      throw new Error(error.message || 'Failed to create user');
    }
  }

  async updateUser(uid: string, updates: Partial<UserData>): Promise<void> {
    try {
      await updateDoc(doc(db, 'users', uid), updates);
      // Refresh current user if it's the same user
      if (auth.currentUser?.uid === uid) {
        const userData = await this.getUserData(uid);
        this.currentUserSubject.next(userData);
      }
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update user');
    }
  }
}
