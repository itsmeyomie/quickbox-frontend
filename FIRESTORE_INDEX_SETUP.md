# Firestore Index Setup

## Issue: Quotes Not Showing

If you're not seeing quotes in the admin section, it might be because Firestore needs an index for the query.

## Automatic Index Creation

When you run the app and try to load quotes, Firestore will show an error in the console with a link to create the required index. Click that link to create it automatically.

## Manual Index Creation

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **quickbox-c5fab**
3. Go to **Firestore Database**
4. Click on the **Indexes** tab
5. Click **Create Index**

### Index for Quotes with Status Filter

Create this index:

- **Collection ID**: `quotes`
- **Fields to index**:
  1. `status` (Ascending)
  2. `createdAt` (Descending)
- **Query scope**: Collection

### Index for Quotes without Status Filter

Create this index:

- **Collection ID**: `quotes`
- **Fields to index**:
  1. `createdAt` (Descending)
- **Query scope**: Collection

## Alternative: Remove orderBy Temporarily

If you want to test without creating indexes, the code will automatically fall back to loading without `orderBy` and sort manually. However, for production, you should create the indexes.

## Check Firestore Data

1. Go to **Firestore Database**
2. Check if the `quotes` collection exists
3. Check if there are any documents in it
4. Verify the documents have:
   - `status` field (should be "PENDING", "PROCESSING", "QUOTED", etc.)
   - `createdAt` field (timestamp)

## Security Rules

Make sure your Firestore security rules allow reading quotes for authenticated admin users:

```javascript
match /quotes/{quoteId} {
  allow create: if true; // Public can submit
  allow read, write: if request.auth != null && 
    request.auth.token.admin == true;
}
```

Note: The `request.auth.token.admin` requires custom claims. For now, you can use a simpler rule:

```javascript
match /quotes/{quoteId} {
  allow create: if true;
  allow read, write: if request.auth != null;
}
```

Then check the user's role in your code (which we're already doing).
