import { GrammarCategory, VerbType, AdjectiveType } from "@/types/grammar"

export const verbTypes: VerbType[] = [
  {
    id: "godan",
    name: "5단 동사",
    description: "어미가 변화하는 동사 그룹입니다. 대부분의 동사가 이 그룹에 속합니다.",
    conjugations: [
      {
        name: "기본형",
        description: "동사의 기본 형태입니다.",
        pattern: "~う",
        examples: [
          {
            japanese: "書く",
            reading: "かく",
            meaning: "쓰다",
            explanation: "5단 동사의 기본형 예시입니다."
          }
        ]
      },
      {
        name: "ます형",
        description: "정중한 표현을 위한 형태입니다.",
        pattern: "~います",
        examples: [
          {
            japanese: "書きます",
            reading: "かきます",
            meaning: "씁니다",
            explanation: "존댓말로 변환된 형태입니다."
          }
        ]
      },
      {
        name: "て형",
        description: "동작의 연결이나 부탁을 표현할 때 사용됩니다.",
        pattern: "~て",
        examples: [
          {
            japanese: "書いて",
            reading: "かいて",
            meaning: "써서/써 주세요",
            explanation: "て형으로 변환된 형태입니다."
          }
        ]
      }
    ]
  },
  {
    id: "ichidan",
    name: "1단 동사",
    description: "어미 'る'가 붙는 동사 그룹입니다.",
    conjugations: [
      {
        name: "기본형",
        description: "동사의 기본 형태입니다.",
        pattern: "~る",
        examples: [
          {
            japanese: "食べる",
            reading: "たべる",
            meaning: "먹다",
            explanation: "1단 동사의 기본형 예시입니다."
          }
        ]
      },
      {
        name: "ます형",
        description: "정중한 표현을 위한 형태입니다.",
        pattern: "~ます",
        examples: [
          {
            japanese: "食べます",
            reading: "たべます",
            meaning: "먹습니다",
            explanation: "존댓말로 변환된 형태입니다."
          }
        ]
      }
    ]
  }
]

export const adjectiveTypes: AdjectiveType[] = [
  {
    id: "i-adjective",
    name: "い형용사",
    description: "'い'로 끝나는 형용사입니다.",
    conjugations: [
      {
        name: "기본형",
        description: "형용사의 기본 형태입니다.",
        pattern: "~い",
        examples: [
          {
            japanese: "高い",
            reading: "たかい",
            meaning: "높다",
            explanation: "い형용사의 기본형 예시입니다."
          }
        ]
      },
      {
        name: "부정형",
        description: "부정을 나타내는 형태입니다.",
        pattern: "~くない",
        examples: [
          {
            japanese: "高くない",
            reading: "たかくない",
            meaning: "높지 않다",
            explanation: "부정형으로 변환된 형태입니다."
          }
        ]
      }
    ]
  },
  {
    id: "na-adjective",
    name: "な형용사",
    description: "'な'가 붙는 형용사입니다.",
    conjugations: [
      {
        name: "기본형",
        description: "형용사의 기본 형태입니다.",
        pattern: "~だ/です",
        examples: [
          {
            japanese: "静かだ",
            reading: "しずかだ",
            meaning: "조용하다",
            explanation: "な형용사의 기본형 예시입니다."
          }
        ]
      },
      {
        name: "부정형",
        description: "부정을 나타내는 형태입니다.",
        pattern: "~じゃない/ではない",
        examples: [
          {
            japanese: "静かじゃない",
            reading: "しずかじゃない",
            meaning: "조용하지 않다",
            explanation: "부정형으로 변환된 형태입니다."
          }
        ]
      }
    ]
  }
]

export const grammarCategories: GrammarCategory[] = [
  {
    id: "verbs",
    title: "동사",
    description: "일본어의 동사 활용을 배웁니다.",
    patterns: [
      {
        name: "기본형",
        description: "동사의 기본 형태입니다.",
        pattern: "~ます/です",
        examples: [
          {
            japanese: "食べます",
            reading: "たべます",
            meaning: "먹습니다",
            explanation: "동사의 정중한 형태입니다."
          }
        ]
      }
    ]
  },
  {
    id: "adjectives",
    title: "형용사",
    description: "い형용사와 な형용사의 활용을 배웁니다.",
    patterns: [
      {
        name: "기본형",
        description: "형용사의 기본 형태입니다.",
        pattern: "~い/~な",
        examples: [
          {
            japanese: "高いです",
            reading: "たかいです",
            meaning: "높습니다",
            explanation: "い형용사의 정중한 형태입니다."
          }
        ]
      }
    ]
  },
  {
    id: "nouns",
    title: "명사",
    description: "명사와 관련된 표현을 배웁니다.",
    patterns: [
      {
        name: "기본형",
        description: "명사의 기본 형태입니다.",
        pattern: "~です",
        examples: [
          {
            japanese: "学生です",
            reading: "がくせいです",
            meaning: "학생입니다",
            explanation: "명사의 정중한 형태입니다."
          }
        ]
      }
    ]
  }
]

