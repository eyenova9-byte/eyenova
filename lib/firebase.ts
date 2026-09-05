// ============================================================================
// EyeNova Qatar - Google Firebase Client Initialization
// Tier: 10,000 Phone SMS Verifications / month for 100% FREE ($0.00)
// ============================================================================

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from "firebase/auth";

const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
export const isFirebaseConfigured = Boolean(
  apiKey &&
  apiKey !== "AIzaSyDemoKeyEyeNovaQatar123456" &&
  apiKey.startsWith("AIzaSy")
);

const firebaseConfig = {
  apiKey: apiKey || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "eyenova-qatar.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "eyenova-qatar",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "eyenova-qatar.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:1234567890:web:abcdef123456",
};

// Initialize Firebase only if valid keys are provided
export const firebaseApp = isFirebaseConfigured
  ? (getApps().length > 0 ? getApp() : initializeApp(firebaseConfig))
  : null;

export const firebaseAuth = firebaseApp ? getAuth(firebaseApp) : null;

/**
 * Setup Invisible reCAPTCHA for Free SMS OTP Dispatch
 */
export function setupRecaptcha(containerId: string): RecaptchaVerifier | null {
  if (typeof window === "undefined" || !firebaseAuth) {
    return null;
  }

  // Clear existing verifier if present
  if ((window as any).recaptchaVerifier) {
    try {
      (window as any).recaptchaVerifier.clear();
    } catch {
      // ignore
    }
  }

  try {
    const verifier = new RecaptchaVerifier(firebaseAuth, containerId, {
      size: "invisible",
      callback: () => {},
      "expired-callback": () => {
        console.warn("reCAPTCHA expired. Please try again.");
      },
    });

    (window as any).recaptchaVerifier = verifier;
    return verifier;
  } catch (err) {
    console.warn("Could not create RecaptchaVerifier:", err);
    return null;
  }
}

export type { ConfirmationResult };
