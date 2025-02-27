export interface GrammarExample {
  japanese: string
  reading: string
  meaning: string
  explanation?: string
}

export interface ConjugationPattern {
  name: string
  description: string
  pattern: string
  examples: GrammarExample[]
}

export interface GrammarCategory {
  id: string
  title: string
  description: string
  patterns: ConjugationPattern[]
}

export interface VerbType {
  id: string
  name: string
  description: string
  conjugations: ConjugationPattern[]
}

export interface AdjectiveType {
  id: string
  name: string
  description: string
  conjugations: ConjugationPattern[]
}

