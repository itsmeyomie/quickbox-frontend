import { Injectable } from '@angular/core';
import { 
  collection, 
  doc, 
  addDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../config/firebase.config';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDataService {

  // ============ CONTACTS ============
  async submitContact(contact: any): Promise<any> {
    try {
      const docRef = await addDoc(collection(db, 'contacts'), {
        ...contact,
        read: false,
        createdAt: serverTimestamp()
      });
      return { success: true, id: docRef.id, message: 'Contact submitted successfully' };
    } catch (error: any) {
      throw new Error(error.message || 'Failed to submit contact');
    }
  }

  async getContacts(): Promise<any[]> {
    const snapshot = await getDocs(collection(db, 'contacts'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  // ============ QUOTES ============
  async submitQuote(quote: any): Promise<any> {
    try {
      const docRef = await addDoc(collection(db, 'quotes'), {
        ...quote,
        status: 'PENDING',
        createdAt: serverTimestamp()
      });
      return { success: true, data: { id: docRef.id, ...quote, status: 'PENDING' } };
    } catch (error: any) {
      throw new Error(error.message || 'Failed to submit quote');
    }
  }

  async getQuotes(status?: string): Promise<any[]> {
    try {
      let q;
      
      if (status && status !== 'ALL') {
        // Query with status filter and orderBy
        q = query(
          collection(db, 'quotes'), 
          where('status', '==', status),
          orderBy('createdAt', 'desc')
        );
      } else {
        // Query without status filter
        q = query(collection(db, 'quotes'), orderBy('createdAt', 'desc'));
      }
      
      const snapshot = await getDocs(q);
      const quotes = snapshot.docs.map(doc => {
        const data = doc.data();
        return { 
          id: doc.id, 
          ...data,
          createdAt: data['createdAt']?.toDate ? data['createdAt'].toDate() : new Date()
        };
      });
      
      console.log(`Found ${quotes.length} quotes with status: ${status || 'ALL'}`);
      return quotes;
    } catch (error: any) {
      // If index error, try without orderBy
      if (error.code === 'failed-precondition' || error.message?.includes('index')) {
        console.warn('Index error, trying without orderBy:', error.message);
        try {
          let q = query(collection(db, 'quotes'));
          if (status && status !== 'ALL') {
            q = query(q, where('status', '==', status));
          }
          const snapshot = await getDocs(q);
          const quotes = snapshot.docs.map(doc => {
            const data = doc.data();
            return { 
              id: doc.id, 
              ...data,
              createdAt: data['createdAt']?.toDate ? data['createdAt'].toDate() : new Date()
            };
          });
          // Sort manually
          quotes.sort((a, b) => {
            const dateA = a.createdAt instanceof Date ? a.createdAt.getTime() : 0;
            const dateB = b.createdAt instanceof Date ? b.createdAt.getTime() : 0;
            return dateB - dateA;
          });
          return quotes;
        } catch (fallbackError) {
          console.error('Fallback query also failed:', fallbackError);
          throw fallbackError;
        }
      }
      throw error;
    }
  }

  async updateQuoteStatus(id: string, status: string): Promise<void> {
    await updateDoc(doc(db, 'quotes', id), { status });
  }

  async deleteQuote(id: string): Promise<void> {
    await deleteDoc(doc(db, 'quotes', id));
  }

  // ============ PACKAGES/TRACKING ============
  async trackPackage(trackingId: string): Promise<any> {
    try {
      const q = query(collection(db, 'packages'), where('trackingCode', '==', trackingId), limit(1));
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) {
        return { success: false, message: 'Package not found' };
      }
      
      const packageData = snapshot.docs[0].data();
      return {
        success: true,
        data: {
          ...packageData,
          id: snapshot.docs[0].id,
          createdAt: packageData['createdAt']?.toDate() || new Date(),
          updatedAt: packageData['updatedAt']?.toDate() || new Date()
        }
      };
    } catch (error: any) {
      throw new Error(error.message || 'Failed to track package');
    }
  }

  async createPackage(packageData: any): Promise<any> {
    try {
      // Generate tracking code
      const trackingCode = 'QB' + Date.now().toString().slice(-10);
      
      const docRef = await addDoc(collection(db, 'packages'), {
        ...packageData,
        trackingCode,
        status: 'CREATED',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      return { trackingCode, id: docRef.id };
    } catch (error: any) {
      throw new Error(error.message || 'Failed to create package');
    }
  }

  async updatePackageStatus(id: string, status: string): Promise<void> {
    await updateDoc(doc(db, 'packages', id), { 
      status,
      updatedAt: serverTimestamp()
    });
  }

  // ============ ORDERS ============
  async getClientOrders(clientId: string): Promise<any[]> {
    const q = query(
      collection(db, 'packages'),
      where('clientId', '==', clientId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data(),
      createdAt: doc.data()['createdAt']?.toDate() || new Date()
    }));
  }

  async getCodSummary(clientId: string): Promise<any> {
    const orders = await this.getClientOrders(clientId);
    
    let collected = 0;
    let pendingRemittance = 0;
    let remitted = 0;
    
    orders.forEach(order => {
      const codAmount = order.codAmount || 0;
      if (order.status === 'DELIVERED' && order.codCollected) {
        if (order.codRemitted) {
          remitted += codAmount;
        } else {
          pendingRemittance += codAmount;
        }
        collected += codAmount;
      }
    });
    
    return { collected, pendingRemittance, remitted };
  }

  // ============ ADMIN ============
  async getAdminKPIs(): Promise<any> {
    const [packages, quotes, users] = await Promise.all([
      getDocs(collection(db, 'packages')),
      getDocs(query(collection(db, 'quotes'), where('status', '==', 'PENDING'))),
      getDocs(query(collection(db, 'users'), where('role', '==', 'RIDER'), where('active', '==', true)))
    ]);

    const packagesList = packages.docs.map(d => d.data());
    
    const totalOrders = packagesList.length;
    const delivered = packagesList.filter(p => p['status'] === 'DELIVERED').length;
    const failed = packagesList.filter(p => p['status'] === 'RETURNED' || p['status'] === 'FAILED').length;
    const codPending = packagesList
      .filter(p => p['codAmount'] && p['status'] !== 'DELIVERED')
      .reduce((sum, p) => sum + (p['codAmount'] || 0), 0);
    const ridersActive = users.docs.length;
    const pendingQuotes = quotes.docs.length;

    return {
      totalOrders,
      delivered,
      failed,
      codPending,
      ridersActive,
      pendingQuotes
    };
  }

  async getUsers(role?: string): Promise<any[]> {
    let q = query(collection(db, 'users'));
    
    if (role) {
      q = query(q, where('role', '==', role));
    }
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data()
    }));
  }

  async createUser(userData: any): Promise<void> {
    // User creation is handled by FirebaseAuthService
    // This is just for additional user data
    await addDoc(collection(db, 'users'), {
      ...userData,
      active: true,
      createdAt: serverTimestamp()
    });
  }

  async updateUser(userId: string, updates: any): Promise<void> {
    await updateDoc(doc(db, 'users', userId), updates);
  }

  async disableUser(userId: string): Promise<void> {
    await updateDoc(doc(db, 'users', userId), { active: false });
  }

  // ============ RIDER ============
  async getRiderTasks(riderId: string): Promise<any[]> {
    const q = query(
      collection(db, 'packages'),
      where('riderId', '==', riderId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data(),
      order: doc.data(),
      createdAt: doc.data()['createdAt']?.toDate() || new Date()
    }));
  }

  async updateTaskStatus(taskId: string, status: string): Promise<void> {
    await updateDoc(doc(db, 'packages', taskId), { 
      status,
      updatedAt: serverTimestamp()
    });
  }

  async submitPOD(taskId: string, podData: any, imageFile?: File): Promise<void> {
    const updates: any = {
      podSubmitted: true,
      podData: {
        receiverName: podData.receiverName,
        receiverPhone: podData.receiverPhone,
        notes: podData.notes,
        submittedAt: serverTimestamp()
      },
      updatedAt: serverTimestamp()
    };

    if (imageFile) {
      const imageUrl = await this.uploadFile(`pod/${taskId}`, imageFile);
      updates.podData.imageUrl = imageUrl;
    }

    await updateDoc(doc(db, 'packages', taskId), updates);
  }

  async submitCOD(taskId: string, codData: any): Promise<void> {
    await updateDoc(doc(db, 'packages', taskId), {
      codCollected: true,
      codData: {
        amount: codData.amount,
        collectedAt: serverTimestamp()
      },
      updatedAt: serverTimestamp()
    });
  }

  // ============ DISPATCHER ============
  async getCreatedOrders(): Promise<any[]> {
    const q = query(
      collection(db, 'packages'),
      where('status', '==', 'CREATED'),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data(),
      createdAt: doc.data()['createdAt']?.toDate() || new Date()
    }));
  }

  async getLiveOrders(): Promise<any[]> {
    const q = query(
      collection(db, 'packages'),
      where('status', 'in', ['IN_TRANSIT', 'OUT_FOR_DELIVERY']),
      orderBy('updatedAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data(),
      updatedAt: doc.data()['updatedAt']?.toDate() || new Date()
    }));
  }

  async getAvailableRiders(): Promise<any[]> {
    const q = query(
      collection(db, 'users'),
      where('role', '==', 'RIDER'),
      where('active', '==', true)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data()
    }));
  }

  async assignOrder(orderId: string, riderId: string): Promise<void> {
    await updateDoc(doc(db, 'packages', orderId), {
      riderId,
      status: 'ASSIGNED',
      assignedAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  }

  // ============ VIDEO ============
  async uploadVideo(file: File): Promise<string> {
    try {
      const videoRef = ref(storage, `videos/delivery-process.mp4`);
      await uploadBytes(videoRef, file);
      return await getDownloadURL(videoRef);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to upload video');
    }
  }

  async getVideoInfo(): Promise<any> {
    try {
      const videoRef = ref(storage, `videos/delivery-process.mp4`);
      const url = await getDownloadURL(videoRef);
      return { exists: true, url, fileName: 'delivery-process.mp4' };
    } catch (error: any) {
      return { exists: false };
    }
  }

  async deleteVideo(): Promise<void> {
    const videoRef = ref(storage, `videos/delivery-process.mp4`);
    await deleteObject(videoRef);
  }

  // ============ REPORTS ============
  async getOrdersReport(fromDate?: string, toDate?: string): Promise<any[]> {
    let q = query(collection(db, 'packages'), orderBy('createdAt', 'desc'));
    
    const snapshot = await getDocs(q);
    let orders = snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data(),
      createdAt: doc.data()['createdAt']?.toDate() || new Date()
    }));

    // Filter by date if provided
    if (fromDate) {
      const from = new Date(fromDate);
      orders = orders.filter(o => o.createdAt >= from);
    }
    if (toDate) {
      const to = new Date(toDate);
      to.setHours(23, 59, 59, 999);
      orders = orders.filter(o => o.createdAt <= to);
    }

    return orders;
  }

  async getCodReport(fromDate?: string, toDate?: string): Promise<any[]> {
    const orders = await this.getOrdersReport(fromDate, toDate);
    return orders
      .filter(o => o.codAmount && o.codCollected)
      .map(o => ({
        order: { trackingCode: o.trackingCode },
        amount: o.codAmount,
        status: o.codRemitted ? 'REMITTED' : 'PENDING',
        rider: o.riderId,
        client: o.clientId,
        collectedAt: o.codData?.collectedAt?.toDate() || o.createdAt
      }));
  }

  // ============ UTILITY ============
  async uploadFile(path: string, file: File): Promise<string> {
    const fileRef = ref(storage, path);
    await uploadBytes(fileRef, file);
    return await getDownloadURL(fileRef);
  }
}
