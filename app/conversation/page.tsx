"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, Send, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

export default function ConversationPage() {
  const { checkUser } = useAuth();
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [userText, setUserText] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 인증 체크
  useEffect(() => {
    async function checkAuth() {
      const user = await checkUser();
      if (!user) {
        router.push("/login");
      }
    }
    checkAuth();
  }, [checkUser, router]);

  // 녹음 시작
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        await convertSpeechToText(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  // 녹음 중지
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
      setIsRecording(false);
    }
  };

  // 음성을 텍스트로 변환
  const convertSpeechToText = async (audioBlob: Blob) => {
    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append("file", audioBlob, "audio.wav");
      formData.append("model", "whisper-1");

      const response = await fetch("/api/speech-to-text", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setUserText(data.text);
    } catch (error) {
      console.error("Error converting speech to text:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  // AI 응답 받기
  const getAIResponse = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userText }),
      });

      const data = await response.json();
      setAiResponse(data.response);
      await convertTextToSpeech(data.response);
    } catch (error) {
      console.error("Error getting AI response:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  // 텍스트를 음성으로 변환
  const convertTextToSpeech = async (text: string) => {
    try {
      const response = await fetch("/api/text-to-speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error converting text to speech:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">AI 회화 연습</h1>

      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex justify-center">
              <Button
                size="lg"
                variant={isRecording ? "destructive" : "default"}
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isProcessing}
              >
                {isRecording ? (
                  <>
                    <Mic className="mr-2 h-4 w-4" />
                    녹음 중지
                  </>
                ) : (
                  <>
                    <Mic className="mr-2 h-4 w-4" />
                    녹음 시작
                  </>
                )}
              </Button>
            </div>

            {userText && (
              <div className="space-y-2">
                <p className="text-sm font-medium">내가 한 말:</p>
                <p className="p-3 bg-muted rounded-lg">{userText}</p>
                <Button
                  onClick={getAIResponse}
                  disabled={isProcessing}
                  className="w-full"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      처리 중...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      AI에게 보내기
                    </>
                  )}
                </Button>
              </div>
            )}

            {aiResponse && (
              <div className="space-y-2">
                <p className="text-sm font-medium">AI의 응답:</p>
                <p className="p-3 bg-muted rounded-lg">{aiResponse}</p>
                <audio
                  ref={audioRef}
                  onEnded={() => setIsPlaying(false)}
                  className="w-full"
                />
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
