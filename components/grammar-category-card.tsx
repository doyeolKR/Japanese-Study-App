"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Volume2 } from 'lucide-react'
import { GrammarCategory } from "@/types/grammar"
import { JapaneseText } from "./japanese-text"

interface GrammarCategoryCardProps {
  category: GrammarCategory
}

export function GrammarCategoryCard({ category }: GrammarCategoryCardProps) {
  const [selectedPattern, setSelectedPattern] = useState(0)

  const playAudio = (text: string) => {
    const speech = new SpeechSynthesisUtterance(text)
    speech.lang = "ja-JP"
    window.speechSynthesis.speak(speech)
  }

  const currentPattern = category.patterns[selectedPattern]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{category.title}</CardTitle>
          <CardDescription>{category.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {currentPattern.name}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {currentPattern.description}
                </p>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm font-medium mb-2">활용 패턴</p>
                  <p className="text-lg">{currentPattern.pattern}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">예시</h4>
                {currentPattern.examples.map((example, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <JapaneseText
                          text={example.japanese}
                          furigana={example.reading}
                          meaning={example.meaning}
                          size="xl"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => playAudio(example.japanese)}
                        >
                          <Volume2 className="h-5 w-5" />
                        </Button>
                      </div>
                      {example.explanation && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {example.explanation}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={() => setSelectedPattern((prev) => 
                  prev === 0 ? category.patterns.length - 1 : prev - 1
                )}
              >
                이전
              </Button>
              <span className="text-sm text-muted-foreground">
                {selectedPattern + 1} / {category.patterns.length}
              </span>
              <Button
                variant="outline"
                onClick={() => setSelectedPattern((prev) => 
                  prev === category.patterns.length - 1 ? 0 : prev + 1
                )}
              >
                다음
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

