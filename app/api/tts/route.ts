// app/api/tts/route.js
import { NextRequest, NextResponse } from "next/server";
import AWS from "aws-sdk";
import { supabase } from "@/lib/supabase";
import { VocabularyItem } from "@/services/vocabulary";

// AWS Polly 설정 (v2 사용)
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});
const polly = new AWS.Polly();

// AWS Polly로 음성 생성 (MP3 Buffer 반환)
async function synthesizeSpeech(text: string): Promise<Buffer> {
  const params = {
    OutputFormat: "mp3",
    Text: text,
    Engine: "neural",
    VoiceId: "Kazuha",
  };
  const data = await polly.synthesizeSpeech(params).promise();
  if (!data.AudioStream) {
    throw new Error("No AudioStream returned from AWS Polly");
  }
  return data.AudioStream as Buffer;
}

// Supabase Storage에 오디오 파일 업로드
async function uploadAudio(audioBuffer: Buffer, filePath: string) {
  const { data, error } = await supabase.storage
    .from("japanese-audio-files")
    .upload(filePath, audioBuffer, {
      contentType: "audio/mpeg",
      upsert: false,
    });
  if (error) {
    console.error("Error uploading audio file:", error);
    throw error;
  }
  return data;
}

// 업로드된 파일의 공개 URL 가져오기
function getPublicUrl(filePath: string) {
  const { data } = supabase.storage
    .from("japanese-audio-files")
    .getPublicUrl(filePath);
  return data.publicUrl;
}

// VocabularyItem 객체를 기반으로 음성 생성 텍스트와 파일 경로를 추출하는 함수
function getAudioParams(wordData: VocabularyItem) {
  let text: string;
  let filePath: string;
  if (wordData.isSentence) {
    // 예문 음성: example_sentence 값을 사용
    text = wordData.example_sentence || "サンプルの例文です。";
    filePath = `polly/${wordData.id}_sentence.mp3`;
  } else {
    // 단어 음성: japanese 값을 사용
    text = wordData.japanese || "こんにちは、AWS Pollyです。";
    filePath = `polly/${wordData.id}_word.mp3`;
  }
  return { text, filePath };
}

// Supabase 스토리지에서 특정 파일의 존재 여부를 체크하는 함수
async function checkFileExists(filePath: string) {
  try {
    const [folder, fileName] = filePath.split("/");
    const { data: files, error } = await supabase.storage
      .from("japanese-audio-files")
      .list(folder, { limit: 100, offset: 0 });

    if (error) {
      console.error("Error listing files:", error);
      console.error(`Error details - message: ${error.message}`);
      return false;
    }

    return files.some((item) => item.name === fileName);
  } catch (err) {
    console.error("Unexpected error in checkFileExists:", err);
    return false;
  }
}

// 백그라운드에서 오디오 업로드 처리 (await 없이 실행)
function uploadAudioInBackground(audioBuffer: Buffer, filePath: string) {
  uploadAudio(audioBuffer, filePath)
    .then(() => {
      console.log(`Audio successfully uploaded to ${filePath}`);
    })
    .catch((error) => {
      // 오류 객체를 더 자세히 로깅
      console.error(`Background upload error:`, error);
      if (error.message) {
        console.error(`Error message: ${error.message}`);
      }
    });
}

export async function POST(request: NextRequest) {
  try {
    // VocabularyItem 객체를 JSON으로 파싱
    const wordData: VocabularyItem = await request.json();

    // 음성 생성 텍스트와 파일 경로 추출
    const { text, filePath } = getAudioParams(wordData);

    // 파일 존재 여부 확인
    const exists = await checkFileExists(filePath);
    if (exists) {
      const publicUrl = getPublicUrl(filePath);
      return NextResponse.json({ publicUrl });
    }

    // 파일이 없으면 AWS Polly로 음성 생성
    const audioBuffer = await synthesizeSpeech(text);

    // 백그라운드에서 Supabase에 업로드 처리 (응답을 기다리지 않음)
    uploadAudioInBackground(audioBuffer, filePath);

    // Base64로 인코딩하여 클라이언트에 즉시 전달
    const base64Audio = Buffer.from(audioBuffer).toString("base64");
    return NextResponse.json({
      audioData: `data:audio/mpeg;base64,${base64Audio}`,
      filePath, // 나중에 클라이언트가 캐싱할 수 있도록 파일 경로도 함께 전달
    });
  } catch (error) {
    console.error("Error in API Route:", error);
    return NextResponse.error();
  }
}
