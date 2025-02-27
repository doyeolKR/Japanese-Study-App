import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Volume2 } from 'lucide-react'
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button variant="ghost" disabled className="mb-4">
            <ChevronLeft className="w-4 h-4 mr-2" />
            챕터 목록으로
          </Button>
          
          <div className="text-center mb-8">
            <Skeleton className="h-10 w-[200px] mx-auto mb-4" />
            <Skeleton className="h-6 w-[300px] mx-auto" />
          </div>
        </div>

        <div className="w-full max-w-2xl mx-auto">
          {/* 단어 카드 스켈레톤 */}
          <Card className="mb-4">
            <CardContent className="p-6 min-h-[300px] flex flex-col relative">
              <Button
                variant="ghost"
                size="icon"
                disabled
                className="absolute top-2 right-2"
              >
                <Volume2 className="h-6 w-6" />
              </Button>
              <div className="flex-1 flex flex-col items-center justify-center gap-4">
                <Skeleton className="h-12 w-[200px] mb-2" />
                <div className="space-y-2 text-center">
                  <Skeleton className="h-4 w-[100px] mx-auto" />
                  <Skeleton className="h-6 w-[150px] mx-auto" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 예문 카드 스켈레톤 */}
          <Card className="mb-4">
            <CardContent className="p-6 min-h-[200px] flex flex-col items-center justify-center relative">
              <Button
                variant="ghost"
                size="icon"
                disabled
                className="absolute top-2 right-2"
              >
                <Volume2 className="h-6 w-6" />
              </Button>
              <Skeleton className="h-6 w-[300px] mb-4" />
              <Skeleton className="h-4 w-[250px]" />
            </CardContent>
          </Card>

          {/* 이전/다음 버튼 스켈레톤 */}
          <div className="flex items-center justify-between mt-4">
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-10 w-10" />
          </div>
        </div>
      </div>
    </div>
  )
}

