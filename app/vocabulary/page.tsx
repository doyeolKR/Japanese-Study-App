import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { JLPT_LEVELS } from "@/services/vocabulary"

export default function VocabularyLevelPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4">JLPT 단어 학습</h1>
        <p className="text-muted-foreground text-center mb-8">
          학습하고자 하는 JLPT 레벨을 선택해주세요
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {JLPT_LEVELS.map((level) => (
            <Link key={level} href={`/vocabulary/${level}`} prefetch={true}>
              <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="text-center">{level}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    JLPT {level} 필수 단어
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

