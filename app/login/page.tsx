"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/auth";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const { checkUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loginSuccess, setLoginSuccess] = useState(false);

  // 회원가입 성공 정보 확인
  useEffect(() => {
    if (typeof window !== "undefined") {
      const registrationSuccess = localStorage.getItem("registrationSuccess");
      const registeredEmail = localStorage.getItem("registeredEmail");

      if (registrationSuccess === "true" && registeredEmail) {
        setFormData((prev) => ({ ...prev, email: registeredEmail }));
        toast.success("회원가입이 완료되었습니다. 로그인해주세요.");

        // 사용 후 삭제
        localStorage.removeItem("registrationSuccess");
        localStorage.removeItem("registeredEmail");
      }
    }
  }, []);

  // 로그인 성공 후 리다이렉션
  useEffect(() => {
    if (loginSuccess) {
      // 더 확실한 새로고침 방법: 브라우저의 URL을 직접 변경
      localStorage.setItem("forceLogin", "true");
      localStorage.setItem("loginTimestamp", Date.now().toString());
      window.location.href = "/";
    }
  }, [loginSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { user, error } = await signIn(formData.email, formData.password);

      if (error) {
        toast.error(error.message);
        setIsLoading(false);
        return;
      }

      // 세션 정보 확인 및 상태 업데이트
      await checkUser();

      toast.success("로그인되었습니다!");

      // 로그인 성공 상태 설정 - useEffect에서 리다이렉션 처리
      setLoginSuccess(true);
    } catch (error) {
      toast.error("로그인 중 오류가 발생했습니다.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-lg border bg-card p-8 shadow-lg">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">로그인</h1>
          <p className="text-sm text-muted-foreground">
            이메일과 비밀번호를 입력하여 로그인하세요
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              placeholder="이메일을 입력하세요"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              placeholder="비밀번호를 입력하세요"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || loginSuccess}
          >
            {isLoading
              ? "처리 중..."
              : loginSuccess
              ? "리다이렉션 중..."
              : "로그인"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          계정이 없으신가요?{" "}
          <Link
            href="/register"
            className="underline underline-offset-4 hover:text-primary"
          >
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
