# Fix Firebase Storage Permission Error

If you see: **"User does not have permission to access 'videos/delivery-process.mp4' (storage/unauthorized)"**

## Quick fix – update rules in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Open **Storage** in the left sidebar
4. Go to the **Rules** tab
5. Replace the rules with:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /videos/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /pod/{podId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

6. Click **Publish**

## What these rules do

- **Videos**: Anyone can read (so the home page can show the video). Only signed-in users can upload or delete (your admin panel is protected by login).
- **POD**: Only signed-in users can read and write proof-of-delivery files.

## If you use Firebase CLI

If your project uses `firebase deploy`, you can add `storage.rules` to your config and deploy:

1. Copy `storage.rules` from this project root
2. Add to `firebase.json`:
   ```json
   "storage": {
     "rules": "storage.rules"
   }
   ```
3. Run: `firebase deploy --only storage`
