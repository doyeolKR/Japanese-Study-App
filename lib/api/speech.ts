import { toast } from "@/components/ui/use-toast";

// 음성을 텍스트로 변환
export async function convertSpeechToText(
  audioBlob: Blob
): Promise<string | null> {
  try {
    const formData = new FormData();
    formData.append("file", audioBlob, "audio.wav");
    formData.append("model", "whisper-1");

    const response = await fetch("/api/speech-to-text", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // 텍스트가 없거나 너무 짧은 경우 무시
    if (!data.text || data.text.trim().length < 2) {
      toast({
        title: "인식 실패",
        description: "텍스트를 인식할 수 없습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
      return null;
    }

    return data.text;
  } catch (error) {
    console.error("Error converting speech to text:", error);
    toast({
      title: "음성 변환 실패",
      description: "음성을 텍스트로 변환하는데 실패했습니다.",
      variant: "destructive",
    });
    return null;
  }
}

// AI 응답 받기
export async function getAIResponse(userText: string): Promise<string | null> {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userText }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.response) {
      toast({
        title: "응답 실패",
        description: "AI로부터 응답을 받지 못했습니다.",
        variant: "destructive",
      });
      return null;
    }

    return data.response;
  } catch (error) {
    console.error("Error getting AI response:", error);
    toast({
      title: "AI 응답 실패",
      description: "AI 응답을 받는데 실패했습니다.",
      variant: "destructive",
    });
    return null;
  }
}

// 텍스트를 음성으로 변환
export async function convertTextToSpeech(
  text: string,
  audioRef: React.RefObject<HTMLAudioElement>
): Promise<boolean> {
  try {
    const response = await fetch("/api/text-to-speech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);

    if (audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.play();
      return true;
    }

    return false;
  } catch (error) {
    console.error("Error converting text to speech:", error);
    toast({
      title: "음성 변환 실패",
      description: "텍스트를 음성으로 변환하는데 실패했습니다.",
      variant: "destructive",
    });
    return false;
  }
}
