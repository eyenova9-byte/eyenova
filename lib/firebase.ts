// ============================================================================
// EyeNova Qatar - Google Firebase Client Initialization
// Tier: 10,000 Phone SMS Verifications / month for 100% FREE ($0.00)
// ============================================================================

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDemoKeyEyeNovaQatar123456",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "eyenova-qatar.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "eyenova-qatar",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "eyenova-qatar.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:1234567890:web:abcdef123456",
};

// Initialize Firebase (Singleton)
export const firebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);

/**
 * Setup Invisible reCAPTCHA for Free SMS OTP Dispatch
 */
export function setupRecaptcha(containerId: string): RecaptchaVerifier {
  if (typeof window === "undefined") {
    throw new Error("RecaptchaVerifier can only be created in browser environment");
  }

  // Clear existing verifier if present
  if ((window as any).recaptchaVerifier) {
    try {
      (window as any).recaptchaVerifier.clear();
    } catch (e) {
      // ignore
    }
  }

  const verifier = new RecaptchaVerifier(firebaseAuth, containerId, {
    size: "invisible",
    callback: () => {
      // reCAPTCHA solved
    },
    "expired-callback": () => {
      console.warn("reCAPTCHA expired. Please try again.");
    },
  });

  (window as any).recaptchaVerifier = verifier;
  return verifier;
}

export type { ConfirmationResult };
