import { KanaCharacter } from "@/types/kana"

export const hiragana: KanaCharacter[] = [
  // 모음 (Vowels)
  {
    kana: 'あ',
    romaji: 'a',
    type: 'hiragana',
    column: 'a',
    row: 'vowel',
    strokeCount: 3,
    strokeOrder: ['㇔', '㇕', '㇂'],
    sound: 'a'
  },
  {
    kana: 'い',
    romaji: 'i',
    type: 'hiragana',
    column: 'i',
    row: 'vowel',
    strokeCount: 2,
    strokeOrder: ['㇐', '丿'],
    sound: 'i'
  },
  {
    kana: 'う',
    romaji: 'u',
    type: 'hiragana',
    column: 'u',
    row: 'vowel',
    strokeCount: 2,
    strokeOrder: ['㇐', '丿'],
    sound: 'u'
  },
  {
    kana: 'え',
    romaji: 'e',
    type: 'hiragana',
    column: 'e',
    row: 'vowel',
    strokeCount: 2,
    strokeOrder: ['㇐', '丿'],
    sound: 'e'
  },
  {
    kana: 'お',
    romaji: 'o',
    type: 'hiragana',
    column: 'o',
    row: 'vowel',
    strokeCount: 3,
    strokeOrder: ['㇐', '丿', '㇂'],
    sound: 'o'
  },
  // K행
  {
    kana: 'か',
    romaji: 'ka',
    type: 'hiragana',
    column: 'a',
    row: 'k',
    strokeCount: 3,
    strokeOrder: ['㇐', '丿', '㇂'],
    sound: 'ka'
  },
  {
    kana: 'き',
    romaji: 'ki',
    type: 'hiragana',
    column: 'i',
    row: 'k',
    strokeCount: 4,
    strokeOrder: ['㇐', '丿', '㇂', '丶'],
    sound: 'ki'
  },
  {
    kana: 'く',
    romaji: 'ku',
    type: 'hiragana',
    column: 'u',
    row: 'k',
    strokeCount: 2,
    strokeOrder: ['㇐', '丿'],
    sound: 'ku'
  },
  {
    kana: 'け',
    romaji: 'ke',
    type: 'hiragana',
    column: 'e',
    row: 'k',
    strokeCount: 3,
    strokeOrder: ['㇐', '丿', '㇂'],
    sound: 'ke'
  },
  {
    kana: 'こ',
    romaji: 'ko',
    type: 'hiragana',
    column: 'o',
    row: 'k',
    strokeCount: 2,
    strokeOrder: ['㇐', '丿'],
    sound: 'ko'
  },
  // S행
  {
    kana: 'さ',
    romaji: 'sa',
    type: 'hiragana',
    column: 'a',
    row: 's',
    strokeCount: 3,
    strokeOrder: ['㇐', '丿', '㇂'],
    sound: 'sa'
  },
  {
    kana: 'し',
    romaji: 'shi',
    type: 'hiragana',
    column: 'i',
    row: 's',
    strokeCount: 3,
    strokeOrder: ['㇐', '丿', '㇂'],
    sound: 'shi'
  },
  {
    kana: 'す',
    romaji: 'su',
    type: 'hiragana',
    column: 'u',
    row: 's',
    strokeCount: 2,
    strokeOrder: ['㇐', '丿'],
    sound: 'su'
  },
  {
    kana: 'せ',
    romaji: 'se',
    type: 'hiragana',
    column: 'e',
    row: 's',
    strokeCount: 3,
    strokeOrder: ['㇐', '丿', '㇂'],
    sound: 'se'
  },
  {
    kana: 'そ',
    romaji: 'so',
    type: 'hiragana',
    column: 'o',
    row: 's',
    strokeCount: 2,
    strokeOrder: ['㇐', '丿'],
    sound: 'so'
  },
  // T행
  {
    kana: 'た',
    romaji: 'ta',
    type: 'hiragana',
    column: 'a',
    row: 't',
    strokeCount: 3,
    strokeOrder: ['㇐', '丿', '㇂'],
    sound: 'ta'
  },
  {
    kana: 'ち',
    romaji: 'chi',
    type: 'hiragana',
    column: 'i',
    row: 't',
    strokeCount: 3,
    strokeOrder: ['㇐', '丿', '㇂'],
    sound: 'chi'
  },
  {
    kana: 'つ',
    romaji: 'tsu',
    type: 'hiragana',
    column: 'u',
    row: 't',
    strokeCount: 3,
    strokeOrder: ['㇐', '丿', '㇂'],
    sound: 'tsu'
  },
  {
    kana: 'て',
    romaji: 'te',
    type: 'hiragana',
    column: 'e',
    row: 't',
    strokeCount: 2,
    strokeOrder: ['㇐', '丿'],
    sound: 'te'
  },
  {
    kana: 'と',
    romaji: 'to',
    type: 'hiragana',
    column: 'o',
    row: 't',
    strokeCount: 2,
    strokeOrder: ['㇐', '丿'],
    sound: 'to'
  },
  // N행
  {
    kana: 'な',
    romaji: 'na',
    type: 'hiragana',
    column: 'a',
    row: 'n',
    strokeCount: 3,
    strokeOrder: ['㇐', '丿', '㇂'],
    sound: 'na'
  },
  {
    kana: 'に',
    romaji: 'ni',
    type: 'hiragana',
    column: 'i',
    row: 'n',
    strokeCount: 3,
    strokeOrder: ['㇐', '丿', '㇂'],
    sound: 'ni'
  },
  {
    kana: 'ぬ',
    romaji: 'nu',
    type: 'hiragana',
    column: 'u',
    row: 'n',
    strokeCount: 3,
    strokeOrder: ['㇐', '丿', '㇂'],
    sound: 'nu'
  },
  {
    kana: 'ね',
    romaji: 'ne',
    type: 'hiragana',
    column: 'e',
    row: 'n',
    strokeCount: 4,
    strokeOrder: ['㇐', '丿', '㇂', '丶'],
    sound: 'ne'
  },
  {
    kana: 'の',
    romaji: 'no',
    type: 'hiragana',
    column: 'o',
    row: 'n',
    strokeCount: 1,
    strokeOrder: ['㇐'],
    sound: 'no'
  },
  // H행
  {
    kana: 'は',
    romaji: 'ha',
    type: 'hiragana',
    column: 'a',
    row: 'h',
    strokeCount: 3,
    strokeOrder: ['㇐', '丿', '㇂'],
    sound: 'ha'
  },
  {
    kana: 'ひ',
    romaji: 'hi',
    type: 'hiragana',
    column: 'i',
    row: 'h',
    strokeCount: 2,
    strokeOrder: ['㇐', '丿'],
    sound: 'hi'
  },
  {
    kana: 'ふ',
    romaji: 'fu',
    type: 'hiragana',
    column: 'u',
    row: 'h',
    strokeCount: 4,
    strokeOrder: ['㇐', '丿', '㇂', '丶'],
    sound: 'fu'
  },
  {
    kana: 'へ',
    romaji: 'he',
    type: 'hiragana',
    column: 'e',
    row: 'h',
    strokeCount: 1,
    strokeOrder: ['㇐'],
    sound: 'he'
  },
  {
    kana: 'ほ',
    romaji: 'ho',
    type: 'hiragana',
    column: 'o',
    row: 'h',
    strokeCount: 4,
    strokeOrder: ['㇐', '丿', '㇂', '丶'],
    sound: 'ho'
  },
  // M행
  {
    kana: 'ま',
    romaji: 'ma',
    type: 'hiragana',
    column: 'a',
    row: 'm',
    strokeCount: 3,
    strokeOrder: ['㇐', '丿', '㇂'],
    sound: 'ma'
  },
  {
    kana: 'み',
    romaji: 'mi',
    type: 'hiragana',
    column: 'i',
    row: 'm',
    strokeCount: 3,
    strokeOrder: ['㇐', '丿', '㇂'],
    sound: 'mi'
  },
  {
    kana: 'む',
    romaji: 'mu',
    type: 'hiragana',
    column: 'u',
    row: 'm',
    strokeCount: 3,
    strokeOrder: ['㇐', '丿', '㇂'],
    sound: 'mu'
  },
  {
    kana: 'め',
    romaji: 'me',
    type: 'hiragana',
    column: 'e',
    row: 'm',
    strokeCount: 2,
    strokeOrder: ['㇐', '丿'],
    sound: 'me'
  },
  {
    kana: 'も',
    romaji: 'mo',
    type: 'hiragana',
    column: 'o',
    row: 'm',
    strokeCount: 3,
    strokeOrder: ['㇐', '丿', '㇂'],
    sound: 'mo'
  },
  // Y행
  {
    kana: 'や',
    romaji: 'ya',
    type: 'hiragana',
    column: 'a',
    row: 'y',
    strokeCount: 3,
    strokeOrder: ['㇐', '丿', '㇂'],
    sound: 'ya'
  },
  {
    kana: 'ゆ',
    romaji: 'yu',
    type: 'hiragana',
    column: 'u',
    row: 'y',
    strokeCount: 3,
    strokeOrder: ['㇐', '丿', '㇂'],
    sound: 'yu'
  },
  {
    kana: 'よ',
    romaji: 'yo',
    type: 'hiragana',
    column: 'o',
    row: 'y',
    strokeCount: 3,
    strokeOrder: ['㇐', '丿', '㇂'],
    sound: 'yo'
  },
  // R행
  {
    kana: 'ら',
    romaji: 'ra',
    type: 'hiragana',
    column: 'a',
    row: 'r',
    strokeCount: 2,
    strokeOrder: ['㇐', '丿'],
    sound: 'ra'
  },
  {
    kana: 'り',
    romaji: 'ri',
    type: 'hiragana',
    column: 'i',
    row: 'r',
    strokeCount: 3,
    strokeOrder: ['㇐', '丿', '㇂'],
    sound: 'ri'
  },
  {
    kana: 'る',
    romaji: 'ru',
    type: 'hiragana',
    column: 'u',
    row: 'r',
    strokeCount: 2,
    strokeOrder: ['㇐', '丿'],
    sound: 'ru'
  },
  {
    kana: 'れ',
    romaji: 're',
    type: 'hiragana',
    column: 'e',
    row: 'r',
    strokeCount: 2,
    strokeOrder: ['㇐', '丿'],
    sound: 're'
  },
  {
    kana: 'ろ',
    romaji: 'ro',
    type: 'hiragana',
    column: 'o',
    row: 'r',
    strokeCount: 3,
    strokeOrder: ['㇐', '丿', '㇂'],
    sound: 'ro'
  },
  // W행
  {
    kana: 'わ',
    romaji: 'wa',
    type: 'hiragana',
    column: 'a',
    row: 'w',
    strokeCount: 2,
    strokeOrder: ['㇐', '丿'],
    sound: 'wa'
  },
  {
    kana: 'を',
    romaji: 'wo',
    type: 'hiragana',
    column: 'o',
    row: 'w',
    strokeCount: 3,
    strokeOrder: ['㇐', '丿', '㇂'],
    sound: 'wo'
  },
  // N
  {
    kana: 'ん',
    romaji: 'n',
    type: 'hiragana',
    column: 'a',
    row: 'nn',
    strokeCount: 1,
    strokeOrder: ['㇐'],
    sound: 'n'
  }
]

export const katakana: KanaCharacter[] = [
  // 모음 (Vowels)
  {
    kana: 'ア',
    romaji: 'a',
    type: 'katakana',
    column: 'a',
    row: 'vowel',
    strokeCount: 2,
    strokeOrder: ['㇐', '丿'],
    sound: 'a'
  },
  {
    kana: 'イ',
    romaji: 'i',
    type: 'katakana',
    column: 'i',
    row: 'vowel',
    strokeCount: 2,
    strokeOrder: ['丿', '丿'],
    sound: 'i'
  },
  {
    kana: 'ウ',
    romaji: 'u',
    type: 'katakana',
    column: 'u',
    row: 'vowel',
    strokeCount: 3,
    strokeOrder: ['丿', '㇐', '丿'],
    sound: 'u'
  },
  {
    kana: 'エ',
    romaji: 'e',
    type: 'katakana',
    column: 'e',
    row: 'vowel',
    strokeCount: 3,
    strokeOrder: ['㇐', '丿', '㇐'],
    sound: 'e'
  },
  {
    kana: 'オ',
    romaji: 'o',
    type: 'katakana',
    column: 'o',
    row: 'vowel',
    strokeCount: 3,
    strokeOrder: ['㇐', '丿', '㇐'],
    sound: 'o'
  },
  // K행
  {
    kana: 'カ',
    romaji: 'ka',
    type: 'katakana',
    column: 'a',
    row: 'k',
    strokeCount: 2,
    strokeOrder: ['丿', '㇐'],
    sound: 'ka'
  },
  {
    kana: 'キ',
    romaji: 'ki',
    type: 'katakana',
    column: 'i',
    row: 'k',
    strokeCount: 3,
    strokeOrder: ['㇐', '丿', '㇐'],
    sound: 'ki'
  },
  {
    kana: 'ク',
    romaji: 'ku',
    type: 'katakana',
    column: 'u',
    row: 'k',
    strokeCount: 2,
    strokeOrder: ['丿', '丿'],
    sound: 'ku'
  },
  {
    kana: 'ケ',
    romaji: 'ke',
    type: 'katakana',
    column: 'e',
    row: 'k',
    strokeCount: 3,
    strokeOrder: ['㇐', '丿', '㇐'],
    sound: 'ke'
  },
  {
    kana: 'コ',
    romaji: 'ko',
    type: 'katakana',
    column: 'o',
    row: 'k',
    strokeCount: 2,
    strokeOrder: ['㇐', '㇐'],
    sound: 'ko'
  },
  // S행
  {
    kana: 'サ',
    romaji: 'sa',
    type: 'katakana',
    column: 'a',
    row: 's',
    strokeCount: 3,
    strokeOrder: ['㇐', '丿', '㇐'],
    sound: 'sa'
  },
  {
    kana: 'シ',
    romaji: 'shi',
    type: 'katakana',
    column: 'i',
    row: 's',
    strokeCount: 3,
    strokeOrder: ['丿', '㇐', '丿'],
    sound: 'shi'
  },
  {
    kana: 'ス',
    romaji: 'su',
    type: 'katakana',
    column: 'u',
    row: 's',
    strokeCount: 2,
    strokeOrder: ['丿', '丿'],
    sound: 'su'
  },
  {
    kana: 'セ',
    romaji: 'se',
    type: 'katakana',
    column: 'e',
    row: 's',
    strokeCount: 3,
    strokeOrder: ['㇐', '丿', '㇐'],
    sound: 'se'
  },
  {
    kana: 'ソ',
    romaji: 'so',
    type: 'katakana',
    column: 'o',
    row: 's',
    strokeCount: 2,
    strokeOrder: ['丿', '丿'],
    sound: 'so'
  },
  // T행
  {
    kana: 'タ',
    romaji: 'ta',
    type: 'katakana',
    column: 'a',
    row: 't',
    strokeCount: 3,
    strokeOrder: ['㇐', '丿', '㇐'],
    sound: 'ta'
  },
  {
    kana: 'チ',
    romaji: 'chi',
    type: 'katakana',
    column: 'i',
    row: 't',
    strokeCount: 3,
    strokeOrder: ['㇐', '丿', '㇐'],
    sound: 'chi'
  },
  {
    kana: 'ツ',
    romaji: 'tsu',
    type: 'katakana',
    column: 'u',
    row: 't',
    strokeCount: 3,
    strokeOrder: ['丿', '丿', '丿'],
    sound: 'tsu'
  },
  {
    kana: 'テ',
    romaji: 'te',
    type: 'katakana',
    column: 'e',
    row: 't',
    strokeCount: 3,
    strokeOrder: ['㇐', '丿', '㇐'],
    sound: 'te'
  },
  {
    kana: 'ト',
    romaji: 'to',
    type: 'katakana',
    column: 'o',
    row: 't',
    strokeCount: 2,
    strokeOrder: ['丿', '㇐'],
    sound: 'to'
  },
  // N행
  {
    kana: 'ナ',
    romaji: 'na',
    type: 'katakana',
    column: 'a',
    row: 'n',
    strokeCount: 2,
    strokeOrder: ['丿', '㇐'],
    sound: 'na'
  },
  {
    kana: 'ニ',
    romaji: 'ni',
    type: 'katakana',
    column: 'i',
    row: 'n',
    strokeCount: 2,
    strokeOrder: ['㇐', '㇐'],
    sound: 'ni'
  },
  {
    kana: 'ヌ',
    romaji: 'nu',
    type: 'katakana',
    column: 'u',
    row: 'n',
    strokeCount: 3,
    strokeOrder: ['丿', '㇐', '丿'],
    sound: 'nu'
  },
  {
    kana: 'ネ',
    romaji: 'ne',
    type: 'katakana',
    column: 'e',
    row: 'n',
    strokeCount: 3,
    strokeOrder: ['丿', '㇐', '丿'],
    sound: 'ne'
  },
  {
    kana: 'ノ',
    romaji: 'no',
    type: 'katakana',
    column: 'o',
    row: 'n',
    strokeCount: 1,
    strokeOrder: ['丿'],
    sound: 'no'
  },
  // H행
  {
    kana: 'ハ',
    romaji: 'ha',
    type: 'katakana',
    column: 'a',
    row: 'h',
    strokeCount: 2,
    strokeOrder: ['丿', '丿'],
    sound: 'ha'
  },
  {
    kana: 'ヒ',
    romaji: 'hi',
    type: 'katakana',
    column: 'i',
    row: 'h',
    strokeCount: 2,
    strokeOrder: ['丿', '㇐'],
    sound: 'hi'
  },
  {
    kana: 'フ',
    romaji: 'fu',
    type: 'katakana',
    column: 'u',
    row: 'h',
    strokeCount: 2,
    strokeOrder: ['丿', '㇐'],
    sound: 'fu'
  },
  {
    kana: 'ヘ',
    romaji: 'he',
    type: 'katakana',
    column: 'e',
    row: 'h',
    strokeCount: 1,
    strokeOrder: ['丿'],
    sound: 'he'
  },
  {
    kana: 'ホ',
    romaji: 'ho',
    type: 'katakana',
    column: 'o',
    row: 'h',
    strokeCount: 3,
    strokeOrder: ['㇐', '丿', '㇐'],
    sound: 'ho'
  },
  // M행
  {
    kana: 'マ',
    romaji: 'ma',
    type: 'katakana',
    column: 'a',
    row: 'm',
    strokeCount: 2,
    strokeOrder: ['丿', '㇐'],
    sound: 'ma'
  },
  {
    kana: 'ミ',
    romaji: 'mi',
    type: 'katakana',
    column: 'i',
    row: 'm',
    strokeCount: 3,
    strokeOrder: ['丿', '丿', '丿'],
    sound: 'mi'
  },
  {
    kana: 'ム',
    romaji: 'mu',
    type: 'katakana',
    column: 'u',
    row: 'm',
    strokeCount: 2,
    strokeOrder: ['丿', '㇐'],
    sound: 'mu'
  },
  {
    kana: 'メ',
    romaji: 'me',
    type: 'katakana',
    column: 'e',
    row: 'm',
    strokeCount: 2,
    strokeOrder: ['丿', '丿'],
    sound: 'me'
  },
  {
    kana: 'モ',
    romaji: 'mo',
    type: 'katakana',
    column: 'o',
    row: 'm',
    strokeCount: 3,
    strokeOrder: ['㇐', '丿', '㇐'],
    sound: 'mo'
  },
  // Y행
  {
    kana: 'ヤ',
    romaji: 'ya',
    type: 'katakana',
    column: 'a',
    row: 'y',
    strokeCount: 2,
    strokeOrder: ['丿', '㇐'],
    sound: 'ya'
  },
  {
    kana: 'ユ',
    romaji: 'yu',
    type: 'katakana',
    column: 'u',
    row: 'y',
    strokeCount: 2,
    strokeOrder: ['丿', '㇐'],
    sound: 'yu'
  },
  {
    kana: 'ヨ',
    romaji: 'yo',
    type: 'katakana',
    column: 'o',
    row: 'y',
    strokeCount: 3,
    strokeOrder: ['㇐', '丿', '㇐'],
    sound: 'yo'
  },
  // R행
  {
    kana: 'ラ',
    romaji: 'ra',
    type: 'katakana',
    column: 'a',
    row: 'r',
    strokeCount: 2,
    strokeOrder: ['丿', '㇐'],
    sound: 'ra'
  },
  {
    kana: 'リ',
    romaji: 'ri',
    type: 'katakana',
    column: 'i',
    row: 'r',
    strokeCount: 2,
    strokeOrder: ['丿', '丿'],
    sound: 'ri'
  },
  {
    kana: 'ル',
    romaji: 'ru',
    type: 'katakana',
    column: 'u',
    row: 'r',
    strokeCount: 2,
    strokeOrder: ['丿', '㇐'],
    sound: 'ru'
  },
  {
    kana: 'レ',
    romaji: 're',
    type: 'katakana',
    column: 'e',
    row: 'r',
    strokeCount: 2,
    strokeOrder: ['丿', '丿'],
    sound: 're'
  },
  {
    kana: 'ロ',
    romaji: 'ro',
    type: 'katakana',
    column: 'o',
    row: 'r',
    strokeCount: 1,
    strokeOrder: ['口'],
    sound: 'ro'
  },
  // W행
  {
    kana: 'ワ',
    romaji: 'wa',
    type: 'katakana',
    column: 'a',
    row: 'w',
    strokeCount: 2,
    strokeOrder: ['丿', '㇐'],
    sound: 'wa'
  },
  {
    kana: 'ヲ',
    romaji: 'wo',
    type: 'katakana',
    column: 'o',
    row: 'w',
    strokeCount: 3,
    strokeOrder: ['丿', '㇐', '丿'],
    sound: 'wo'
  },
  // N
  {
    kana: 'ン',
    romaji: 'n',
    type: 'katakana',
    column: 'a',
    row: 'nn',
    strokeCount: 2,
    strokeOrder: ['丿', '㇐'],
    sound: 'n'
  }
]

export const kanaRows = [
  'vowel',
  'k',
  's',
  't',
  'n',
  'h',
  'm',
  'y',
  'r',
  'w',
  'nn'
]

export const kanaColumns = ['a', 'i', 'u', 'e', 'o']

export function getKanaByType(type: 'hiragana' | 'katakana'): KanaCharacter[] {
  return type === 'hiragana' ? hiragana : katakana
}

export function organizeKanaByRow(kanaList: KanaCharacter[]) {
  return kanaRows.map(row => ({
    row,
    characters: kanaList.filter(char => char.row === row)
  }))
}

