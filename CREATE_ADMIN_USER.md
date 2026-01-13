# Create Admin User in Firestore

You've created a user in Firebase Authentication. Now you need to create the corresponding user document in Firestore so the user can log in with the correct role.

## User Details
- **Email**: info@quickboxcourier.co.ke
- **Password**: Quickbox@2025!
- **UID**: zkTz8o0BpOQWCcL3ifWY4MQNAtT2

## Method 1: Using Firebase Console (Easiest)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **quickbox-c5fab**
3. Go to **Firestore Database**
4. Click **Start collection** (if no collections exist) or click **Add document**
5. Collection ID: `users`
6. Document ID: `zkTz8o0BpOQWCcL3ifWY4MQNAtT2` (the UID from Authentication)
7. Add the following fields:

| Field | Type | Value |
|-------|------|-------|
| `uid` | string | `zkTz8o0BpOQWCcL3ifWY4MQNAtT2` |
| `email` | string | `info@quickboxcourier.co.ke` |
| `fullName` | string | `QuickBox Admin` |
| `role` | string | `ADMIN` |
| `active` | boolean | `true` |
| `createdAt` | timestamp | (Click "Set" and use current time) |

8. Click **Save**

## Method 2: Using Browser Console

After your Angular app is running and Firebase is initialized, open browser console and run:

```javascript
import { doc, setDoc } from 'firebase/firestore';
import { db } from './app/config/firebase.config';

const userData = {
  uid: 'zkTz8o0BpOQWCcL3ifWY4MQNAtT2',
  email: 'info@quickboxcourier.co.ke',
  fullName: 'QuickBox Admin',
  role: 'ADMIN',
  active: true,
  createdAt: new Date()
};

await setDoc(doc(db, 'users', 'zkTz8o0BpOQWCcL3ifWY4MQNAtT2'), userData);
console.log('Admin user created successfully!');
```

## Method 3: Using Firebase CLI

If you have Firebase CLI installed:

```bash
firebase firestore:set users/zkTz8o0BpOQWCcL3ifWY4MQNAtT2 '{
  "uid": "zkTz8o0BpOQWCcL3ifWY4MQNAtT2",
  "email": "info@quickboxcourier.co.ke",
  "fullName": "QuickBox Admin",
  "role": "ADMIN",
  "active": true,
  "createdAt": "2026-01-13T00:00:00Z"
}'
```

## Verify

After creating the user document:

1. Try logging in with:
   - Email: `info@quickboxcourier.co.ke`
   - Password: `Quickbox@2025!`

2. You should be redirected to `/admin` dashboard

3. Check Firestore to confirm the document exists at: `users/zkTz8o0BpOQWCcL3ifWY4MQNAtT2`

## Troubleshooting

- **Can't log in**: Make sure the user document exists in Firestore with the correct UID
- **Wrong role**: Verify the `role` field is set to `ADMIN` (all caps)
- **User disabled**: Make sure `active` is set to `true`
