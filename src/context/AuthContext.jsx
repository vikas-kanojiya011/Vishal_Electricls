import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { auth } from "../services/firebase";

// ───────────────────────────────────────────────
// Auth Context
// ───────────────────────────────────────────────
const AuthContext = createContext();

const STORAGE_KEY = "ve_auth_user_v1";

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading]       = useState(false);
  const [authError, setAuthError]       = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const recaptchaVerifierRef = useRef(null);

  // Sync Firebase auth state (handles token refresh across sessions)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userData = {
          uid: firebaseUser.uid,
          phoneNumber: firebaseUser.phoneNumber,
          displayName: firebaseUser.displayName || null,
        };
        setCurrentUser(userData);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      }
      // Note: we don't clear here to allow manual logout control
    });
    return () => unsubscribe();
  }, []);

  // ── Initialize invisible reCAPTCHA ──
  const setupRecaptcha = useCallback((containerId = "recaptcha-container") => {
    // Clean up previous instance if it exists
    if (recaptchaVerifierRef.current) {
      try { recaptchaVerifierRef.current.clear(); } catch { /* ignore */ }
      recaptchaVerifierRef.current = null;
    }
    recaptchaVerifierRef.current = new RecaptchaVerifier(auth, containerId, {
      size: "invisible",
      callback: () => {}, // fires when reCAPTCHA token is ready
    });
  }, []);

  // ── Step 1: Send OTP ──
  const sendOtp = useCallback(async (phoneNumber, containerId = "recaptcha-container") => {
    setAuthError("");
    setIsLoading(true);
    try {
      setupRecaptcha(containerId);
      const formattedPhone = phoneNumber.startsWith("+")
        ? phoneNumber
        : `+91${phoneNumber.replace(/\D/g, "")}`;

      const result = await signInWithPhoneNumber(auth, formattedPhone, recaptchaVerifierRef.current);
      setConfirmationResult(result);
      setIsLoading(false);
      return { success: true };
    } catch (err) {
      setIsLoading(false);
      const msg = mapFirebaseError(err.code);
      setAuthError(msg);
      // Reset reCAPTCHA on error
      if (recaptchaVerifierRef.current) {
        try { recaptchaVerifierRef.current.clear(); } catch { /* ignore */ }
        recaptchaVerifierRef.current = null;
      }
      return { success: false, error: msg };
    }
  }, [setupRecaptcha]);

  // ── Step 2: Verify OTP ──
  const verifyOtp = useCallback(async (otp) => {
    if (!confirmationResult) {
      const msg = "Session expired. Please request a new OTP.";
      setAuthError(msg);
      return { success: false, error: msg };
    }
    setAuthError("");
    setIsLoading(true);
    try {
      const credential = await confirmationResult.confirm(otp);
      const firebaseUser = credential.user;
      const userData = {
        uid: firebaseUser.uid,
        phoneNumber: firebaseUser.phoneNumber,
        displayName: firebaseUser.displayName || null,
      };
      setCurrentUser(userData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      setConfirmationResult(null);
      setIsLoading(false);
      return { success: true, user: userData };
    } catch (err) {
      setIsLoading(false);
      const msg = mapFirebaseError(err.code);
      setAuthError(msg);
      return { success: false, error: msg };
    }
  }, [confirmationResult]);

  // ── Logout ──
  const logout = useCallback(async () => {
    try { await signOut(auth); } catch { /* ignore */ }
    setCurrentUser(null);
    setConfirmationResult(null);
    setAuthError("");
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const clearAuthError = useCallback(() => setAuthError(""), []);

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    isLoading,
    authError,
    confirmationResult,
    sendOtp,
    verifyOtp,
    logout,
    clearAuthError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ── Custom hook ──
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

// ── Firebase error code → human-readable message ──
function mapFirebaseError(code) {
  const map = {
    "auth/invalid-phone-number":      "Please enter a valid 10-digit mobile number.",
    "auth/too-many-requests":         "Too many attempts. Please wait a few minutes and try again.",
    "auth/invalid-verification-code": "Incorrect OTP. Please check and re-enter the 6-digit code.",
    "auth/code-expired":              "OTP has expired. Please request a new one.",
    "auth/quota-exceeded":            "SMS quota exceeded. Please try again later.",
    "auth/missing-phone-number":      "Mobile number is required.",
    "auth/network-request-failed":    "Network error. Please check your internet connection.",
    "auth/user-disabled":             "This account has been disabled. Contact support.",
    "auth/missing-app-credential":    "Firebase is not configured. Please add your .env keys.",
    "auth/app-not-authorized":        "This domain is not authorized. Add it in Firebase Console → Authentication → Settings → Authorized Domains.",
  };
  return map[code] || "Something went wrong. Please try again.";
}

