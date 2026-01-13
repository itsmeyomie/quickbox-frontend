// This script helps create the admin user document in Firestore
// Run this in the browser console after Firebase is initialized, or use Firebase Console

// User details from Firebase Authentication
const userData = {
  uid: 'zkTz8o0BpOQWCcL3ifWY4MQNAtT2',
  email: 'info@quickboxcourier.co.ke',
  fullName: 'QuickBox Admin',
  role: 'ADMIN',
  active: true,
  createdAt: new Date()
};

// To add this user to Firestore, you can:
// 1. Use Firebase Console: Go to Firestore > Add document > Collection: users > Document ID: zkTz8o0BpOQWCcL3ifWY4MQNAtT2
// 2. Or use this code in browser console after logging in to Firebase

console.log('User data to add to Firestore:');
console.log(JSON.stringify(userData, null, 2));
