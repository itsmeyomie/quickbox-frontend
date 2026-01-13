# Firebase Migration Guide

## Overview
The application has been migrated from Spring Boot backend to Firebase for single-deployment capability.

## Setup Instructions

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name (e.g., "quickbox")
4. Follow the setup wizard

### 2. Enable Firebase Services

#### Authentication
1. Go to Authentication > Sign-in method
2. Enable "Email/Password"
3. Optionally enable "Phone" for phone number login

#### Firestore Database
1. Go to Firestore Database
2. Click "Create database"
3. Start in "Test mode" (we'll add security rules later)
4. Choose a location

#### Storage
1. Go to Storage
2. Click "Get started"
3. Start in "Test mode"
4. Use the same location as Firestore

### 3. Get Firebase Configuration
1. Go to Project Settings (gear icon)
2. Scroll to "Your apps"
3. Click the web icon (`</>`)
4. Register app with a nickname
5. Copy the configuration object

### 4. Update Firebase Config
Edit `quickbox-angular/src/app/config/firebase.config.ts` and replace the placeholder values:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 5. Set Up Firestore Security Rules

Go to Firestore Database > Rules and add:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null && 
        (request.auth.token.admin == true || 
         request.resource.data.uid == request.auth.uid);
    }
    
    // Contacts collection
    match /contacts/{contactId} {
      allow create: if true; // Public can submit
      allow read, write: if request.auth != null && 
        request.auth.token.admin == true;
    }
    
    // Quotes collection
    match /quotes/{quoteId} {
      allow create: if true; // Public can submit
      allow read, write: if request.auth != null && 
        request.auth.token.admin == true;
    }
    
    // Packages collection
    match /packages/{packageId} {
      allow create: if request.auth != null;
      allow read: if request.auth != null && 
        (resource.data.clientId == request.auth.uid ||
         resource.data.riderId == request.auth.uid ||
         request.auth.token.admin == true ||
         request.auth.token.dispatcher == true);
      allow update: if request.auth != null && 
        (resource.data.riderId == request.auth.uid ||
         request.auth.token.admin == true ||
         request.auth.token.dispatcher == true);
    }
  }
}
```

### 6. Set Up Storage Security Rules

Go to Storage > Rules and add:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /videos/{videoId} {
      allow read: if true; // Public read
      allow write: if request.auth != null && 
        request.auth.token.admin == true;
    }
    
    match /pod/{podId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        (request.auth.token.rider == true || 
         request.auth.token.admin == true);
    }
  }
}
```

### 7. Create Initial Admin User

You'll need to create an admin user manually. You can do this by:

1. Using Firebase Console > Authentication > Add user
2. Or create a script to add admin user with role

The user document in Firestore should have:
```json
{
  "uid": "user-id",
  "email": "admin@quickbox.com",
  "fullName": "Admin User",
  "role": "ADMIN",
  "active": true
}
```

### 8. Update Environment Files

The `environment.ts` files no longer need `apiUrl` since we're using Firebase directly.

## Data Migration

If you have existing data in your Spring Boot backend:

1. Export data from your database
2. Import into Firestore using Firebase Console or a migration script
3. Update document structure to match Firestore format

## Deployment

### Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Build: `ng build --configuration production`
5. Deploy: `firebase deploy`

### Alternative: Static Hosting
You can deploy the built Angular app to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

## Key Changes

1. **Authentication**: Now uses Firebase Auth instead of JWT tokens
2. **Database**: Firestore replaces MySQL/H2
3. **Storage**: Firebase Storage replaces file uploads
4. **API Calls**: All HTTP calls replaced with Firebase SDK calls
5. **Real-time**: Firestore provides real-time updates automatically

## Testing

1. Test login with admin credentials
2. Test contact form submission
3. Test quote request submission
4. Test package tracking
5. Test admin dashboard
6. Test user management
7. Test video upload

## Troubleshooting

### Authentication Issues
- Check Firebase Auth is enabled
- Verify email/password sign-in method is enabled
- Check user exists in Authentication

### Firestore Issues
- Verify security rules allow the operation
- Check collection/document paths are correct
- Ensure indexes are created for complex queries

### Storage Issues
- Check storage rules
- Verify file size limits
- Check storage bucket permissions

## Support

For Firebase-specific issues, refer to:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Firebase Auth Documentation](https://firebase.google.com/docs/auth)
