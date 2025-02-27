import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GrammarCategoryCard } from "@/components/grammar-category-card"
import { grammarCategories } from "@/data/grammar"

export default function GrammarPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4">
          일본어 문법 학습
        </h1>
        <p className="text-muted-foreground text-center mb-8">
          체계적인 문법 학습을 통해 일본어 실력을 향상시킵니다
        </p>

        <Tabs defaultValue="verbs" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="verbs">동사</TabsTrigger>
            <TabsTrigger value="adjectives">형용사</TabsTrigger>
            <TabsTrigger value="nouns">명사</TabsTrigger>
          </TabsList>

          {grammarCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <GrammarCategoryCard category={category} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}

