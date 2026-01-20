# Admin Login Troubleshooting Guide

## Common Issues and Solutions

### 1. Check Browser Console for Errors

Open browser console (F12) and look for errors when trying to log in. Common errors:

- **`auth/user-not-found`**: User doesn't exist in Firebase Authentication
- **`auth/wrong-password`**: Incorrect password
- **`auth/invalid-email`**: Email format is invalid
- **`auth/operation-not-allowed`**: Email/Password sign-in not enabled
- **`User data not found`**: User document missing in Firestore
- **`User account is disabled`**: User's `active` field is `false`

### 2. Verify Firebase Authentication Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: **quickbox-c5fab**
3. Go to **Authentication** > **Sign-in method**
4. Ensure **Email/Password** is **Enabled**
5. Go to **Users** tab
6. Verify user exists with email: `info@quickboxcourier.co.ke`

### 3. Verify Firestore User Document

1. In Firebase Console, go to **Firestore Database**
2. Check if collection `users` exists
3. Check if document with ID `zkTz8o0BpOQWCcL3ifWY4MQNAtT2` exists
4. Verify the document has these fields:
   ```json
   {
     "uid": "zkTz8o0BpOQWCcL3ifWY4MQNAtT2",
     "email": "info@quickboxcourier.co.ke",
     "fullName": "QuickBox Admin",
     "role": "ADMIN",
     "active": true
   }
   ```

### 4. Create Missing User Document

If the Firestore document doesn't exist:

1. Go to Firestore Database
2. Click **Start collection** (if no collections)
3. Collection ID: `users`
4. Document ID: `zkTz8o0BpOQWCcL3ifWY4MQNAtT2`
5. Add fields:
   - `uid` (string): `zkTz8o0BpOQWCcL3ifWY4MQNAtT2`
   - `email` (string): `info@quickboxcourier.co.ke`
   - `fullName` (string): `QuickBox Admin`
   - `role` (string): `ADMIN` (must be uppercase)
   - `active` (boolean): `true`
   - `createdAt` (timestamp): Current time
6. Click **Save**

### 5. Test Login Credentials

Use these credentials:
- **Email**: `info@quickboxcourier.co.ke`
- **Password**: `Quickbox@2025!`

### 6. Check Network Tab

1. Open browser DevTools (F12)
2. Go to **Network** tab
3. Try to log in
4. Look for requests to Firebase:
   - `identitytoolkit.googleapis.com` - Authentication
   - `firestore.googleapis.com` - User data fetch
5. Check if requests are successful (status 200) or failing (status 400/403)

### 7. Verify Firebase Configuration

Check `src/app/config/firebase.config.ts` has correct Firebase project credentials:
- `apiKey`: Should match your Firebase project
- `authDomain`: Should be `quickbox-c5fab.firebaseapp.com`
- `projectId`: Should be `quickbox-c5fab`

### 8. Clear Browser Cache

Sometimes cached data causes issues:
1. Clear browser cache
2. Clear localStorage (F12 > Application > Local Storage > Clear)
3. Try logging in again

### 9. Check Firestore Security Rules

Go to Firestore > Rules and ensure users can read their own data:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow read: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'ADMIN';
    }
  }
}
```

### 10. Debug Steps

Add console logs to see what's happening:

1. Open browser console
2. Try to log in
3. Look for these messages:
   - "Login successful"
   - "User data loaded"
   - "Redirecting to /admin"
   - Any error messages

### Quick Fix Checklist

- [ ] Email/Password enabled in Firebase Authentication
- [ ] User exists in Firebase Authentication
- [ ] User document exists in Firestore `users` collection
- [ ] User document has `role: "ADMIN"` (uppercase)
- [ ] User document has `active: true`
- [ ] Firebase config is correct
- [ ] Browser console shows no errors
- [ ] Network requests to Firebase are successful

### Still Can't Login?

1. Check the exact error message in browser console
2. Verify all steps above
3. Try creating a new admin user:
   - Create user in Firebase Authentication
   - Create corresponding document in Firestore
   - Try logging in with new credentials
