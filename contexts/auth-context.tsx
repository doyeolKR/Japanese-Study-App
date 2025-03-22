"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/lib/types/auth";
import { getCurrentUser, signOut } from "@/lib/auth";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  checkUser: () => Promise<User | null>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // 로컬 스토리지에서 로그인 상태 확인만 수행
    if (typeof window !== "undefined") {
      const forceLogin = localStorage.getItem("forceLogin");
      if (forceLogin === "true") {
        localStorage.removeItem("forceLogin");
        window.location.reload();
      }
    }

    // 초기 로딩 상태 해제
    setLoading(false);
  }, []);

  async function checkUser() {
    setLoading(true);
    try {
      const { user: currentUser, error } = await getCurrentUser();

      if (error) {
        setIsAuthenticated(false);
        setUser(null);
        return null;
      }

      if (currentUser) {
        setUser(currentUser);
        setIsAuthenticated(true);
        return currentUser;
      } else {
        setIsAuthenticated(false);
        setUser(null);
        return null;
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function handleSignOut() {
    try {
      const { error } = await signOut();
      if (error) {
        throw error;
      }
      setUser(null);
      setIsAuthenticated(false);
      router.push("/login");
    } catch (error) {
      // 로그아웃 오류 처리
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signOut: handleSignOut,
        checkUser,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
