# Japanese Learning Platform

🟢 **2025-05-10 업데이트:** N3 단어 2140개, N2 단어 1749개 생성했습니다✨ <br>
🟢 **2025-05-02 업데이트:** 배포 이후 플래시카드 페이지 로딩 속도 및 음성 출력 지연 문제를 해결했습니다.

⚠️ **이 플랫폼은 현재 VERCEL 무료 티어로 배포되었으며 개발 중입니다. 지속적으로 수정될 예정이며, 일부 기능은 정상적으로 동작하지 않을 수 있습니다**

AI 기반의 스마트 일본어 학습 플랫폼입니다. JLPT N5부터 N1까지 모든 레벨의 학습자를 대상으로 하며, 회화, 듣기, 독해, 단어 학습 기능을 통합적으로 제공하는 것을 목표로 합니다.

➡️ **지금 바로 데모 체험하기:** 👉 [japanese-study-app.vercel.app](https://japanese-study-app.vercel.app/)

<br>

## ✨ 주요 기능 상세

**현재 구현되어 동작하는 기능:**

- **📚 스마트 단어장 (Vocabulary Learning):**
  - 간격 반복 학습(Spaced Repetition System, SRS) 알고리즘을 활용하여 암기 효율을 극대화합니다.
  - 사용자는 JLPT 레벨(N5-N1)별로 단어를 필터링하여 학습할 수 있습니다.
  - 단어와 예문에 대해 **AWS Polly**를 이용한 자연스러운 일본어 원어민 발음 듣기를 제공합니다.

- **🎓 AI 회화 연습 (AI Conversation Practice):**
  - **OpenAI API (ChatGPT)**를 기반으로 한 AI 튜터와 다양한 실제 상황(공항, 식당, 쇼핑 등)에 맞춰 프리토킹 또는 역할극 연습을 진행합니다.
  - 사용자의 발화 내용에 대해 AI가 문법, 어휘, 표현의 적절성을 평가하고 실시간 피드백을 제공합니다.
  - AI 튜터의 대답은 **AWS Polly**를 통해 자연스러운 음성으로 출력되어 듣기 능력 향상에도 도움을 줍니다.

**향후 구현 예정 기능 (현재 미구현):**

- **🎓 문법 마스터 (Grammar Master)**
- **🎧 청취력 강화 (Listening Comprehension)**
- **🏆 JLPT 시험 대비 (JLPT Preparation)**
- **🌐 일본 문화 이해 (Cultural Understanding)**

<br>

## 🚀 기술 스택

- **프레임워크:** Next.js (App Router)
- **언어:** TypeScript
- **UI 라이브러리:** React
- **스타일링:** Tailwind CSS
- **컴포넌트:** shadcn/ui
- **백엔드/데이터베이스:** Supabase (데이터베이스)
- **상태 관리:** React Context API
- **음성 합성 (TTS):** AWS Polly (단어/예문 발음, AI 회화 응답, 듣기 콘텐츠)
- **AI 모델:** OpenAI API (AI 회화 파트너, 문법/표현 피드백)

<br>

## 🛠️ 최근 업데이트

**2025-05-10**

- N2 단어 1749개 생성
- N3 단어 2140개 생성

**2025-05-02**

- ✅ 플래시카드 페이지 로딩 속도 개선 (Vercel 배포 이후 성능 최적화)
- ✅ 단어 및 예문 음성 출력 지연 문제 해결
- 기타 성능 및 UI 관련 미세 조정
