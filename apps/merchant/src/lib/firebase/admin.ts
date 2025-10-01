import "server-only";

import admin from "firebase-admin";

interface FirebaseAdminAppParams {
  projectId: string;
  clientEmail: string;
  storageBucket: string;
  privateKey: string;
}

function formatPrivateKey(key: string) {
  return key.replace(/\\n/g, "\n");
}

export function createFirebaseAdminApp(params: FirebaseAdminAppParams) {
  const privateKey = formatPrivateKey(params.privateKey);

  if (admin.apps.length > 0) {
    return admin.app();
  }

  const cert = admin.credential.cert({
    projectId: params.projectId,
    clientEmail: params.clientEmail,
    privateKey,
  });

  return admin.initializeApp({
    credential: cert,
    projectId: params.projectId,
    storageBucket: params.storageBucket,
  });
}

export async function initAdmin() {
  const params = {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
    clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL as string,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
    privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY as string,
  };

  // Check if all required environment variables are present
  if (
    !params.projectId ||
    !params.clientEmail ||
    !params.storageBucket ||
    !params.privateKey
  ) {
    throw new Error("Missing required Firebase environment variables");
  }

  return createFirebaseAdminApp(params);
}

// Lazy initialization - only initialize when needed
let _adminAuth: admin.auth.Auth | null = null;
let _adminFirestore: admin.firestore.Firestore | null = null;

export function getAdminAuth() {
  if (!_adminAuth) {
    if (admin.apps.length === 0) {
      throw new Error(
        "Firebase admin not initialized. Call initAdmin() first.",
      );
    }
    _adminAuth = admin.auth();
  }
  return _adminAuth;
}

export function getAdminFirestore() {
  if (!_adminFirestore) {
    if (admin.apps.length === 0) {
      throw new Error(
        "Firebase admin not initialized. Call initAdmin() first.",
      );
    }
    _adminFirestore = admin.firestore();
  }
  return _adminFirestore;
}
