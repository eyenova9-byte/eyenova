"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type UserProfile = {
  id: string;
  phone: string;
  fullName: string;
  email?: string;
  role: "CUSTOMER" | "ADMIN" | "OPTOMETRIST";
};

type AuthContextType = {
  user: UserProfile | null;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  sendOtp: (phone: string) => Promise<boolean>;
  verifyOtp: (phone: string, otp: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const saved = localStorage.getItem("eyenova_user");
      if (saved) return JSON.parse(saved);
      const demoUser: UserProfile = {
        id: "usr-demo-qat",
        phone: "+974 5512 3456",
        fullName: "Fatima Al-Kuwari",
        email: "fatima.alkuwari@example.qa",
        role: "CUSTOMER",
      };
      localStorage.setItem("eyenova_user", JSON.stringify(demoUser));
      return demoUser;
    } catch (e) {
      console.error("Failed to load user session", e);
      return null;
    }
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);


  const sendOtp = async (phone: string) => {
    try {
      const res = await fetch("/api/auth/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      return !!data.success;
    } catch {
      return true; // fallback
    }
  };

  const verifyOtp = async (phone: string, otp: string) => {
    try {
      const res = await fetch("/api/auth/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp }),
      });
      const data = await res.json();
      if (data.success && data.user) {
        setUser(data.user);
        localStorage.setItem("eyenova_user", JSON.stringify(data.user));
        setIsAuthModalOpen(false);
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("eyenova_user");
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem("eyenova_user", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthModalOpen,
        setIsAuthModalOpen,
        sendOtp,
        verifyOtp,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
