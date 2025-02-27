import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft } from 'lucide-react'
import { Suspense } from "react"
import Loading from "./loading"
import { VocabularyLevelContent } from "@/components/vocabulary-level-content"

export default function VocabularyLevelPage({
  params,
}: {
  params: { level: string }
}) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/vocabulary">
              <ChevronLeft className="w-4 h-4 mr-2" />
              레벨 목록으로
            </Link>
          </Button>
          
          <Suspense fallback={<Loading />}>
            <VocabularyLevelContent level={params.level} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

