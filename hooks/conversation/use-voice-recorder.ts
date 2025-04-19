"use client";

import { useState, useRef } from "react";
import { toast } from "@/components/ui/use-toast";

export function useVoiceRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const cancelledRef = useRef(false);

  // 녹음 시작
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      cancelledRef.current = false;

      mediaRecorder.ondataavailable = (event) => {
        if (!cancelledRef.current) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        if (!cancelledRef.current && audioChunksRef.current.length > 0) {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/wav",
          });

          // 오디오 블롭 크기 확인 (아무 말도 안했을 경우 작은 크기)
          if (audioBlob.size > 1000) {
            // 1KB 이상인 경우에만 처리
            return audioBlob;
          } else {
            setIsProcessing(false);
            toast({
              title: "녹음 감지 실패",
              description: "녹음된 음성이 너무 짧거나 감지되지 않았습니다.",
              variant: "destructive",
            });
            return null;
          }
        } else {
          setIsProcessing(false);
          return null;
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast({
        title: "마이크 접근 실패",
        description:
          "마이크에 접근할 수 없습니다. 브라우저 권한을 확인해주세요.",
        variant: "destructive",
      });
    }
  };

  // 녹음 중지 및 전송
  const stopRecording = (): Promise<Blob | null> => {
    return new Promise((resolve) => {
      if (mediaRecorderRef.current && isRecording) {
        setIsProcessing(true);

        // ondataavailable와 onstop 이벤트가 발생한 후에 실행될 핸들러
        const originalOnStop = mediaRecorderRef.current.onstop;
        mediaRecorderRef.current.onstop = function (
          this: MediaRecorder,
          event: Event
        ) {
          if (originalOnStop) {
            originalOnStop.call(this, event);
          }

          if (!cancelledRef.current && audioChunksRef.current.length > 0) {
            const audioBlob = new Blob(audioChunksRef.current, {
              type: "audio/wav",
            });

            if (audioBlob.size > 1000) {
              resolve(audioBlob);
            } else {
              setIsProcessing(false);
              toast({
                title: "녹음 감지 실패",
                description: "녹음된 음성이 너무 짧거나 감지되지 않았습니다.",
                variant: "destructive",
              });
              resolve(null);
            }
          } else {
            setIsProcessing(false);
            resolve(null);
          }
        };

        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.stream
          .getTracks()
          .forEach((track) => track.stop());
        setIsRecording(false);
      } else {
        resolve(null);
      }
    });
  };

  // 녹음 취소
  const cancelRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      // 녹음 취소 플래그 설정 (useRef 사용하여 즉시 적용)
      cancelledRef.current = true;

      // 녹음 중지
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());

      // 상태 초기화
      setIsRecording(false);
      audioChunksRef.current = []; // 녹음 데이터 비우기

      toast({
        title: "녹음 취소됨",
        description: "녹음이 취소되었습니다.",
      });
    }
  };

  return {
    isRecording,
    isProcessing,
    setIsProcessing,
    startRecording,
    stopRecording,
    cancelRecording,
    isCancelled: () => cancelledRef.current,
  };
}
