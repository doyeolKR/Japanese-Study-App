import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from 'lucide-react'
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button variant="ghost" disabled className="mb-4">
            <ChevronLeft className="w-4 h-4 mr-2" />
            레벨 목록으로
          </Button>
          
          <div className="text-center mb-8">
            <Skeleton className="h-10 w-[200px] mx-auto mb-4" />
            <Skeleton className="h-6 w-[300px] mx-auto" />
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {Array.from({ length: 8 }, (_, i) => (
              <Card key={i} className="h-full">
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-20 mx-auto mb-2" />
                  <Skeleton className="h-4 w-24 mx-auto" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

