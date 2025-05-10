import {
  getVocabularyByLevel,
  getTotalWordCount,
  WORDS_PER_CHAPTER,
} from "@/services/vocabulary";
import { Flashcard } from "@/components/flashcard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Suspense } from "react";

export default async function VocabularyChapterPage({
  params,
}: {
  params: { level: string; chapter: string };
}) {
  const chapter = parseInt(params.chapter);
  const words = await getVocabularyByLevel(params.level, chapter);
  const totalWords = await getTotalWordCount(params.level);
  const totalChapters = Math.ceil(totalWords / WORDS_PER_CHAPTER);

  if (words.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 bg-gray-50 dark:bg-slate-950/20">
        <div className="max-w-4xl mx-auto text-center">
          <Button variant="ghost" asChild className="mb-4">
            <Link href={`/vocabulary/${params.level}`}>
              <ChevronLeft className="w-4 h-4 mr-2" />
              챕터 목록으로
              <span className="ml-2 text-muted-foreground">
                ({params.level} - {chapter}장)
              </span>
            </Link>
          </Button>

          {/* 모바일 환경에서는 숨기고 데스크톱에서만 표시 */}
          <div className="hidden md:block">
            <h1 className="text-3xl font-bold mb-4">
              데이터를 찾을 수 없습니다
            </h1>
            <p className="text-muted-foreground">
              해당 레벨과 챕터에 대한 단어가 없습니다.
            </p>
          </div>

          <div className="md:hidden">
            <p className="text-muted-foreground">
              해당 챕터에 단어가 없습니다.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4 bg-gray-50 dark:bg-slate-950/20">
      <div className="max-w-4xl mx-auto">
        <div className="mb-2">
          <Button variant="ghost" asChild className="mb-4">
            <Link href={`/vocabulary/${params.level}`}>
              <ChevronLeft className="w-4 h-4 mr-2" />
              챕터 목록으로
              <span className="ml-2 text-muted-foreground">
                ({params.level} - {chapter}장)
              </span>
            </Link>
          </Button>

          {/* 모바일 환경에서는 숨기고 데스크톱에서만 표시 */}
          <div className="hidden md:block">
            <h1 className="text-3xl font-bold text-center mb-2">
              {params.level} - {chapter}장
            </h1>
            <p className="text-muted-foreground text-center mb-8">
              {chapter} / {totalChapters} 단원 • {words.length}개 단어
            </p>
          </div>
        </div>

        <Suspense fallback={<div>로딩 중...</div>}>
          <Flashcard vocabulary={words} />
        </Suspense>
      </div>
    </div>
  );
}
