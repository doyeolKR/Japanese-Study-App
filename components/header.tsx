"use client";

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

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          일본어 학습
        </Link>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>학습하기</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 w-[400px]">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/study"
                      className="block p-3 space-y-1 hover:bg-muted rounded-md"
                    >
                      <div className="font-medium">학습 시작하기</div>
                      <p className="text-sm text-muted-foreground">
                        단어, 문법, 회화 학습 선택하기
                      </p>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/vocabulary"
                      className="block p-3 space-y-1 hover:bg-muted rounded-md"
                    >
                      <div className="font-medium">단어 학습</div>
                      <p className="text-sm text-muted-foreground">
                        플래시카드로 JLPT 단어 학습하기
                      </p>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/grammar"
                      className="block p-3 space-y-1 hover:bg-muted rounded-md"
                    >
                      <div className="font-medium">문법 학습</div>
                      <p className="text-sm text-muted-foreground">
                        일본어 문법 패턴 마스터하기
                      </p>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/conversation"
                      className="block p-3 space-y-1 hover:bg-muted rounded-md"
                    >
                      <div className="font-medium">회화 연습</div>
                      <p className="text-sm text-muted-foreground">
                        AI와 함께 회화 연습하기
                      </p>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/kana"
                      className="block p-3 space-y-1 hover:bg-muted rounded-md"
                    >
                      <div className="font-medium">히라가나/카타카나</div>
                      <p className="text-sm text-muted-foreground">
                        일본어의 기초 문자를 학습하기
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button variant="outline" asChild>
            <Link href="/login">로그인</Link>
          </Button>
          <Button asChild>
            <Link href="/register">회원가입</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
