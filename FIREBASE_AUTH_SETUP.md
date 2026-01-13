# Firebase Authentication Setup

## Enable Email/Password Sign-in

The 400 error you're seeing is likely because Email/Password authentication is not enabled in Firebase Console.

### Steps to Enable:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **quickbox-c5fab**
3. Go to **Authentication** (in the left sidebar)
4. Click **Get started** (if you haven't set up Authentication yet)
5. Click on the **Sign-in method** tab
6. Find **Email/Password** in the list
7. Click on it
8. **Enable** the first toggle (Email/Password)
9. Optionally enable "Email link (passwordless sign-in)" if you want
10. Click **Save**

### Verify User Exists

1. Still in **Authentication** section
2. Go to **Users** tab
3. Verify that the user with email `info@quickboxcourier.co.ke` exists
4. If it doesn't exist, click **Add user** and create it

### Create Firestore User Document

After enabling Email/Password and verifying the user exists in Authentication:

1. Go to **Firestore Database**
2. Create collection: `users` (if it doesn't exist)
3. Add document with ID: `zkTz8o0BpOQWCcL3ifWY4MQNAtT2`
4. Add these fields:
   - `uid`: `zkTz8o0BpOQWCcL3ifWY4MQNAtT2` (string)
   - `email`: `info@quickboxcourier.co.ke` (string)
   - `fullName`: `QuickBox Admin` (string)
   - `role`: `ADMIN` (string)
   - `active`: `true` (boolean)
   - `createdAt`: (timestamp - current time)

### Test Login

After completing the above steps:

1. Try logging in with:
   - Email: `info@quickboxcourier.co.ke`
   - Password: `Quickbox@2025!`

2. You should be redirected to `/admin` dashboard

### Common Errors and Solutions

- **400 Bad Request**: Email/Password not enabled → Enable it in Firebase Console
- **auth/user-not-found**: User doesn't exist in Authentication → Create user in Authentication
- **auth/wrong-password**: Incorrect password → Check password
- **User data not found**: Firestore document missing → Create user document in Firestore
- **User account is disabled**: `active` field is `false` → Set `active` to `true` in Firestore
