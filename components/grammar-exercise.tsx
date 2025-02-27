"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SpeechRecognition } from "./speech-recognition"
import { JapaneseText } from "./japanese-text"

interface GrammarExerciseProps {
  title: string
  explanation: string
  examples: {
    japanese: string
    reading: string
    korean: string
    explanation?: string
  }[]
}

export function GrammarExercise({
  title,
  explanation,
  examples,
}: GrammarExerciseProps) {
  const [currentExample, setCurrentExample] = useState(0)
  const [showTranslation, setShowTranslation] = useState(false)

  const handleSpeechResult = (result: {
    transcript: string
    accuracy: number
    isCorrect: boolean
  }) => {
    console.log("Speech result:", result)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="prose dark:prose-invert">
          <p>{explanation}</p>
        </div>

        <div className="space-y-4">
          <div className="text-center space-y-4">
            <JapaneseText
              text={examples[currentExample].japanese}
              furigana={examples[currentExample].reading}
              meaning={examples[currentExample].korean}
              size="2xl"
            />
            {examples[currentExample].explanation && (
              <p className="text-sm text-muted-foreground mt-2">
                {examples[currentExample].explanation}
              </p>
            )}
          </div>

          <SpeechRecognition
            targetText={examples[currentExample].japanese}
            onResult={handleSpeechResult}
          />

          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => setShowTranslation(!showTranslation)}
            >
              해석 {showTranslation ? '숨기기' : '보기'}
            </Button>
            <Button
              onClick={() =>
                setCurrentExample(
                  (prev) => (prev + 1) % examples.length
                )
              }
            >
              다음 예문
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

