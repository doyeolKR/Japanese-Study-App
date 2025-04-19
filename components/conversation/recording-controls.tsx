"use client";

import { Button } from "@/components/ui/button";
import { Mic, Loader2, X } from "lucide-react";

interface RecordingControlsProps {
  isRecording: boolean;
  isProcessing: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onCancelRecording: () => void;
}

export function RecordingControls({
  isRecording,
  isProcessing,
  onStartRecording,
  onStopRecording,
  onCancelRecording,
}: RecordingControlsProps) {
  return (
    <div className="flex justify-center gap-2">
      {isRecording ? (
        <>
          <Button
            size="lg"
            variant="destructive"
            onClick={onStopRecording}
            disabled={isProcessing}
          >
            <Mic className="mr-2 h-4 w-4" />
            녹음 중지
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={onCancelRecording}
            disabled={isProcessing}
          >
            <X className="mr-2 h-4 w-4" />
            녹음 취소
          </Button>
        </>
      ) : (
        <Button
          size="lg"
          variant="default"
          onClick={onStartRecording}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              처리 중...
            </>
          ) : (
            <>
              <Mic className="mr-2 h-4 w-4" />
              녹음 시작
            </>
          )}
        </Button>
      )}
    </div>
  );
}
