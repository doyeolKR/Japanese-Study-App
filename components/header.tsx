"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "./mode-toggle";
import { useAuth } from "@/contexts/auth-context";
import { cn } from "@/lib/utils";

const learningItems = [
  {
    title: "학습 시작하기",
    href: "/study",
    description: "단어, 문법, 회화 학습 선택하기",
  },
  {
    title: "단어 학습",
    href: "/vocabulary",
    description: "플래시카드로 JLPT 단어 학습하기",
  },
  {
    title: "문법 학습",
    href: "/grammar",
    description: "일본어 문법 패턴 마스터하기",
  },
  {
    title: "회화 연습",
    href: "/conversation",
    description: "AI와 함께 회화 연습하기",
  },
  {
    title: "히라가나/카타카나",
    href: "/kana",
    description: "일본어 기초 문자 학습하기",
  },
];

const ListItem = ({
  className,
  title,
  href,
  children,
}: {
  className?: string;
  title: string;
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};

export function Header() {
  const { user, signOut, checkUser, isAuthenticated } = useAuth();
  const [mounted, setMounted] = useState(false);

  // 컴포넌트가 마운트되면 인증 상태를 확인
  useEffect(() => {
    const init = async () => {
      try {
        await checkUser();
        setMounted(true);
      } catch (error) {
        setMounted(true);
      }
    };

    init();
  }, [checkUser]);

  // localStorage에서 forceLogin 확인
  useEffect(() => {
    if (typeof window !== "undefined") {
      const forceLogin = localStorage.getItem("forceLogin");

      if (forceLogin === "true") {
        // 세션 스토리지 정보 초기화
        localStorage.removeItem("forceLogin");

        // 강제 새로고침 (1회만)
        window.location.reload();
      }
    }
  }, []);

  const handleSignOut = async () => {
    await signOut();
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          일본어 학습
        </Link>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>학습하기</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-1 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {learningItems.map((item) => (
                    <ListItem
                      key={item.title}
                      title={item.title}
                      href={item.href}
                    >
                      {item.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-4">
          <ModeToggle />
          {mounted && isAuthenticated ? (
            <Button variant="outline" onClick={handleSignOut}>
              로그아웃
            </Button>
          ) : (
            <>
              <Button variant="outline" asChild>
                <Link href="/login">로그인</Link>
              </Button>
              <Button asChild>
                <Link href="/register">회원가입</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
