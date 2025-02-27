import { Card, CardContent } from "@/components/ui/card"
import { getTotalWordCount, WORDS_PER_CHAPTER } from "@/services/vocabulary"
import Link from "next/link"

interface VocabularyLevelContentProps {
  level: string;
}

export async function VocabularyLevelContent({ level }: VocabularyLevelContentProps) {
  const totalWords = await getTotalWordCount(level)
  const totalChapters = Math.ceil(totalWords / WORDS_PER_CHAPTER)

  const getChapterWordCount = (chapter: number) => {
    if (chapter < totalChapters) {
      return WORDS_PER_CHAPTER
    }
    const remainingWords = totalWords % WORDS_PER_CHAPTER
    return remainingWords === 0 ? WORDS_PER_CHAPTER : remainingWords
  }

  if (totalWords === 0) {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">
          준비 중입니다
        </h1>
        <p className="text-muted-foreground">
          해당 레벨의 단어가 아직 준비되지 않았습니다.
        </p>
      </div>
    )
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-4">
        JLPT {level} 단어
      </h1>
      <p className="text-muted-foreground text-center mb-8">
        총 {totalWords}개의 단어를 {totalChapters}개의 단원으로 학습합니다
      </p>

      <div className="grid gap-4 md:grid-cols-4">
        {Array.from({ length: totalChapters }, (_, i) => i + 1).map((chapter) => {
          const wordCount = getChapterWordCount(chapter)
          return (
            <Link
              key={chapter}
              href={`/vocabulary/${level}/${chapter}`}
            >
              <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1">
                <CardContent className="p-6">
                  <p className="text-xl font-semibold text-center">
                    {chapter}장
                  </p>
                  <p className="text-sm text-muted-foreground text-center mt-1">
                    {wordCount}개 단어
                  </p>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </>
  )
}

