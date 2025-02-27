"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SpeechRecognition } from "./speech-recognition"
import { JapaneseText } from "./japanese-text"
import { Loader2 } from 'lucide-react'

interface Message {
  role: "system" | "user"
  japanese: string
  reading: string
  korean: string
  explanation?: string
}

interface ConversationPracticeProps {
  scenario: string
  messages: Message[]
}

export function ConversationPractice({
  scenario,
  messages: initialMessages,
}: ConversationPracticeProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [isLoading, setIsLoading] = useState(false)

  const handleSpeechResult = async (result: {
    transcript: string
    accuracy: number
    isCorrect: boolean
  }) => {
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: result.transcript,
          context: scenario,
        }),
      })

      const aiResponse = await response.json()

      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          japanese: result.transcript,
          reading: "",
          korean: "",
        },
        {
          role: "system",
          ...aiResponse,
        },
      ])
    } catch (error) {
      console.error("Error in conversation:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{scenario}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4 max-h-[400px] overflow-y-auto p-4 rounded-lg bg-muted">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary"
                }`}
              >
                <JapaneseText
                  text={message.japanese}
                  furigana={message.reading}
                  meaning={message.korean}
                  size="lg"
                />
                {message.explanation && (
                  <p className="text-sm mt-2 opacity-70">
                    {message.explanation}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <SpeechRecognition
            targetText=""
            onResult={handleSpeechResult}
          />
          {isLoading && (
            <div className="flex justify-center">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

