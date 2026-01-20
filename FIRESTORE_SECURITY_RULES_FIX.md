# Firestore Security Rules Fix

## Problem
You're getting "Missing or insufficient permissions" error when trying to read quotes from Firebase.

## Solution: Update Firestore Security Rules

### Steps to Fix:

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com/
   - Select your project: **quickbox-c5fab**

2. **Navigate to Firestore Rules**
   - Click on **Firestore Database** in the left sidebar
   - Click on the **Rules** tab (next to Data, Indexes, etc.)

3. **Update the Rules**

   Replace your current rules with this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Quotes collection - Allow public to create, authenticated users to read/write
    match /quotes/{quoteId} {
      allow create: if true; // Anyone can submit quotes
      allow read, write, update, delete: if request.auth != null; // Authenticated users can read/write
    }
    
    // Contacts collection - Allow public to create, authenticated users to read/write
    match /contacts/{contactId} {
      allow create: if true; // Anyone can submit contacts
      allow read, write, update, delete: if request.auth != null; // Authenticated users can read/write
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null;
    }
    
    // Packages/Orders collection
    match /packages/{packageId} {
      allow create: if request.auth != null;
      allow read: if request.auth != null;
      allow update, delete: if request.auth != null;
    }
  }
}
```

4. **Publish the Rules**
   - Click the **Publish** button at the top
   - Wait a few seconds for the rules to propagate

5. **Test**
   - Refresh your admin page
   - The quotes should now load!

## Alternative: More Permissive Rules (For Development Only)

If you want to test quickly without authentication checks, you can use these rules (⚠️ **NOT FOR PRODUCTION**):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // ⚠️ Allows anyone to read/write - ONLY FOR TESTING!
    }
  }
}
```

**⚠️ WARNING:** The above rules allow anyone to read/write your database. Only use this for development/testing. For production, use the authenticated rules above.

## After Updating Rules

1. Refresh your browser
2. Navigate to `/admin/quotes`
3. Quotes should now load from Firebase
4. Check the browser console - you should see "✅ Successfully synced X quotes from Firebase to store"

## Verify Rules Are Applied

1. Go back to Firebase Console > Firestore > Rules
2. You should see your updated rules
3. The rules take effect immediately after publishing
