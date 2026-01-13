# End-to-End Test Guide for Quote System

## Test Flow

### 1. Quote Submission (Home Page)
- User fills out quote form on home page
- Quote is saved to in-memory store (instant)
- Quote is synced to Firebase (background)
- User sees success message

### 2. Admin View (Admin Panel)
- Admin navigates to quotes page
- Quotes are loaded from in-memory store
- Quotes appear immediately
- Admin can filter by status
- Admin can update quote status
- Changes sync to Firebase in background

### 3. Data Persistence
- App reloads
- Data syncs from Firebase to in-memory store
- All quotes are available immediately

## Manual Test Steps

### Test 1: Submit Quote
1. Open home page: `http://localhost:4200`
2. Scroll to "Request a Free Quote" section
3. Fill out the form:
   - Name: Test User
   - Email: test@example.com
   - Contact: +254712345678
   - Service Type: Same-Day Delivery
   - Pickup: Nairobi CBD
   - Delivery: Westlands
   - Weight: 5kg
   - Additional Services: Express Delivery
4. Click "Request a Quote"
5. **Expected**: Success message appears
6. **Check Console**: Should see "Quote added to in-memory store"

### Test 2: View Quote in Admin
1. Login to admin panel: `http://localhost:4200/login`
2. Navigate to Quotes page
3. **Expected**: Quote appears in "Pending" tab
4. **Check Console**: Should see "Quotes loaded: [...]"

### Test 3: Update Quote Status
1. In admin quotes page, click "Mark Processing"
2. **Expected**: Quote status changes to "PROCESSING"
3. **Check Console**: Should see sync messages

### Test 4: Filter Quotes
1. Click "All" filter
2. **Expected**: All quotes appear
3. Click "Pending" filter
4. **Expected**: Only pending quotes appear

### Test 5: Data Persistence
1. Submit a new quote
2. Reload the page (F5)
3. Navigate to admin quotes page
4. **Expected**: All quotes still visible (loaded from Firebase)

## Console Checks

### On Quote Submission
```
Quote added to in-memory store: {id: "...", name: "...", ...}
Quote synced to Firebase successfully
```

### On Admin Page Load
```
Quotes loaded: [{id: "...", name: "...", ...}]
```

### On App Startup
```
Initializing application...
Synced X quotes from Firebase
Application initialized successfully
```

## Common Issues & Solutions

### Issue: Quotes not appearing
**Check:**
1. Browser console for errors
2. Firebase Console - are quotes in Firestore?
3. Network tab - are Firebase requests successful?

**Solution:**
- Check Firebase connection
- Verify Firestore rules allow read/write
- Check if sync is running (look for "Synced X quotes from Firebase")

### Issue: Quote not syncing to Firebase
**Check:**
1. Console for "Background sync failed" errors
2. Network connection
3. Firebase project configuration

**Solution:**
- Check Firebase config in `firebase.config.ts`
- Verify internet connection
- Check Firebase Console for errors

### Issue: Date not displaying
**Check:**
1. Console for date formatting errors
2. Quote object structure

**Solution:**
- `formatDate()` method handles all date formats
- Check if `createdAt` field exists in quote object

## Automated Test Commands

### Check In-Memory Store
Open browser console and run:
```javascript
// Check quotes in store
// This requires accessing the service directly
```

### Check Firebase
1. Go to Firebase Console
2. Navigate to Firestore Database
3. Check `quotes` collection
4. Verify quotes are being saved

## Expected Behavior

✅ **Instant Updates**: Quotes appear immediately in admin panel
✅ **Background Sync**: Firebase sync happens without blocking UI
✅ **Offline Support**: Quotes saved to memory even if offline
✅ **Persistence**: Quotes survive page reloads
✅ **Real-time**: Changes reflect immediately via reactive observables

## Test Checklist

- [ ] Quote submission works
- [ ] Quote appears in admin panel
- [ ] Quote syncs to Firebase
- [ ] Quote persists after page reload
- [ ] Status update works
- [ ] Filtering works
- [ ] Date formatting works
- [ ] No console errors
- [ ] Firebase sync successful
