import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, MessageCircle, Book } from 'lucide-react'
import Link from "next/link"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-6">
          JLPT 중심의 체계적인 일본어 학습
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          N5부터 N1까지 단계별 학습과 발음 교정, 회화 연습을 포함한
          종합 일본어 학습 플랫폼
        </p>
        <Button size="lg" asChild>
          <Link href="/study">학습 시작하기</Link>
        </Button>
      </section>

      <section className="grid md:grid-cols-3 gap-8 mb-16">
        <Link href="/vocabulary">
          <Card className="transition-all hover:shadow-lg hover:-translate-y-1">
            <CardContent className="pt-6">
              <div className="text-center">
                <Book className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                <h3 className="text-xl font-semibold mb-2">단어 학습</h3>
                <p className="text-muted-foreground">
                  플래시카드로 JLPT 필수 단어를 효과적으로 학습
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/grammar">
          <Card className="transition-all hover:shadow-lg hover:-translate-y-1">
            <CardContent className="pt-6">
              <div className="text-center">
                <GraduationCap className="w-12 h-12 mx-auto mb-4 text-green-500" />
                <h3 className="text-xl font-semibold mb-2">문법 학습</h3>
                <p className="text-muted-foreground">
                  명확한 설명과 예문으로
                  일본어 문법을 체계적으로 학습
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/conversation">
          <Card className="transition-all hover:shadow-lg hover:-translate-y-1">
            <CardContent className="pt-6">
              <div className="text-center">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 text-purple-500" />
                <h3 className="text-xl font-semibold mb-2">회화 연습</h3>
                <p className="text-muted-foreground">
                  AI 발음 평가와 함께
                  실전 회화 능력 향상
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </section>

      <section className="bg-muted rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">학습 진도 관리</h2>
        <p className="text-muted-foreground mb-6">
          상세한 진도 추적과 개인별 맞춤 추천으로
          효율적인 학습을 지원합니다
        </p>
        <Button variant="secondary" asChild>
          <Link href="/dashboard">대시보드 보기</Link>
        </Button>
      </section>
    </div>
  )
}

