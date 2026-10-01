import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCP_82rX5z1mi0KmrFMuGvb53_8xi-kt_Y",
  authDomain: "balajitraders-2001.firebaseapp.com",
  projectId: "balajitraders-2001",
  storageBucket: "balajitraders-2001.firebasestorage.app",
  messagingSenderId: "557535241169",
  appId: "1:557535241169:web:ca615f386ddb3f28bdf6f0",
  measurementId: "G-Y4BHP0S3Z5"
};

// Initialize Firebase only if it hasn't been initialized already
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firestore and Storage
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics (only available in browser)
export let analytics: any = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export default app;
