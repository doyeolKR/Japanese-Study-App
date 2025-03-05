"use client";

import { useState, useRef, useEffect } from "react";

// 메시지 타입 정의
type Message = {
  role: "user" | "ai";
  content: string;
};

// SpeechRecognition 관련 타입 정의 (브라우저 지원 여부에 따라)
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [started, setStarted] = useState<boolean>(false);
  const dataChannelRef = useRef<RTCDataChannel | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  // AI 응답의 delta 텍스트 누적 (선택 사항)
  const aiDeltaRef = useRef<string>("");

  useEffect(() => {
    return () => {
      stopConnection();
    };
  }, []);

  // 데이터 채널이 open 상태인지 확인 후 전송하는 헬퍼 함수
  const sendData = (data: any) => {
    if (
      dataChannelRef.current &&
      dataChannelRef.current.readyState === "open"
    ) {
      dataChannelRef.current.send(JSON.stringify(data));
    } else {
      console.error(
        "데이터 채널이 열려 있지 않습니다. 현재 상태:",
        dataChannelRef.current?.readyState
      );
    }
  };

  // onmessage 이벤트 핸들러: 여러 케이스 대응 및 중복 방지
  const handleMessage = (e: MessageEvent) => {
    try {
      const eventData = JSON.parse(e.data);
      console.log("수신 이벤트:", eventData);
      if (eventData.type === "response.done") {
        const outputs = eventData.response?.output;
        let text = "";
        if (Array.isArray(outputs)) {
          // 우선 item.type이 "text"인 항목의 content 사용
          const textItem = outputs.find(
            (item: any) =>
              item.type === "text" && typeof item.content === "string"
          );
          if (textItem) {
            text = textItem.content;
          } else {
            // 없으면 item.type이 "audio", "audio_transcript", "transcript"인 항목의 transcript 사용
            const audioItem = outputs.find(
              (item: any) =>
                (item.type === "audio" ||
                  item.type === "audio_transcript" ||
                  item.type === "transcript") &&
                typeof item.transcript === "string"
            );
            if (audioItem) {
              text = audioItem.transcript;
            }
          }
          text = text.trim();
          // 중복 방지: 마지막 메시지와 같으면 추가하지 않음
          setMessages((prev) => {
            if (
              !text ||
              (prev.length > 0 && prev[prev.length - 1].content === text)
            ) {
              return prev;
            }
            return [...prev, { role: "ai", content: text }];
          });
        } else {
          setMessages((prev) => [
            ...prev,
            { role: "ai", content: JSON.stringify(eventData.response) },
          ]);
        }
      } else if (eventData.type === "response.audio_transcript.delta") {
        // delta 이벤트: 누적 업데이트 (선택 사항)
        if (typeof eventData.delta === "string") {
          aiDeltaRef.current += eventData.delta;
          setMessages((prev) => {
            if (prev.length > 0 && prev[prev.length - 1].role === "ai") {
              const updated = [...prev];
              updated[updated.length - 1].content = aiDeltaRef.current;
              return updated;
            }
            return [...prev, { role: "ai", content: aiDeltaRef.current }];
          });
        }
      }
    } catch (err) {
      console.error("메시지 파싱 에러:", err);
    }
  };

  // 연결 초기화 함수 (시작하기 버튼 클릭 시 호출)
  const initConnection = async () => {
    // 1. 서버에서 ephemeral 토큰 요청
    const res = await fetch("/api/session");
    const data = await res.json();
    console.log("ephemeral token 데이터:", data);
    const ephemeralKey: string = data.client_secret.value;

    // 2. RTCPeerConnection 생성
    const pc = new RTCPeerConnection();
    peerConnectionRef.current = pc;

    // 3. 원격 오디오 스트림 재생을 위한 <audio> 엘리먼트 생성
    const audioEl = document.createElement("audio");
    audioEl.autoplay = true;
    pc.ontrack = (event) => {
      if (event.streams && event.streams[0]) {
        audioEl.srcObject = event.streams[0];
      }
    };

    // 4. 브라우저의 마이크 오디오 캡처 후, RTCPeerConnection에 트랙 추가
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => {
        pc.addTrack(track, stream);
      });
    } catch (error) {
      console.error("마이크 접근 실패:", error);
    }

    // 5. 데이터 채널 생성 (Realtime API와 이벤트 주고받기)
    const dc = pc.createDataChannel("oai-events");
    dataChannelRef.current = dc;
    dc.onopen = () => {
      console.log("데이터 채널 열림, readyState:", dc.readyState);
      dc.onmessage = handleMessage;
      // session.update 이벤트에 한 문장 응답 지시 추가
      const sessionUpdate = {
        type: "session.update",
        session: {
          instructions:
            "日本語で会話してください。答えは50文字以内でお願いします。",
        },
      };
      sendData(sessionUpdate);
    };

    // 6. SDP Offer 생성 및 로컬 설명 설정
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    // 7. OpenAI Realtime API에 SDP Offer 전송하여 연결 시작
    const baseUrl = "https://api.openai.com/v1/realtime";
    const model = "gpt-4o-realtime-preview-2024-12-17";
    const sdpRes = await fetch(`${baseUrl}?model=${model}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ephemeralKey}`,
        "Content-Type": "application/sdp",
      },
      body: offer.sdp,
    });
    const sdpAnswer = await sdpRes.text();
    const answer = { type: "answer", sdp: sdpAnswer };
    await pc.setRemoteDescription(answer);

    // 8. 음성 인식을 통한 사용자 입력 (ASR) 설정
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "ja-JP";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        console.log("인식된 음성:", transcript);
        setMessages((prev) => [...prev, { role: "user", content: transcript }]);
        const conversationEvent = {
          type: "conversation.item.create",
          item: {
            type: "message",
            role: "user",
            content: [
              {
                type: "input_text",
                text: transcript,
              },
            ],
          },
        };
        sendData(conversationEvent);
        // response.create 이벤트에도 한 문장 응답 지시 추가
        const responseCreate = {
          type: "response.create",
          response: {
            modalities: ["audio", "text"],
            instructions: "答えは50文字以内でお願いします。",
          },
        };
        sendData(responseCreate);
      };

      recognition.onerror = (error: any) => {
        console.error("음성 인식 에러:", error);
      };

      recognition.onend = () => {
        recognition.start();
      };

      recognition.start();
      recognitionRef.current = recognition;
    } else {
      console.warn("SpeechRecognition API를 지원하지 않는 브라우저입니다.");
    }

    setStarted(true);
  };

  // 연결 종료 함수 (종료하기 버튼 클릭 시 호출)
  const stopConnection = () => {
    console.log("연결 종료");
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setStarted(false);
  };

  // 텍스트 입력을 통한 대화 전송
  const sendMessage = () => {
    if (!input.trim() || !dataChannelRef.current) return;
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    const conversationEvent = {
      type: "conversation.item.create",
      item: {
        type: "message",
        role: "user",
        content: [
          {
            type: "input_text",
            text: input,
          },
        ],
      },
    };
    sendData(conversationEvent);
    const responseCreate = {
      type: "response.create",
      response: {
        modalities: ["audio", "text"],
        instructions: "回答は一文だけでお願いします。",
      },
    };
    sendData(responseCreate);
    setInput("");
  };

  // 시작 전 화면: "시작하기" 버튼
  if (!started) {
    return (
      <div style={{ padding: "2rem" }}>
        <h1>AI 일본어 회화 연습</h1>
        <p>
          음성 및 텍스트를 통해 AI와 일본어 회화를 연습할 수 있습니다. (한국어
          사용자를 위한 서비스)
        </p>
        <button
          onClick={initConnection}
          style={{ fontSize: "1.2rem", padding: "0.5rem 1rem" }}
        >
          시작하기
        </button>
      </div>
    );
  }

  // 연결 후 화면: 대화 UI 및 "종료하기" 버튼
  return (
    <div style={{ padding: "2rem" }}>
      <h1>AI 일본어 회화 연습</h1>
      <button
        onClick={stopConnection}
        style={{
          fontSize: "1.2rem",
          padding: "0.5rem 1rem",
          marginBottom: "1rem",
        }}
      >
        종료하기
      </button>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "1rem",
          height: "300px",
          overflowY: "auto",
          marginBottom: "1rem",
        }}
      >
        {messages.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: "0.5rem" }}>
            <strong>{msg.role === "user" ? "사용자" : "AI"}</strong>:{" "}
            {String(msg.content)}
          </div>
        ))}
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <p>
          ※ 음성 입력 중입니다. 브라우저가 음성을 인식하면 자동으로 대화가
          전송됩니다.
        </p>
      </div>
      <div>
        <input
          type="text"
          placeholder="텍스트 입력 (선택 사항)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: "80%", marginRight: "1rem" }}
        />
        <button onClick={sendMessage}>전송</button>
      </div>
    </div>
  );
}
