import { Injectable } from '@angular/core';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase.config';

/**
 * Login Diagnostic Service
 * Helps diagnose login issues
 */
@Injectable({
  providedIn: 'root'
})
export class LoginDiagnosticService {
  
  /**
   * Run full diagnostic check
   */
  async runDiagnostic(email: string, password: string): Promise<void> {
    console.log('=== LOGIN DIAGNOSTIC START ===');
    console.log('Email:', email);
    
    try {
      // Step 1: Try Firebase Authentication
      console.log('\n1. Testing Firebase Authentication...');
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('✅ Firebase Authentication: SUCCESS');
      console.log('   UID:', userCredential.user.uid);
      
      // Step 2: Check Firestore user document
      console.log('\n2. Checking Firestore user document...');
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      
      if (!userDoc.exists()) {
        console.error('❌ Firestore user document: NOT FOUND');
        console.error('   Document path: users/' + userCredential.user.uid);
        console.error('   SOLUTION: Create user document in Firestore');
        console.error('   See CREATE_ADMIN_USER.md for instructions');
        return;
      }
      
      console.log('✅ Firestore user document: EXISTS');
      const userData = userDoc.data();
      console.log('   User data:', userData);
      
      // Step 3: Check required fields
      console.log('\n3. Checking required fields...');
      
      if (!userData['role']) {
        console.error('❌ Missing field: role');
        console.error('   SOLUTION: Add role field to user document (e.g., "ADMIN")');
      } else {
        console.log('✅ Role:', userData['role']);
      }
      
      if (userData['active'] === false) {
        console.error('❌ User account is disabled (active: false)');
        console.error('   SOLUTION: Set active to true in Firestore');
      } else {
        console.log('✅ Active:', userData['active'] !== false);
      }
      
      if (!userData['email']) {
        console.warn('⚠️ Missing field: email');
      } else {
        console.log('✅ Email:', userData['email']);
      }
      
      // Step 4: Check role
      console.log('\n4. Checking role permissions...');
      const role = userData['role'];
      if (role === 'ADMIN') {
        console.log('✅ Role is ADMIN - should have access to /admin');
      } else {
        console.warn('⚠️ Role is:', role);
        console.warn('   Only ADMIN role can access /admin');
      }
      
      console.log('\n=== DIAGNOSTIC COMPLETE ===');
      console.log('If all checks passed, login should work!');
      
    } catch (error: any) {
      console.error('\n❌ DIAGNOSTIC FAILED');
      console.error('Error:', error.message);
      console.error('Error code:', error.code);
      
      if (error.code === 'auth/user-not-found') {
        console.error('\nSOLUTION: User does not exist in Firebase Authentication');
        console.error('1. Go to Firebase Console > Authentication > Users');
        console.error('2. Click "Add user"');
        console.error('3. Create user with email:', email);
      } else if (error.code === 'auth/wrong-password') {
        console.error('\nSOLUTION: Incorrect password');
        console.error('Check the password you are using');
      } else if (error.code === 'auth/operation-not-allowed') {
        console.error('\nSOLUTION: Email/Password sign-in not enabled');
        console.error('1. Go to Firebase Console > Authentication > Sign-in method');
        console.error('2. Enable Email/Password');
      } else if (error.code === 'auth/invalid-email') {
        console.error('\nSOLUTION: Invalid email format');
        console.error('Check the email address format');
      }
    }
  }
}
