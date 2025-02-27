import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { KanaTable } from "@/components/kana-table"

export default function KanaPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-4">
        히라가나 & 가타카나 학습
      </h1>
      <p className="text-muted-foreground text-center mb-8">
        일본어의 기초가 되는 히라가나와 가타카나를 학습합니다
      </p>

      <Tabs defaultValue="hiragana" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="hiragana">히라가나</TabsTrigger>
          <TabsTrigger value="katakana">가타카나</TabsTrigger>
        </TabsList>
        <TabsContent value="hiragana">
          <KanaTable type="hiragana" />
        </TabsContent>
        <TabsContent value="katakana">
          <KanaTable type="katakana" />
        </TabsContent>
      </Tabs>
    </div>
  )
}

