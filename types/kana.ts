export interface KanaCharacter {
  kana: string
  romaji: string
  type: 'hiragana' | 'katakana'
  column: string
  row: string
  strokeCount: number
  strokeOrder: string[]
  sound: string
}

export interface KanaRow {
  row: string
  characters: KanaCharacter[]
}

export interface KanaColumn {
  column: string
  rows: KanaRow[]
}

export type KanaType = 'hiragana' | 'katakana'

