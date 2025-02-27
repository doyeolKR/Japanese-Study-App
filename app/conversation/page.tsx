import { ConversationPractice } from "@/components/conversation-practice"

const conversationScenarios = [
  {
    scenario: "레스토랑에서 주문하기",
    messages: [
      {
        role: "system",
        japanese: "いらっしゃいませ。ご注文は何にしますか？",
        reading: "いらっしゃいませ。ごちゅうもんはなんにしますか？",
        korean: "어서오세요. 주문은 무엇으로 하시겠습니까?",
      },
    ],
  },
  {
    scenario: "길 묻기",
    messages: [
      {
        role: "system",
        japanese: "すみません、駅はどこですか？",
        reading: "すみません、えきはどこですか？",
        korean: "실례합니다, 역은 어디입니까?",
      },
    ],
  },
  {
    scenario: "자기소개",
    messages: [
      {
        role: "system",
        japanese: "はじめまして。私は田中です。",
        reading: "はじめまして。わたしはたなかです。",
        korean: "처음 뵙겠습니다. 저는 타나카입니다.",
      },
    ],
  },
]

export default function ConversationPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">
        일본어 회화 연습
      </h1>
      
      <div className="space-y-8">
        {conversationScenarios.map((scenario, index) => (
          <ConversationPractice key={index} {...scenario} />
        ))}
      </div>
    </div>
  )
}

