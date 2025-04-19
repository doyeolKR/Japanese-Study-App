"use client";

import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { MessageList } from "@/components/conversation/message-list";
import { RecordingControls } from "@/components/conversation/recording-controls";
import { useVoiceRecorder } from "@/hooks/conversation/use-voice-recorder";
import {
  convertSpeechToText,
  getAIResponse,
  convertTextToSpeech,
} from "@/lib/api/speech";
import { Message } from "@/types/conversation";

export default function ConversationPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const {
    isRecording,
    isProcessing,
    setIsProcessing,
    startRecording,
    stopRecording,
    cancelRecording,
    isCancelled,
  } = useVoiceRecorder();

  // 녹음 중지 후 처리
  const handleStopRecording = async () => {
    const audioBlob = await stopRecording();

    if (audioBlob && !isCancelled()) {
      const text = await convertSpeechToText(audioBlob);

      if (text) {
        // 사용자 메시지 추가
        const userMessage: Message = {
          role: "user",
          content: text,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, userMessage]);

        // AI 응답 가져오기
        const aiResponse = await getAIResponse(text);

        if (aiResponse) {
          // AI 메시지 추가
          const aiMessage: Message = {
            role: "ai",
            content: aiResponse,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, aiMessage]);

          // 음성으로 변환
          await convertTextToSpeech(aiResponse, audioRef);
        }
      }
    }

    setIsProcessing(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">AI 회화 연습</h1>

      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <MessageList messages={messages} />

            <RecordingControls
              isRecording={isRecording}
              isProcessing={isProcessing}
              onStartRecording={startRecording}
              onStopRecording={handleStopRecording}
              onCancelRecording={cancelRecording}
            />
          </div>
        </Card>
      </div>
      <audio ref={audioRef} className="hidden" />
    </div>
  );
}
