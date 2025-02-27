"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Volume2 } from 'lucide-react'
import { KanaCharacter, KanaType } from "@/types/kana"
import { getKanaByType, organizeKanaByRow, kanaColumns } from "@/data/kana"

interface KanaTableProps {
  type: KanaType
}

export function KanaTable({ type }: KanaTableProps) {
  const [selectedKana, setSelectedKana] = useState<KanaCharacter | null>(null)
  const kanaList = getKanaByType(type)
  const organizedKana = organizeKanaByRow(kanaList)

  const playAudio = (text: string) => {
    const speech = new SpeechSynthesisUtterance(text)
    speech.lang = "ja-JP"
    window.speechSynthesis.speak(speech)
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-2 border bg-muted w-12"></th>
              {kanaColumns.map(column => (
                <th key={column} className="p-2 border bg-muted text-center w-16">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {organizedKana.map(row => (
              <tr key={row.row}>
                <th className="p-2 border bg-muted text-center w-12">
                  {row.row}
                </th>
                {kanaColumns.map(column => {
                  const character = row.characters.find(
                    char => char.column === column
                  )
                  return (
                    <td key={column} className="p-2 border text-center w-24">
                      {character && (
                        <button
                          onClick={() => setSelectedKana(character)}
                          className="w-full h-full p-2 hover:bg-accent rounded-md transition-colors"
                        >
                          <div className="text-3xl mb-1">{character.kana}</div>
                          <div className="text-sm text-muted-foreground">
                            {character.romaji}
                          </div>
                        </button>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={!!selectedKana} onOpenChange={() => setSelectedKana(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>문자 상세</DialogTitle>
          </DialogHeader>
          {selectedKana && (
            <div className="grid gap-6">
              <div className="flex items-center justify-center">
                <span className="text-8xl">{selectedKana.kana}</span>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl">{selectedKana.romaji}</div>
                <div className="text-muted-foreground">
                  획수: {selectedKana.strokeCount}획
                </div>
              </div>
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => playAudio(selectedKana.kana)}
                >
                  <Volume2 className="h-6 w-6" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

