"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  signUp,
  verifyEmail,
  resendVerificationEmail,
  createUserProfile,
} from "@/lib/auth";
import { toast } from "sonner";
import { createClient } from "@supabase/supabase-js";

// Supabase 클라이언트 초기화
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    verificationCode: "",
  });
  const [userId, setUserId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!isVerifying) {
        const { user, error } = await signUp(formData.email, formData.password);

        if (error) {
          toast.error(error.message);
          setIsLoading(false);
          return;
        }

        // 사용자 ID 저장
        if (user) {
          setUserId(user.id);
        }

        toast.success("이메일로 인증번호가 전송되었습니다!");

        // 처리 완료 후 로딩 상태 해제 및 인증 상태로 변경
        setIsLoading(false);
        setIsVerifying(true);
      } else {
        const { error } = await verifyEmail(
          formData.email,
          formData.verificationCode
        );
        if (error) {
          toast.error(error.message);
          setIsLoading(false);
          return;
        }

        // 프로필 생성
        if (userId) {
          const { profile, error: profileError } = await createUserProfile(
            userId,
            formData.email
          );

          if (profileError) {
            toast.error(profileError.message);
            setIsLoading(false);
            return;
          }

          toast.success("회원가입이 완료되었습니다!");
        }

        toast.success("이메일 인증이 완료되었습니다!");

        // 회원가입 성공 정보 저장
        localStorage.setItem("registrationSuccess", "true");
        localStorage.setItem("registeredEmail", formData.email);

        // 인증 완료 후 로그인 페이지로 이동
        setIsLoading(false);
        router.push("/login");
      }
    } catch (error) {
      toast.error(
        isVerifying
          ? "인증 중 오류가 발생했습니다."
          : "회원가입 중 오류가 발생했습니다."
      );
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    try {
      const { error } = await resendVerificationEmail(formData.email);
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success("인증번호가 다시 전송되었습니다!");
    } catch (error) {
      toast.error("인증번호 재전송 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-lg border bg-card p-8 shadow-lg">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            {isVerifying ? "이메일 인증" : "회원가입"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isVerifying
              ? `${formData.email}로 전송된 인증번호를 입력해주세요`
              : "이메일과 비밀번호를 입력하여 회원가입하세요"}
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
              disabled={isVerifying}
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
              disabled={isVerifying}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="verificationCode">인증번호</Label>
            <Input
              id="verificationCode"
              placeholder="이메일로 전송된 인증번호를 입력하세요"
              value={formData.verificationCode}
              onChange={(e) =>
                setFormData({ ...formData, verificationCode: e.target.value })
              }
              required={isVerifying}
              disabled={!isVerifying}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "처리 중..." : isVerifying ? "인증하기" : "회원가입"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          {isVerifying ? (
            <>
              인증번호를 받지 못하셨나요?{" "}
              <Button
                variant="link"
                className="p-0 text-primary"
                onClick={handleResendCode}
                disabled={isLoading}
              >
                다시 받기
              </Button>
            </>
          ) : (
            <>
              이미 계정이 있으신가요?{" "}
              <Link
                href="/login"
                className="underline underline-offset-4 hover:text-primary"
              >
                로그인
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
