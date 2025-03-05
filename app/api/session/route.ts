// /app/api/session/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // OpenAI Realtime API에 ephemeral 세션을 생성하는 요청
  const response = await fetch("https://api.openai.com/v1/realtime/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // .env 파일에 표준 API 키 설정
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini-realtime-preview-2024-12-17",
      voice: "alloy",
    }),
  });

  const data = await response.json();
  return NextResponse.json(data);
}
