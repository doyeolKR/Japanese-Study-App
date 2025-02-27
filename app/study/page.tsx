import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Book, GraduationCap, MessageCircle } from 'lucide-react'
import Link from "next/link"

export default function StudyPage() {
  const studyOptions = [
    {
      title: "단어 학습",
      description: "JLPT 레벨별 필수 단어를 플래시카드로 학습합니다",
      icon: Book,
      href: "/vocabulary",
      color: "text-blue-500",
    },
    {
      title: "문법 학습",
      description: "기초부터 고급까지 체계적인 문법 학습을 진행합니다",
      icon: GraduationCap,
      href: "/grammar",
      color: "text-green-500",
    },
    {
      title: "회화 연습",
      description: "AI와 함께 실전 회화를 연습하고 발음을 교정합니다",
      icon: MessageCircle,
      href: "/conversation",
      color: "text-purple-500",
    },
    {
      title: "히라가나/카타카나",
      description: "일본어의 기초가 되는 문자를 학습합니다",
      icon: Book,
      href: "/kana",
      color: "text-yellow-500",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4">학습 시작하기</h1>
        <p className="text-muted-foreground text-center mb-8">
          원하시는 학습 방법을 선택해주세요
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {studyOptions.map((option) => (
            <Link key={option.href} href={option.href}>
              <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <option.icon className={`w-12 h-12 ${option.color} mx-auto mb-4`} />
                  <CardTitle className="text-center">{option.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {option.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            학습 진행 상황을 확인하고 싶으시다면?
          </p>
          <Link 
            href="/dashboard" 
            className="text-primary hover:underline"
          >
            대시보드로 이동하기
          </Link>
        </div>
      </div>
    </div>
  )
}

