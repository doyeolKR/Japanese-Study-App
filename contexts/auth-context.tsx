"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/lib/types/auth";
import { getCurrentUser, signOut } from "@/lib/auth";
import { usePathname, useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  checkUser: () => Promise<User | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // 비인증 페이지 목록 (로그인, 회원가입 등)
  const publicPaths = ["/login", "/register", "/verify-email", "/"];

  useEffect(() => {
    const checkAuthStatus = async () => {
      // 랜딩 페이지나 비인증 페이지에서는 인증 체크를 스킵
      if (publicPaths.includes(pathname)) {
        setLoading(false);
        return;
      }

      try {
        const { user: currentUser, error } = await getCurrentUser();

        if (error || !currentUser) {
          // 인증되지 않은 상태에서 보호된 페이지 접근 시 로그인 페이지로 리다이렉트
          if (!publicPaths.includes(pathname)) {
            router.push("/login");
          }
        } else {
          setUser(currentUser);
        }
      } catch (error) {
        // 오류 발생 시 로그인 페이지로 리다이렉트
        if (!publicPaths.includes(pathname)) {
          router.push("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, [pathname]);

  async function checkUser() {
    try {
      const { user: currentUser, error } = await getCurrentUser();

      if (error) {
        throw error;
      }

      setUser(currentUser);
      return currentUser;
    } catch (error) {
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
      }}
    >
      {publicPaths.includes(pathname) ? (
        children
      ) : loading ? (
        // 로딩 상태일 때 표시할 컴포넌트
        <div className="flex h-screen w-full items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
        </div>
      ) : (
        children
      )}
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
