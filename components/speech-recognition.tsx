"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Volume2 } from 'lucide-react'
import { Progress } from "@/components/ui/progress"

interface SpeechRecognitionProps {
  targetText: string
  onResult?: (result: {
    transcript: string
    accuracy: number
    isCorrect: boolean
  }) => void
}

export function SpeechRecognition({
  targetText,
  onResult,
}: SpeechRecognitionProps) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [accuracy, setAccuracy] = useState(0)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = new SpeechRecognition()

      recognition.lang = "ja-JP"
      recognition.continuous = false
      recognition.interimResults = false

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        const confidence = event.results[0][0].confidence
        setTranscript(transcript)
        setAccuracy(confidence * 100)

        const isCorrect =
          transcript.toLowerCase() === targetText.toLowerCase()
        onResult?.({ transcript, accuracy: confidence * 100, isCorrect })
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      return () => {
        recognition.abort()
      }
    }
  }, [targetText, onResult])

  const startListening = () => {
    setIsListening(true)
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.lang = "ja-JP"
    recognition.start()
  }

  const playAudio = async () => {
    const speech = new SpeechSynthesisUtterance(targetText)
    speech.lang = "ja-JP"
    window.speechSynthesis.speak(speech)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={playAudio}
          className="w-12 h-12"
        >
          <Volume2 className="h-6 w-6" />
        </Button>
        <Button
          variant={isListening ? "destructive" : "default"}
          size="icon"
          onClick={startListening}
          className="w-12 h-12"
        >
          {isListening ? (
            <MicOff className="h-6 w-6" />
          ) : (
            <Mic className="h-6 w-6" />
          )}
        </Button>
      </div>

      {transcript && (
        <div className="space-y-2">
          <p className="text-lg">Your pronunciation: {transcript}</p>
          <Progress value={accuracy} className="w-full" />
          <p className="text-sm text-muted-foreground">
            Accuracy: {accuracy.toFixed(1)}%
          </p>
        </div>
      )}
    </div>
  )
}

