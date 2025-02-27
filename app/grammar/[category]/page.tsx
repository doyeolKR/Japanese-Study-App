import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { grammarCategories, verbTypes, adjectiveTypes } from "@/data/grammar"
import { GrammarExercise } from "@/components/grammar-exercise"

export default function GrammarCategoryPage({
  params,
}: {
  params: { category: string }
}) {
  const category = grammarCategories.find(c => c.id === params.category)
  
  if (!category) {
    notFound()
  }

  const getExerciseData = () => {
    switch (params.category) {
      case 'verbs':
        return verbTypes
      case 'adjectives':
        return adjectiveTypes
      default:
        return []
    }
  }

  const exerciseData = getExerciseData()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4">
          {category.title} 학습
        </h1>
        <p className="text-muted-foreground text-center mb-8">
          {category.description}
        </p>

        <div className="space-y-8">
          {exerciseData.map((type) => (
            <Card key={type.id}>
              <CardHeader>
                <CardTitle>{type.name}</CardTitle>
                <CardDescription>{type.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {type.conjugations.map((conjugation, index) => (
                  <GrammarExercise
                    key={index}
                    title={conjugation.name}
                    explanation={conjugation.description}
                    examples={conjugation.examples}
                  />
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

